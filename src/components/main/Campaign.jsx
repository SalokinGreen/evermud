"use client";
import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";

import Drawer from "../UI/Drawer";
import Map from "./Map";
import Chat from "./Chat";

import generate from "@/utils/front/generate";
import buildContext from "@/utils/front/buildContext";
import { rewrite } from "@/utils/contexts";

// supabase
import AuthForm from "@/utils/auth/Authform";
import Modal from "@/components/UI/Modal";
import { supabase } from "@/utils/auth/supabase";

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
  const [activeChat, setActiveChat] = useState([]);
  const [generating, setGenerating] = useState(false);
  // supabase
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serachSession, setSearchSession] = useState(true);
  useEffect(() => {
    if (loading && serachSession) {
      setSearchSession(false);
      login().then((res) => {
        setLoading(false);
        getMessages();
      });
    }
  }, [loading]);
  function login() {
    return supabase.auth.getSession().then((res) => {
      const session = res.data.session;
      if (session.user) {
        setUser(session.user);
      }
    });
  }
  function logout() {
    return supabase.auth.signOut().then((res) => {
      setUser(null);
    });
  }
  function checkForSession() {
    return supabase.auth.onAuthStateChange((event, session) => {
      console.log("event", event);
      console.log("session", session);
      setUser(session?.user ?? null);
    });
  }
  useEffect(() => {
    checkForSession();
  }, []);
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
    supabase
      .from("Messages")
      .update({ text })
      .eq("id", id)
      .then((res) => {
        console.log(res);
      });
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
  function getMessages() {
    supabase
      .from("Messages")
      .select("*")
      // .eq("game_id", gameId)
      .then((res) => {
        const chat = res.data;
        console.log(chat);
        setActiveChat(chat);
      });
  }
  // useEffect(() => {
  //   getMessages();
  // }, [user]);
  // subscribe to new messages

  const channels = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Messages" },
      (payload) => {
        console.log("Change received!", payload);
        getMessages();
      }
    )
    .subscribe();
  function handleSend(message, type) {
    console.log(user);
    supabase
      .from("Messages")
      .insert([
        {
          world: gameId,
          text: message,
          original: message,
          from: user.id,
          thread: 0,
          name: "ADMINGREEN",
          avatar: "/faceless.png",
          type,
        },
      ])
      .then((res) => {
        console.log(res);
      });
  }
  function handleDelete(message) {
    console.log(message);
    supabase
      .from("Messages")
      .delete()
      .eq("id", message.id)
      .then((res) => {
        console.log(res);
      });
  }

  if (!user) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Modal>
            <AuthForm />
          </Modal>
        </div>
      </main>
    );
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
          handleSend={handleSend}
          handleDelete={handleDelete}
        />
      </div>
      <div className={styles.sidebarArea}></div>
    </div>
  );
}
