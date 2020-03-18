import express from 'express';
import { check, validationResult } from 'express-validator';
import Task from '../models/Task';

const router = express.Router();

// Get task
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.json(tasks);
    }catch(err) {
        res.json({ message: err });
    }
});

// Add task
router.post(
    '/', 
    [
        check('title', 'Please enter a task title!').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors : errors.array() })
        }else{
            const task = new Task({
                title: req.body.title
            });

            try {
                const savedTask = await task.save();
                res.json(savedTask);
                console.log('Added a new record to the database!')
            }catch(err) {
                res.json({ message: err });
            }
        }
    }
);

// Delete task
router.delete('/:taskId', async (req, res) => {
    try {
        const removedPost = await Task.remove({_id: req.params.taskId });
        res.json(removedPost);
    }catch(err){
        res.json({ message: err}); 
    }

});

// Update task status
router.patch('/:taskId', async (req, res) => {
    try {
        const updatedTask = await Task.updateOne(
            {_id: req.params.taskId },
            { $set: { completed: req.body.completed }}
        );
        res.json(updatedTask);
    }catch(err){
        res.json({ message: err}); 
    }

});


// module.exports = router;
export default router;