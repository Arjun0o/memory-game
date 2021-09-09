import React from "react";
import styles from "./Card.module.css";

export const Card = ({
  name,
  key,
  isFlipped,
  isActive,
  handleClick,
  index,
}) => {
  return (
    <div className={styles.card}>
      {isFlipped && (
        <div
          className={isActive ? styles.card__discarded : styles.card__flipped}
          onClick={() => handleClick(index)}
        >
          <p className={styles.card__title}>{name}</p>
        </div>
      )}
      {!isFlipped && (
        <div
          className={isActive ? styles.card__discarded : styles.card__flipped}
          onClick={() => handleClick(index)}
        ></div>
      )}
    </div>
  );
};
