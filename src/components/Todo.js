import React, { useEffect, useState } from 'react'


//GETTING LIST FROM LOCAL STORAGE
function notes() {
    let list = JSON.parse(localStorage.getItem("lists"));

    if (list) {
        return list
    }
    else {
        return [];
    }
}

const Todo = () => {
    const [input, setinput] = useState("");
    const [todo, settodo] = useState(notes());
    const [date, setdate] = useState("")


    //SET LIST IN LOCAL STORAGE
    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify([...todo]))
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth()
        let year = d.getFullYear()
        setdate(`${day}-${month + 1}-${year}`)
    }, [todo])

    //ADD NEW LIST
    const add = () => {
        if (input === "") {
            alert("blank entey not allowed")
        }
        else {
            settodo([...todo, input].reverse());
            setinput("")


        }
    }

    // for Delete list item
    const listDelete = (id) => {
        if (window.confirm("Are you sure,want to Delete")) {
            todo.splice(id, 1)
            settodo([...todo]);
        }
    }

    //for date
    return (
        <>
            <div className='todo-container'>
                <div className="input-container">
                    <input type="text"
                        placeholder='Enter New Task'
                        className="add-input"
                        value={input}
                        onChange={(e) => { (setinput(e.target.value)) }}
                    />
                    <button onClick={() => add()} className="input-btn add-btn">add</button>
                </div>
            </div>
            <div className="datalist">
                {
                    todo.map((elm, ind) => {
                        return (
                            <div key={ind} className='list-main-con'>
                                <div className="list-con">
                                    <span>{elm}</span>
                                    <span>{date}</span>
                                    <span onClick={() => { listDelete(ind) }}><i className="fa-solid fa-trash dlt-icone"></i></span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Todo