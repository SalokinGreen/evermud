import React from "react";
import styles from "./Main.module.css";
import Image from "next/image";
export default function Map({ place, onClick }) {
  return (
    <div className={styles.mapItem} onClick={onClick}>
      <div className={styles.mapItemImage}>
        <Image src={place.image} alt={place.name} width={64} height={64} />
      </div>
      <div className={styles.mapItemInfo}>
        <h2 className={styles.mapItemTitle}>{place.name}</h2>
        <p className={styles.mapItemDescription}>{place.description}</p>
      </div>
    </div>
  );
}
