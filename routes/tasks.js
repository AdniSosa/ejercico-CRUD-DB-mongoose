// Aquí estarán todas las rutas

const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); 

// - POST /create: Endpoint para crear una tarea.
router.post('/create', async (req, res) => {
    try {
        const createdTask = await Task.create(req.body);
        console.log(createdTask)
        res.status(201).send(createdTask);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
})

// - GET /: Endpoint para traer todas las tareas.
router.get('/', async (req, res) => {
    
    try {
        const tasks = await Task.find();  
        //console.log(tasks);
        
        if(tasks.length === 0) {
        res.send('There is no tasks in the data base')
        } else {    
        res.status(200).send(tasks);
        }
    
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem getting the tasks" });
    }
})

// - GET /id/:_id: Endpoint para buscar tarea por id.
router.get('/id/:_id', async (req, res) => {
    
    try {
        const id = req.params._id;
        const task = await Task.findOne({_id: id});
        //console.log(task)
      
       if(!task) {
        res.json({message:'The task couldn´t be found'})
      } else {
        res.status(200).send(task);
      }
    
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem getting the task" });
    }
})

//- PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.
router.put('/markAsCompleted/:_id', async (req, res) => {
    
    try {
        const id = req.params._id;
        const taskUpdate = await Task.findOneAndUpdate({_id: id}, req.body, {new: true});
        //console.log(taskUpdate)
      
       if(!taskUpdate) {
        res.json({message:'The task couldn´t be found'})
      } else {
        res.status(200).send(taskUpdate);
      }
    
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem updating the task" });
    }
})

// - PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, 
// que no me deje cambiar el campo  “completed” desde este endpoint, sino solo, el título.
router.put('/id/:_id', async (req, res) => {
    
    try {
        const {title} = req.body
        const id = req.params._id;

        if(!title) {
            res.json({message:'Title is required'})
        }
        
        const taskUpdate = await Task.findOneAndUpdate({_id: id}, {$set: {title: title}}, {new: true});
        console.log(taskUpdate)

        if(!taskUpdate) {
            res.json({message:'The task couldn´t be found'})
        } else {
            res.status(200).send(taskUpdate);
        }
    
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem updating the task" });
    }
})

// - DELETE /id/:_id: Endpoint para eliminar una tarea.
router.delete('/id/:_id', async (req, res) => {
    
    try {
        const taskDelete = await Task.findOneAndDelete({_id: req.params._id});
            console.log(taskDelete)
        
        if(!taskDelete) {
            res.json({message:'The task couldn´t be found'})
          } else {
            res.status(200).json({message:'The task has been deleted'});
          }

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem deleting the task" });
    }
})


module.exports = router;