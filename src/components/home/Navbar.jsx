import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
export default function Navbar({ page, setPage }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className={styles.logo}
        ></Image>
        <button
          className={styles.navbarButton}
          onClick={() => setPage(0)}
          style={{ color: page === 0 ? "green" : "white" }}
        >
          Home
        </button>
        <button
          className={styles.navbarButton}
          onClick={() => setPage(3)}
          style={{ color: page === 3 ? "green" : "white" }}
        >
          Worlds
        </button>
        <button
          className={styles.navbarButton}
          onClick={() => setPage(4)}
          style={{ color: page === 4 ? "green" : "white" }}
        >
          Profile
        </button>
      </div>
      <div className={styles.navbarRight}>
        <button
          className={styles.navbarButton}
          onClick={() => setPage(1)}
          style={{ color: page === 1 ? "green" : "white" }}
        >
          About
        </button>
        <button
          className={styles.navbarButton}
          onClick={() => setPage(2)}
          style={{ color: page === 2 ? "green" : "white" }}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
