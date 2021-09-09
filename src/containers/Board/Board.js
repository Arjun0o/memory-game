import React, { useState, useEffect } from "react";
import { Card } from "../../components";
import styles from "./Board.module.css";

const alphabets = [
  { name: "A", active: true },
  { name: "B", active: true },
  { name: "C", active: true },
  { name: "D", active: true },
  { name: "E", active: true },
  { name: "F", active: true },
  { name: "G", active: true },
  { name: "H", active: true },
];

//shuffle cards
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
};

export const Board = () => {
  //states
  const [cards, setCards] = useState(shuffle([...alphabets, ...alphabets]));
  const [openCards, setOpenCards] = useState([]);
  const [discardedCards, setDiscardedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [turns, setTurns] = useState(0);

  //run everytime two cards are open
  useEffect(() => {
    if (openCards.length === 2) {
      compare();
    }
  }, [openCards]);

  //run everytime cards are discarded
  useEffect(() => {
    gameOver();
  }, [discardedCards]);

  useEffect(() => {
    window.onbeforeunload = (event) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      alert("HAHAHAHA");
      if (e) {
        e.returnValue = ""; // Legacy method for cross browser support
      }
      return ""; // Legacy method for cross browser support
    };
  }, []);

  //handle card click
  const handleClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards([...openCards, index]);
      setFlippedCards([...flippedCards, index]);
      setTurns(turns + 1);
    } else {
      setOpenCards([index]);
      setFlippedCards([index]);
    }
  };

  //handle comparing two cards
  const compare = () => {
    const [firstCardIndex, secondCardIndex] = openCards;

    if (cards[firstCardIndex].name === cards[secondCardIndex].name) {
      setDiscardedCards([
        ...discardedCards,
        {
          ...cards[firstCardIndex],
          active: false,
        },
      ]);
      setMatches(matches + 1);
      setFlippedCards([]);
      return;
    } else {
      setFlippedCards([]);
    }
  };

  //check if all the cards have been discarded
  const gameOver = () => {
    if (discardedCards.length === alphabets.length) {
      alert(`Game over, your score is ${matches} in ${turns} turns`);
      resetGame();
    }
  };

  //check if the card is flipped
  const isFlipped = (index) => {
    return openCards.includes(index);
  };

  //check if the card is discarded
  const isDiscarded = (card) => {
    return discardedCards.some(
      (discardedCard) => discardedCard.name === card.name
    );
  };

  //reset the game
  const resetGame = () => {
    setMatches(0);
    setTurns(0);
    setDiscardedCards([]);
    setFlippedCards([]);
    setOpenCards([]);
    setCards(shuffle([...alphabets, ...alphabets]));
  };

  return (
    <div className={styles.board}>
      <div className={styles.board__matches}>
        <h2>Matches: {matches}</h2>
      </div>
      <div className={styles.board__cards}>
        {cards.map((card, i) => (
          <Card
            handleClick={handleClick}
            index={i}
            key={i}
            name={card.name}
            isActive={isDiscarded(card)}
            isFlipped={isFlipped(i)}
          />
        ))}
      </div>
      <div className={styles.board__turns}>
        <h2>Attempts: {turns}</h2>
        <button className={styles.board__resetBtn} onClick={resetGame}>
          <span className={styles.board__resetBtn__title}>Restart</span>
        </button>
      </div>
    </div>
  );
};
