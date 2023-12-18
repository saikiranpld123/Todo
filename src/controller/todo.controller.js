const dbDetails=require("../config/db.config");
const mysqlDb=require("mysql2/promise");
const TodoItem = require("../models/todo.model");

exports.create=async (req,res)=>{
    try{
        if (!req.body) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
          }
          // Save TodoItem in the database
          TodoItem.create((new TodoItem(req.body)), (err, data) => {
            (err)?
              res.status(500).send({
                message:err.message || "Some error occurred while creating the Todo Item."
              }):res.send(data);
          });
    }
    catch(e)
    {
        console.log(e);
        res.send({errr:"Unable to insert item in the list"})
    }
}


exports.findAll=async (req,res)=>{
    try{
        TodoItem.getAll((err, data) => {
            (err)?res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tutorials."
            }):res.send(data);
        });
    }catch(e){
        console.log(e);
        res.send({error:"Unable to get list of items"});
    }
}



exports.update=async (req, res)=>{
    try{
            if (!req.body) {
                res.status(400).send({
                message: "Content can not be empty!"
                });
            }
            TodoItem.updateById(req.params.id,new TodoItem(req.body),
                (err, data) => {
                (err)?
                    ((err.kind === "not_found")?
                    res.status(404).send({
                        message: `Not found Todo item with id ${req.params.id}.`
                    }):
                    res.status(500).send({
                        message: "Error updating todo item with id " + req.params.id
                    })):res.send(data);
                }
            );
    }
    catch(e){
        console.log(e);
        res.send({error:"Unable to update item"});
    }
}

exports.delete=async (req, res)=>{
    try{
        TodoItem.remove(req.params.id, (err, data) => {
            if (err) {
              (err.kind === "not_found")?
                res.status(404).send({
                  message: `Not found Item with id ${req.params.id}.`
                }):res.status(500).send({
                  message: "Could not delete Item with id " + req.params.id
                });
            } else res.send({ message: `Item was deleted successfully!` });
          });
    }
    catch(e){
        console.log(e);
        res.send({error:"Unable to delete item"});
    }
}

exports.findOne=async (req, res)=>{
    try{
        TodoItem.findById(req.params.id, (err, data) => {
            if (err) {
              (err.kind === "not_found")?
                res.status(404).send({
                  message: `Not found Item with id ${req.params.id}.`
                }):
                res.status(500).send({
                  message: "Error retrieving Item with id " + req.params.id
                });
            } else res.send(data);
          });
    }
    catch(e){
        console.log(e);
        res.send({error:"Unable to get item"});
    }
}


