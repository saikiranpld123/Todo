const database=require("./db.js");


const TodoItem=function(todoItem){
    this.title=todoItem.title,
    this.description=todoItem.description,
    this.completed=todoItem.completed
}


TodoItem.create=(newTodoItem, result) => {
    
    database.query("INSERT INTO todos SET ?", newTodoItem, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created todo item: ", { id: res.insertId, ...newTodoItem });
      result(null, { id: res.insertId, ...newTodoItem });
    });
};
  
TodoItem.findById = (id, result) => {
    database.query(`SELECT * FROM todos WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found todo items: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found todo item with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  TodoItem.getAll = (result) => {
    let query = "SELECT * FROM todos";
    database.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("todo items: ", res);
      result(null, res);
    });
  };


  TodoItem.updateById = (id, todoItem, result) => {
    database.query(
      "UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?",
      [todoItem.title, todoItem.description, todoItem.completed, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found item with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated todo item: ", { id: id, ...todoItem });
        result(null, { id: id, ...todoItem });
      }
    );
  };
  
  TodoItem.remove = (id, result) => {
    database.query("DELETE FROM todos WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found todos with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted todo item with id: ", id);
      result(null, res);
    });
  };
  



module.exports=TodoItem