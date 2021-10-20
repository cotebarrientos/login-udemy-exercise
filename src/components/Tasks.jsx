import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import moment from 'moment'

const Tasks = (props) => {
    // Get all Tasks
    const [tasks, setTasks] = useState([])

    // Set a new task
    const [task, setTask] = useState('')

    // Set editing a task mode
    const [editingMode, setEditingMode] = useState(false)

    // Get Id
    const [id, setId] = useState('')

    const [lastTask, setLastTask] = useState(null)
    const [disable, setDisable] = useState(false)

    //Get all task stored in Firebase Firestore
    useEffect(() => {
    
    const getData = async () => {

        try {
        
            setDisable(true)

            const data = await db.collection(props.user.uid)
                .limit(6)
                .orderBy('date')
                .get()
            
            const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))

            setLastTask(data.docs[data.docs.length - 1])

            console.log(arrayData)
            setTasks(arrayData)

            const query = await db.collection(props.user.uid)
                .limit(6)
                .orderBy('date')
                .startAfter(data.docs[data.docs.length - 1])
                .get()

            if(query.empty){
                setDisable(true)
            }else{
                setDisable(false)
            }

        } catch (error) {
        console.log(error)
        }

    }

    getData()
    }, [props.user.uid])


    // To add a new task in the database
    const addTask = async (e) => {
    e.preventDefault()

    if(!task.trim()){
        console.log('empty field')
        return
    }

    try {

        const newTask = {
        name: task,
        date: Date.now()
        }
        const data = await db.collection(props.user.uid).add(newTask)
        // To create an array copy with the new data
        setTasks([
        ...tasks,
        {...newTask, id: data.id}
        ])
        // To clean the input field
        setTask('')
    }
    catch (error){
        console.log(error)
    }
    
    console.log(task)
    }

    // To remove a task from the database
    const deleteTask = async (id) => {
    try {

        await db.collection(props.user.uid).doc(id).delete()

        const filteredArray = tasks.filter(item => item.id !== id)
        setTasks(filteredArray)

    }
    catch (error) {
        console.log(error)
    }
    }

    // To activate the editing Mode
    const activateEditingTaskMode = (item) => {
        setEditingMode(true)
        setTask(item.name)
        setId(item.id)
    }

    // To edit a selected task
    const editTask = async (e) => {
        e.preventDefault()
        if(!task.trim()){
            return
        }
    try {

        await db.collection(props.user.uid).doc(id).update({
        name: task
        })

        const editedArray = tasks.map(item => (
        item.id === id ? {id: item.id, date: item.date, name: task} : item
        ))
        setTasks(editedArray)
        setEditingMode(false)
        setTask('')
        setId('')
    }
    catch (error) {
        console.log(error)
    }
    }

    const nextList = async () => {
        console.log('next')
        try {

            const data = await db.collection(props.user.uid)
                .limit(6)
                .orderBy('date')
                .startAfter(lastTask)
                .get()

            const arrayData = data.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTasks([
                ...tasks,
                ...arrayData
            ])
            setLastTask(data.docs[data.docs.length - 1])

            const query = await db.collection(props.user.uid)
                .limit(6)
                .orderBy('date')
                .startAfter(data.docs[data.docs.length - 1])
                .get()

            if(query.empty){
                setDisable(true)
            }else{
                setDisable(false)
            }

        } catch(error) {
            console.log(error)
        }
    }

    return (
    <div className="container mt-3">
        <div className="row">
        <div className="col-md-8 col-xs-12">
            <h4 className="text-center mt-3 mb-3">My TODO List</h4>
            {

                tasks.length === 0 ? (
                <div className="col-12 task-box ms-2 me-2">
                    <span className="task-p">Sorry, no items yet</span>
                    <span>
                    <i className="far fa-frown ms-2"></i>
                    </span>
                </div>
                ) : (
                tasks.map(item => (
                <div 
                    className="row task-box ms-2 me-2"
                    key={item.id}
                    >
                    <div className="col-lg-8 col-xs-12">
                        <span className="task-p">{item.name}</span> - <small className="text-muted">{moment(item.date).format('LLL')}</small>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <button 
                            className="btn btn-danger btn-sm ms-2 me-2 mt-2 mb-2 float-end"
                            onClick={() => deleteTask(item.id)}
                            >
                            <span className="text-uppercase">Delete</span>
                            <span>
                                <i className="far fa-trash-alt ms-2"></i>
                            </span>  
                        </button>
        
                        <button 
                            className="btn btn-warning btn-sm mt-2 mb-2 ms-2 me-2 float-end"
                            onClick={() => activateEditingTaskMode(item)}
                            >
                            <span className="text-uppercase">Edit</span>
                            <span>
                                <i className="fas fa-pen ms-2"></i>
                            </span> 
                        </button>
                    </div>
                </div>
                ))
                )
            }
            <div className="d-grid gap-2 col-4 mx-auto mt-3 mb-3">
                <button 
                    className="btn btn-primary mt-2 btn-sm text-uppercase"
                    onClick={() => nextList()}
                    disabled={disable}
                >
                    Next
                    <i className="fas fa-chevron-circle-right ms-2"></i>
                </button>
            </div>
        </div>
        <div className="col-md-4 col-xs-12">
            <h4 className="text-center mt-3 mb-3">
            {
                editingMode ? "Edit a task" : "Add a task"
            }
            </h4>
            <form onSubmit={editingMode ? editTask : addTask}>
            <input
            type="text"
            placeholder="Add a new task"
            className="form-control mb-2" 
            onChange={(e) => setTask(e.target.value)}
            value={task}/>
            <div className="d-grid gap-2">
                <button 
                className={
                    editingMode ? "btn btn-warning" : "btn btn-dark"
                }
                type="submit"
                >
                    <span className="text-uppercase">
                    {
                    editingMode ? "edit" : "Add"
                    }
                    </span>
                    <span>
                        <i className={
                        editingMode ? "fas fa-edit ms-2" : "far fa-plus-square ms-2"
                        }></i>
                    </span>
                </button>
                </div>
            </form>
        </div>
        </div>

    </div>
    );
}

export default Tasks
