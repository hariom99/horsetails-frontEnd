import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./createBoard.css";
import axios from "axios";
const CreateBoard = (props) => {
    // console.log(props);
    const history = useHistory()
    const [boardName, setBoardName] = useState("");
    const [boardColor, setBoardColor] = useState("");
    const [boardWarning, setBoardWarning] = useState("");

    // const newBoard = { boardName, boardColor };
    // console.log(newBoard);

    // onclick of create new board data will be shared to parent component
    // after all validations

    const addNewBoardToList = () => {
        if (boardName.length === 0 && boardColor.length === 0) {
            setBoardWarning("Please enter Board Name and select Color");
        }
        else if (boardName.length === 0) {
            setBoardWarning("Please enter Board Name");
        }
        else if (boardColor.length === 0) {
            setBoardWarning("Please select Board Color");
        }
        else {
            // console.log("in create board before fn");
            // props.addNewBoard(newBoard);
            // console.log("in create board after fn");
            setBoardName("");
            setBoardWarning(null);

            const token = localStorage.getItem("token");
            // const url = "http://localhost:8080/myboards/createboard/"
            const url = "https://board-app-horsetails.herokuapp.com/myboards/createboard/"
            axios.post(url, { token, boardName, boardColor }).then((res) => {

                if (res.data === "SESSION_EXPIRED")
                    history.push("/login");
                else {

                    let data = res.data;
                    // console.log("prop from create boaard");
                    // console.log(res.data);
                    history.push("/board-details", { "boardId": data.boardId, "boardName": data.boardName });
                }
            }).catch((err) => {
                console.log(err);
            })
            // if (data == "") {
            //     console.log("hii");
            // }

        }

    }

    const closePopup = () => {
        history.goBack();
    }


    return (
        <>
            <div onClick={() => closePopup()} className="popup-container">
            </div>
            <div className="popup" >
                <div className="create-new-board" >Create new board</div>
                <div className="new-board-input" >
                    <input type="text" onChange={(e) => setBoardName(e.target.value)} value={boardName} placeholder="Board Name" />
                </div>
                <div className="board-color-container">
                    <div  >
                        Choose board color
                    </div>
                    <div className="rbtn-container" >
                        <input className="radio-btn r1" type="radio" name="r" id="radio1" value="1" />
                        <input className="radio-btn r2" type="radio" name="r" id="radio2" value="2" />
                        <input className="radio-btn r3" type="radio" name="r" id="radio3" value="3" />
                        <input className="radio-btn r4" type="radio" name="r" id="radio4" value="4" />
                        <input className="radio-btn r5" type="radio" name="r" id="radio5" value="5" />
                        <input className="radio-btn r6" type="radio" name="r" id="radio6" value="6" />
                        <input className="radio-btn r7" type="radio" name="r" id="radio7" value="7" />

                        <label className="popup-r-label pl1" onClick={() => setBoardColor("#FEF445")} htmlFor="radio1">
                        </label>
                        <label className="popup-r-label pl2" onClick={() => setBoardColor("#FAC710")} htmlFor="radio2">
                        </label>

                        <label className="popup-r-label pl3" onClick={() => setBoardColor("#8FD14F")} htmlFor="radio3">
                        </label>

                        <label className="popup-r-label pl4" onClick={() => setBoardColor("#9510AC")} htmlFor="radio4">
                        </label>

                        <label className="popup-r-label pl5" onClick={() => setBoardColor("#2D9BF0")} htmlFor="radio5">
                        </label>

                        <label className="popup-r-label pl6" onClick={() => setBoardColor("#652CB3")} htmlFor="radio6">
                        </label>

                        <label className="popup-r-label pl7" onClick={() => setBoardColor("#808080")} htmlFor="radio7">
                        </label>

                    </div>
                    <div className="crt-board-btn-container" >
                        <button className="create-new-board-btn" onClick={addNewBoardToList}  >CREATE</button>
                    </div>
                    <div className="board-warning" >{boardWarning}</div>
                </div>
            </div>
        </>
    );
}

export default CreateBoard;