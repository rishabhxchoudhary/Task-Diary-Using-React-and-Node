const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database')
const bodyparser = require("body-parser");

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/', async(req, res) => {
    const data = await db.getTodayTasks();
    res.json(data);
});

app.post('/addTask', async(req, res) => {
    const date = req.body.date;
    const time = req.body.time;
    const task = req.body.task;
    await db.addTask(date,time,task);
    res.redirect("http://localhost:3000/");
});

app.post('/deleteTask', async(req, res) => {
    const date = req.body.date;
    const time = req.body.time;
    await db.deleteTask(date,time);
    res.redirect("http://localhost:3000/");
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });