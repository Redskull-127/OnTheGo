/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "../styles/Main.module.css";
let socket;

const Main = () => {
  const [input, setInput] = useState("");
  const [roomID, setRoomID] = useState("");
  function getRoomID(max) {
    setRoomID(Math.floor(Math.random() * max));
  }

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log(socket.id);
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      console.log(`Got broadcast : ${msg}`);
      if(document.getElementById("exampleFormControlInput1") && document.getElementById("messages")){
        var element = document.createElement("p");
        element.innerText = msg;
        document.getElementById("messages").appendChild(element);
      }
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const onSubmit = (e) => {
    console.log(input);
    socket.emit("input-change", input);
  };

  return (
    <>
      <div className={styles.Main} id="main">
        <div className={styles.Header}>
          <h1>Messages On The Go!</h1>
        </div>
        <div className={styles.menu}>
          <div
            className={styles.options}
            onClick={(e) => {
              if (
                document.getElementById("main") &&
                document.getElementById("create")
              ) {
                document.getElementById("main").style.display = "none";
                document.getElementById("create").style.display = "flex";
                getRoomID(10000000);
              }
            }}
          >
            <img src="https://img.icons8.com/fluency/48/000000/create-new.png" />
            <h1>Create Room</h1>
          </div>
          <div className={styles.options}>
            <img src="https://img.icons8.com/fluency/48/000000/add-user-group-woman-woman.png" />
            <h1>Join Room</h1>
          </div>
        </div>
        {/* <input id="input" className={`form-control me-2 ${styles.input}`} onChange={onChangeHandler} type="text" placeholder="Type here!" aria-label="Type here!"/>
        <button id="btn" className="btn btn-outline-success" onClick={(e)=>{onSubmit()}} type="button">Send</button> */}
      </div>
      <div className={styles.create} id="create">
        <h1
          className={`bi bi-x-lg ${styles.bi}`}
          onClick={(e) => {
            if (
              document.getElementById("main") &&
              document.getElementById("create")
            ) {
              document.getElementById("main").style.display = "flex";
              document.getElementById("create").style.display = "none";
            }
          }}
        ></h1>
        <div className={styles.createHeader}>
          <h1>Your Room ID : {roomID}</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.messages} id="messages">

          </div>
          <div className={styles.textbox}>
            <input type="text" className="form-control" onChange={onChangeHandler} id="exampleFormControlInput1" placeholder="type here..."/>
            <button className="btn btn-dark" onClick={(e)=>{
              
                onSubmit();
            }}>send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
