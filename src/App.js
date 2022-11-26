import { useEffect, useState } from "react";
import { doc, setDoc, collection, deleteDoc, getDocs, addDoc  } from "firebase/firestore"; 
import { db } from "./firebaseConfig";
import './App.css'

function App() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var today = new Date();
  let month = months[today.getMonth()].padStart(2,'0');
  var dd = String(today.getDate()).padStart(2, '0');
  var yyyy = today.getFullYear();
  let day = weekday[today.getDay()];
  let d = day + ' ' + dd + ' ' + month + ' ' + yyyy;
  var ampm = today.getHours() >= 12 ? 'PM' : 'AM';
  // var time = today.getHours() + ':' + today.getMinutes();


  const [time, setTime] = useState('');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  
  const postCollectionRef = collection(db,"tasks");

  useEffect(()=>{
    const getPosts = async () =>{
        const data = await getDocs(postCollectionRef);
        let list = [];

        function compare( a, b ) {
          if ( a.data().time < b.data().time ){
            return -1;
          }
          if ( a.data().time > b.data().time ){
            return 1;
          }
          return 0;
        }

        const x = data.docs;
        x.sort(compare);

        x.map((i) => {
          list.push(
            <li>
              <div className="container-fluid">
                <p>
                <div className="fw-bold d-inline-block">{i.data().time} :</div> {i.data().task}
                <div className="d-inline-block ml-3">
                  <i className="fa fa-solid fa-trash" onClick={()=>{handleRemove(i.id)}}></i>
                </div>
                </p>
              </div>
            </li>
          )
        });
         setTasks(
          <>
          {list}
          </>
        )

    }
    setTime( (today.getHours()% 12||12).toString().padStart(2,'0') + ':' + today.getMinutes().toString().padStart(2,'0') + ':' + today.getSeconds().toString().padStart(2,'0')+" "+ampm)
    getPosts();
});


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents refreshing of page
    setTask('');
    const form = {
      date: d,
      time,
      task
    }
    await addDoc(postCollectionRef, form);
    console.log("Document added");
    
  };

  const handleRemove = async (id) =>{
    const postDoc = doc(db,"tasks", id);
    await deleteDoc(postDoc);
  }

  return (
    <>
      <div className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a href="www" className="navbar-brand">Task Diary</a>
        </div>
      </div>
      <div className="container">
        <div className="today">
          <div className="date fw-bolder">{d}</div>
          <div className="container">
            <ul>
              {tasks}
              <li>
                <div className="row">
                  <div className="col-xxlg-2">
                    <div className="timeinput">
                      <p className="text-uppercase fw-light">
                        {time}
                      </p>
                    </div>
                  </div>
                  <div className="col-xxlg-10">
                    <div className="taskinput">
                      <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <input type="text" name="task" onChange={(e) => { setTask(e.target.value) }} className="form-control" id="floatingInput" placeholder="name@example.com" value={task} autocomplete="off"  required />
                          <label htmlFor="floatingInput">Task</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
