const todoRouter=require("express").Router();
const todoController=require("../controller/todo.controller");

// To add new item
todoRouter.get("/todos",todoController.findAll);

// To get item details by id.
todoRouter.get("/todos/:id", todoController.findOne);

// To get list of todo items
todoRouter.post("/todos", todoController.create);

// To update item details by item id
todoRouter.put("/todos/:id", todoController.update);

// To delete item by item id
todoRouter.delete("/todos/:id",todoController.delete);

module.exports=todoRouter;