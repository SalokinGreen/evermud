import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Message from "./Message";
import Menu from "../UI/Menu";
import MenuItem from "../UI/MenuItem";
import DialogInput from "../UI/DialogInput";
export default function Chat({
  chat,
  setEditable,
  handleEditChat,
  handleGenerate,
  generating,
}) {
  const [contextMenu, setContextMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [aktiveMessage, setAktiveMessage] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");
  function onContext(event, message) {
    event.preventDefault();
    setContextMenu(true);
    setPosition({ x: event.clientX, y: event.clientY });
    setAktiveMessage(message);
    console.log(message);
  }
  function rewrite(text) {
    if (generating) {
      return;
    }
    if (text === "" || text === null || text === undefined) {
      text = "Rewrite this to be more detailed and interesting.";
    }
    const id = aktiveMessage.id;
    console.log("Rewrite");
    handleGenerate([`{ ${text} }`, aktiveMessage.text])
      .then((text) => {
        console.log(text);
        handleEditChat(text, id);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleRewrite() {
    setDialog(true);
    setContextMenu(false);
  }
  function handleRewriteSend(text) {
    rewrite(text);
  }
  function handleEdit() {
    setEditable(aktiveMessage);
    setContextMenu(false);
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chatList}>
        {chat.map((message) => (
          <Message
            key={message.id}
            message={message}
            onContext={onContext}
            setEditable={setEditable}
            handleEditChat={handleEditChat}
          />
        ))}
      </div>
      <div className={styles.chatInput}>
        <Input placeholder="Type a message..." />
        <Button>Send</Button>
      </div>
      {dialog && (
        <DialogInput
          open={dialog}
          onClose={() => setDialog(false)}
          value={dialogText}
          onChange={(e) => setDialogText(e.target.value)}
          onSend={handleRewriteSend}
          title={"Rewrite"}
          description={"How would you like to rewrite this?"}
        />
      )}
      {contextMenu && (
        <Menu position={position} onClose={() => setContextMenu(false)}>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Speak</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleRewrite}>Rewrite</MenuItem>
        </Menu>
      )}
    </div>
  );
}
