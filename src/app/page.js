"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import HomePage from "@/components/home/HomePage";
import Navbar from "@/components/home/Navbar";
import { useAuth } from "@/utils/auth/useAuth";
// supabase
import AuthForm from "@/utils/auth/Authform";
import Modal from "@/components/UI/Modal";
import { supabase } from "@/utils/auth/supabase";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serachSession, setSearchSession] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (loading && serachSession) {
      setSearchSession(false);
      login().then((res) => {
        setLoading(false);
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

  if (user) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Navbar page={page} setPage={setPage} />
          {page === 0 && <HomePage />}
        </div>
      </main>
    );
  } else {
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
}
