import React, { useState } from "react";
import styles from "./Main.module.css";

// components
import MapItem from "@/components/main/MapItem";
import Button from "../UI/Button";
import Input from "../UI/Input";
export default function Map({ map, setMap }) {
  const [search, setSearch] = useState("");
  const [filteredMap, setFilteredMap] = useState(map);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = map.filter((place) => {
      return place.name.toLowerCase().includes(search.toLowerCase());
    });
    if (e.target.value === "") {
      setFilteredMap(map);
    } else {
      setFilteredMap(filtered);
    }
  };
  const handleAdd = () => {
    const newPlace = {
      id: map.length + 1,
      name: "New Place",
      description: "This is a new place.",
      image: "https://i.imgur.com/KbwPb6Y.jpeg",
    };
    setMap([...map, newPlace]);
    setFilteredMap([...map, newPlace]);
  };

  return (
    <div className={styles.Map}>
      <div className={styles.MapArea}>
        <div className={styles.MapList}>
          {filteredMap.map((place) => (
            <MapItem key={place.id} place={place} />
          ))}
        </div>
      </div>
      <div className={styles.useArea}>
        <div className={styles.useSearch}>
          <Input placeholder="Search" value={search} onChange={handleSearch} />
        </div>
        <div className={styles.useAdd}>
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </div>
    </div>
  );
}
