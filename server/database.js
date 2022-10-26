const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri ="mongodb+srv://root:root@cluster0.btfngii.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const database = client.db('tasks_diary');
const day_tasks = database.collection('day_tasks');

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

async function getTodayTasks() {
    var today = new Date();
    let month = months[today.getMonth()];
    var dd = String(today.getDate()).padStart(2, '0');
    var yyyy = today.getFullYear();
    let day = weekday[today.getDay()];
    let d = day+' '+dd + ' '+ month+ ' '+ yyyy;
    const query = { "date" : d };
    
    const data = await day_tasks.findOne(query);
    if (data){
        return data;
    }
    else{
        const doc = {
            date: d,
            tasks: []
        }
        const result = await day_tasks.insertOne(doc);
        return {};
    }
}

async function addTask(date,time,task) {
    const filter = { date: date };
    const updateDoc = {
        $push: {
            "tasks":{
                time,
                task
            }
        },
      };

    const result = await day_tasks.updateOne(filter, updateDoc);
    console.log("Done");

}

async function deleteTask(date,time){
    const filter = { date: date };
    const updateDoc = {
        $pull: {
            "tasks":{
                time
            }
        },
      };

    const result = await day_tasks.updateOne(filter, updateDoc);
    console.log("Done");
}

module.exports.deleteTask = deleteTask;
module.exports.addTask = addTask;
module.exports.getTodayTasks=getTodayTasks;