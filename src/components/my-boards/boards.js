import CreateBoard from "../create-board/createBoard";
import { useEffect, useState } from "react";
import "./boards.css";
import axios from "axios";
import { useHistory } from "react-router-dom/";

const Boards = (props) => {

    const history = useHistory();
    const [boards, setBoards] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // console.log("boards in boards.js file   " + boards);

    // let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");

    // console.log(userId);
    // console.log(token);

    useEffect(() => {
        // const url = "http://localhost:8080/myboards/";
        const url = "https://board-app-horsetails.herokuapp.com/myboards/";
        axios.post(url, { token }).then((res) => {
            // console.log(res);
            if (res.data === "SESSION_EXPIRED")
                history.push("/login");
            else {
                // console.log(res.data.boards);
                setBoards(res.data.boards);
            }

        }).catch((err) => {
            console.log(err);
        })
    }, [token, history]);

    // const arr = [{ boardName: "Board 1", boardColor: "red" }]//, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14

    const createBoard = () => {
        props.history.push("/myboards/create-board");
    }

    const addBoard = (board) => {
        console.log(board);
        const newBoard = [...boards];
        newBoard.push(board);
        setBoards(newBoard);
    }


    const boardDetails = (boardId) => {
        history.push("/board-details", boardId);
    }

    const logout = () => {
        localStorage.setItem("token", "");
        setIsLoggedIn(!isLoggedIn);
    }

    // const removeTaskFromBoardDetails = ({ boardId, boardName, boardDetails }) => {
    //     const updatedBoard = { boardId, boardName, boardDetails };
    //     setBoards(updatedBoard);
    // }

    const deleteBoard = (e, boardId) => {
        e.stopPropagation();
        // const url = "http://localhost:8080/myboards/delete-board";
        const url = "https://board-app-horsetails.herokuapp.com/myboards/delete-board";
        const token = localStorage.getItem("token");

        // console.log(boardId);

        axios.post(url, { boardId, token }).then((res) => {
            // console.log(res.data.boards);
            setBoards(res.data.boards);
        }).catch((err) => {
            console.log(err);
        })

    }


    return (
        <div className="boards-parent" >
            <button onClick={logout} type="submit" className="btn-logout" >Logout</button>

            <div className="my-boards-heading" >
                My Boards
            </div>
            <div className="my-boards-btn" >
                <button onClick={createBoard} title="Create new card to my boards list" className="create-board-btn" >Create new board</button>
            </div>

            <div className="my-boards-container" >
                <hr className="mbc-hr" />
                <div className="my-boards" >
                    <div>My Boards</div>
                    <div className="boards" >
                        {
                            boards.map((data, ind) => {
                                // console.log(data);
                                return <div key={ind}
                                    onClick={() => boardDetails({ "boardId": data.boardId, "boardName": data.boardName, "boardDetails": data.boardDetails })}
                                    style={{ backgroundColor: `${data.boardColor}` }}
                                    className="board">
                                    {data.boardName}
                                    <span title="Delete Board" onClick={(e) => deleteBoard(e, data.boardId)} className="delete-board" >&#10006;</span>
                                </div>
                            })
                        }

                        <div onClick={createBoard} title="add board" className="board add-board">
                            +
                        </div>
                    </div>
                </div>
            </div>
            {(props.isCreateBoard) && <CreateBoard addNewBoard={addBoard} />}


        </div>

    );
}

export default Boards;