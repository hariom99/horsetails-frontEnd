import axios from "axios";
import { useEffect, useState } from "react";
import "./boardDetails.css";
import { useHistory } from "react-router-dom";

const BoardDetails = (props) => {

    // console.log(props.history.location.state);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const boardName = props.history.location.state.boardName;
    const boardId = props.history.location.state.boardId;
    const token = localStorage.getItem("token");
    const history = useHistory();
    // console.log(props.location.state.boardDetails);
    let [boardDetails, setBoardDetails] = useState(props.location.state.boardDetails);
    // let [boardDetails2, setBoardDetails2] = useState([]);
    // const [dummy, setDummy] = useState(false);
    // console.log(props.location.state.boardDetails);
    useEffect(() => {
        // const url = "http://localhost:8080/myboards/board-details/";
        const url = "https://board-app-horsetails.herokuapp.com/myboards/board-details/";
        axios.post(url, { boardId, token }).then((res) => {
            if (res.data === "SESSION_EXPIRED")
                history.push("/login");
            else {
                // boardDetails = res.data;
                // if (boardDetails === undefined)
                setBoardDetails(res.data);
                // console.log(res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [setBoardDetails]);

    const createTask = (status, boardId) => {
        history.push("/board-details/create-task", { boardId, status });
    }
    const logout = () => {
        localStorage.setItem("token", "");
        setIsLoggedIn(!isLoggedIn);
        history.push("/login");
    }

    // useEffect(() => {
    // })
    const removeTask = (task) => {
        // console.log(task);
        // const url = "http://localhost:8080/myboards/board-details/remove-task";
        const url = "https://board-app-horsetails.herokuapp.com/myboards/board-details/remove-task";
        axios.post(url, { token, task }).then((res) => {
            // console.log(res);

            // console.log(res);
            // console.log(res.data);
            setBoardDetails(res.data.boardDetails);
            // setDummy(!dummy);
        }).catch((err) => {
            console.log(err);
        })
    }


    return (

        <div className="board-details-container" >
            <button onClick={logout} type="submit" className="btn-logout" >Logout</button>
            <div className="header" >
                <div onClick={() => props.history.push("/myboards")} className="home-link" ><img src="https://img.icons8.com/material-rounded/48/000000/home.png" alt="img" /></div>
                <div className="board-heading" >{boardName}</div>
            </div>
            <div className="task-container" >

                <div>
                    <div className="tasks tasks-status" >
                        To Do
                    </div>
                    {
                        // console.log(boardDetails[0]),

                        (boardDetails === undefined || boardDetails[0] === undefined) ? null :
                            boardDetails[0].TO_DO.map((todo, id) => {
                                return (

                                    <div key={id} className="tasks task add-task" >
                                        <span onClick={() => removeTask({ boardId, id, status: 0 })} className="move-task" >&#10006;</span>
                                        {todo}
                                    </div>
                                );
                            })

                    }

                    <div onClick={() => createTask(0, boardId)} className="tasks task add-task" >
                        +
                    </div>
                </div>


                <div>
                    <div className="tasks tasks-status" >In Progress</div>

                    {

                        (boardDetails === undefined || boardDetails[0] === undefined) ? null :
                            boardDetails[1].IN_PROGRESS.map((IN_PROGRESS, id) => {
                                return (

                                    <div key={id} className="tasks task add-task" >
                                        <span onClick={() => removeTask({ boardId, id, status: 1 })} className="move-task" >&#10006;</span>
                                        {IN_PROGRESS}
                                    </div>
                                );
                            })

                    }

                    <div onClick={() => { createTask(1, boardId) }} className="tasks task add-task" >
                        +
                    </div>
                </div>



                <div>
                    <div className="tasks tasks-status" >On Hold</div>

                    {

                        (boardDetails === undefined || boardDetails[2] === undefined) ? null :
                            boardDetails[2].ON_HOLD.map((ON_HOLD, id) => {
                                return (

                                    <div key={id} className="tasks task add-task" >
                                        <span onClick={() => removeTask({ boardId, id, status: 2 })} className="move-task" >&#10006;</span>
                                        {ON_HOLD}
                                    </div>
                                );
                            })

                    }

                    <div onClick={() => { createTask(2, boardId) }} className="tasks task add-task" >
                        +
                    </div>
                </div>




                <div>
                    <div className="tasks tasks-status" >Completed</div>

                    {

                        (boardDetails === undefined || boardDetails[3] === undefined) ? null :
                            boardDetails[3].COMPLETED.map((COMPLETED, id) => {
                                return (

                                    <div key={id} className="tasks task add-task" >
                                        <span onClick={() => removeTask({ boardId, id, status: 3 })} className="move-task" >&#10006;</span>
                                        {COMPLETED}
                                    </div>
                                );
                            })

                    }

                    <div onClick={() => { createTask(3, boardId) }} className="tasks task add-task" >
                        +
                    </div>
                </div>



                <div>
                    <div className="tasks tasks-status" >Released</div>


                    {

                        (boardDetails === undefined || boardDetails[4] === undefined) ? null :
                            boardDetails[4].RELEASED.map((RELEASED, id) => {
                                return (

                                    <div key={id} className="tasks task add-task" >
                                        <span onClick={() => removeTask({ boardId, id, status: 4 })} className="move-task" >&#10006;</span>
                                        {RELEASED}
                                    </div>
                                );
                            })

                    }


                    <div onClick={() => { createTask(4, boardId) }} className="tasks task add-task" >
                        +
                    </div>
                </div>


            </div>
        </div>);
}

export default BoardDetails;