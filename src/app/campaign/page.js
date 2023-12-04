import React from "react";
import Campaign from "@/components/main/Campaign";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Campaign />
    </main>
  );
}
