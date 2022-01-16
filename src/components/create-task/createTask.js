import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";




const CreateTask = (props) => {
    const newTaskRef = useRef(null);
    const history = useHistory();
    const [taskWarning, setTaskWarning] = useState(null);

    // console.log(props.location.state);

    const createTask = (e) => {
        e.preventDefault();
        const task = newTaskRef.current.value;
        if (newTaskRef.current.value === "" || newTaskRef.current.value === null)
            setTaskWarning("Task name can not be empty !");

        else {
            setTaskWarning(null);
            const newTask = props.location.state;
            const token = localStorage.getItem("token");
            // const url = "http://localhost:8080/myboards/board-details/create-task/";
            const url = "https://board-app-horsetails.herokuapp.com/myboards/board-details/create-task/";
            axios.post(url, { token, newTask, task }).then((res) => {
                if (res.data === "SESSION_EXPIRED")
                    history.push("/login");
                else {

                    // console.log(res);
                    const boardName = res.data.boardName;
                    const boardId = res.data.boardId;
                    const boardDetails = res.data.boardDetails;
                    // console.log("prop from create task");

                    history.push("/board-details", { boardName, boardId, boardDetails });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const cancelTask = () => {
        history.goBack();
    }

    return (<div className="signup-container" >
        <div className="login-signup" >
            <span onClick={cancelTask} className="cancel-task" >&#215;
            </span>
        </div>
        <div className="sign-up" >
            Create new task
            <form>
                <div className="input-fields" >
                    <input ref={newTaskRef} placeholder="Task Name" type="text" />
                    <div>
                        <button onClick={createTask} className="btn-ls" >Create</button>
                    </div>
                </div>
            </form>
            <div className="board-warning" >{taskWarning}</div>
        </div>
    </div>);
}

export default CreateTask;