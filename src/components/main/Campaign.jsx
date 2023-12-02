"use client";
import React, { useState } from "react";
import styles from "./Main.module.css";

import Drawer from "../UI/Drawer";
import Map from "./Map";
import Chat from "./Chat";

import generate from "@/utils/front/generate";
import buildContext from "@/utils/front/buildContext";
import { rewrite } from "@/utils/contexts";
export default function Campaign({ gameId }) {
  const [map, setMap] = useState([
    {
      id: 1,
      name: "Home",
      description: "This is my home. It's not much, but it's mine. :)",
      image: "https://i.imgur.com/KbwPb6Y.jpeg",
    },
  ]);
  const [activeMap, setActiveMap] = useState(map[0]);
  const [activeChat, setActiveChat] = useState([
    {
      name: "Bob",
      text: "Hello!",
      avatar: "https://i.imgur.com/2hakYvC.png",
      id: 1,
      edit: false,
    },
    {
      name: "Alice",
      text: "Hi!",
      avatar: "https://i.imgur.com/2hakYvC.png",
      id: 2,
      edit: false,
    },
    {
      name: "Alice",
      text: "Hi!",
      avatar: "https://i.imgur.com/2hakYvC.png",
      id: 3,
      edit: false,
    },
    {
      name: "Alice",
      text: "Hi!",
      avatar: "https://i.imgur.com/2hakYvC.png",
      id: 4,
      edit: false,
    },
    {
      name: "Alice",
      text: "Hi!",
      avatar: "https://i.imgur.com/2hakYvC.png",
      id: 5,
      edit: false,
    },
    {
      name: "Alice",
      text: "Hi!",
      avatar: "https://i.imgur.com/2hakYvC.png",
      id: 6,
      edit: false,
    },
    {
      name: "Alice",
      text: "Hi!",
      avatar: "https://i.imgur.com/2hakYvC.png",
      id: 7,
      edit: false,
    },
    {
      name: "Alice",
      text: "Alice ran down the street until she saw a cat. She picked it up and took it.",
      avatar: "https://i.imgur.com/2hakYvC.png",
      id: 8,
      edit: false,
    },
  ]);
  const [generating, setGenerating] = useState(false);
  const handleGenerate = (input) => {
    if (generating) return;
    setGenerating(true);
    console.log("generating");
    return buildContext(rewrite.start, rewrite.context, input, 8000).then(
      (context) => {
        return generate(context, {}, "")
          .then((result) => {
            console.log(result);
            setGenerating(false);
            return result;
          })
          .catch((err) => {
            console.log(err);
            setGenerating(false);
          });
      }
    );
  };
  function handleEditChat(text, id) {
    const newChat = activeChat.map((message) => {
      if (message.id === id) {
        message.text = text;
      }
      return message;
    });
    setActiveChat(newChat);
  }
  function setEditable(message) {
    const newChat = activeChat.map((item) => {
      if (item.id === message.id) {
        item.edit = !item.edit;
      }
      return item;
    });
    setActiveChat(newChat);
  }
  return (
    <div className={styles.campaign}>
      <div className={styles.mapArea}>
        <Drawer position={"left"}>
          <Map map={map} setMap={setMap} />
        </Drawer>
      </div>
      <div className={styles.contentArea}>
        <Chat
          chat={activeChat}
          setEditable={setEditable}
          handleEditChat={handleEditChat}
          handleGenerate={handleGenerate}
          generating={generating}
        />
      </div>
      <div className={styles.sidebarArea}></div>
    </div>
  );
}
