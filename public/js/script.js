$(function(){

    var $container = $('#todo-list-container');
    var $activeList = $('#active-list');
    var $completedList = $('#completed-list');
    var $addBtn = $('#add-task');
    var $addTask = $('#input-task');

    //load tasks
    loadTasks();

    // Add Task
    $addBtn.on('click', function(){

        $addTask.css({'box-shadow':'initial'})

        if($addTask.val() != ''){
            addTask($addTask.val());
            $addTask.val('');  
        }else{
            $addTask.css({'box-shadow':'1px 1px 10px -2px red'});
        }
    });

    // Trigger add click when press Enter 
    $addTask.on('keypress', function(e){
        if(e.which == 13) {
            $addBtn.click();
        }
    });

    // When click move active tasks to completed
    $activeList.on('click', function(e){
        var $taskEl = e.target;

        if($taskEl.tagName.toLowerCase() == 'li'){
            updateStatus($taskEl.id, true);
            $taskEl.remove();
            $completedList.append($taskEl);
        }
    });

    // When click move completed tasks to active
    $completedList.on('click', function(e){
        var $taskEl = e.target;

        if($taskEl.tagName.toLowerCase() == 'li'){
            updateStatus($taskEl.id, false);
            $taskEl.remove();
            $activeList.append($taskEl);
        }
    });

    // Delete when shift+click
    $container.on('click', function(e){
        if (e.shiftKey) {
            var $taskEl = e.target;
            if($taskEl.tagName.toLowerCase() == 'li'){
                deleteTask($taskEl.id);
                $taskEl.remove();
            }
        }
    });
    
    // get data from database
    function loadTasks(){
        $.ajax({
            type: 'GET',
            url: 'api/tasks',
            success: function(tasks){

                $activeList.empty();
                $completedList.empty();

                $.each(tasks, function(i, task){

                    $li = $('<li></li>');
                    $li = $li.attr('id', task._id);

                    if(task.completed){
                        $li = $li.text(task.title);
                        $completedList.append($li);
                    }else{
                        $li = $li.text(task.title);
                        $activeList.append($li);
                    }
                });
            }
        });
    } 

    // Add Task
    function addTask(title){
        $.ajax({
            url: 'api/tasks',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({"title": title}),
            success: function(response){
                // console.log(response);
                console.log('Successfully added task.');

                $li = $('<li></li>');
                $li = $li.attr('id', response._id);
                $li = $li.text(response.title);
                $activeList.append($li);
            }
        });
    }

    // Update task status
    function updateStatus(id, status){
        $.ajax({
            url: 'api/tasks/'+id,
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify({"completed": status}),
            success: function(response){
                // console.log(response);
                console.log('Successfully updated task.');
            }
        });
    }

    // Update task status
    function deleteTask(id){
        $.ajax({
            url: 'api/tasks/'+id,
            type: 'DELETE',
            contentType: 'application/json',
            success: function(response){
                // console.log(response);
                console.log('Successfully deleted task.');
            }
        });
    }

    
});