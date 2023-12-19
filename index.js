const express = require('express');
const todoRouter = require("./src/routes/todo.router");
const app = express();
const port = 3000;

// Use built-in middleware for urlencoded form data
app.use(express.urlencoded({ extended: true }));

// Use built-in middleware for json
app.use(express.json());

app.use("/api", todoRouter);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    import('open').then(open => open.default(`http://localhost:${port}`));
});
