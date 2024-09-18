import React, { useState, useEffect } from 'react';
import Start from './Start';

// Composant Square
function Square({ value, onSquareClick }) {
  const className = value === 'X' ? 'square red-x' : 'square';
  return (
    <span className={className} onClick={onSquareClick}>
      {value}
    </span>
  );
}

// Composant Board
function Board({ xIsNext, squares, onPlay, onMoveBackward, onMoveForward, onMoveRepeat, first, second }) {
  // Avoid direct DOM manipulation here, handle it in useEffect
  useEffect(() => {
    document.querySelector('body').classList.remove('hidden');
    return () => document.querySelector('body').classList.add('hidden');
  }, []);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = (winner === 'X' ? first : second) + ` (${winner}) a gagné`;
  } else if (squares.every(square => square !== null)) {
    status = 'Égalité';
  } else {
    status = 'Prochain tour : ' + (xIsNext ? (first !== '' ? first : 'X') : (second !== '' ? second : 'O'));
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className='container'>
        {[0, 3, 6].map(start => (
          <div key={start} className="board-row">
            {[0, 1, 2].map(offset => (
              <Square key={start + offset} value={squares[start + offset]} onSquareClick={() => handleClick(start + offset)} />
            ))}
          </div>
        ))}
      </div>
      <div className="controle">
        <span onClick={onMoveBackward}><i className="bi bi-arrow-left-circle"></i><span id='previous'>Previous</span></span>
        <span onClick={onMoveForward}><i className="bi bi-arrow-right-circle"></i><span id='next'>Next</span></span>
        <span onClick={onMoveRepeat}><i className="bi bi-arrow-repeat"></i><span id='restart'>Restart</span></span>
      </div>
    </>
  );
}

// Composant Game
export default function Game({ desactiver, setdesactiver, vsBot, setVsBot, firstName, secondName }) {
  const [showMenu, setShowMenu] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    if (!xIsNext && vsBot && !calculateWinner(currentSquares)) {
      const nextSquares = currentSquares.slice();
      const move = calculateBestMove(currentSquares, 'O');
      nextSquares[move] = 'O';
      setTimeout(() => handlePlay(nextSquares), 500);
    }
  }, [currentMove, vsBot, xIsNext, currentSquares]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function moveBackward() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  }

  function moveForward() {
    if (currentMove < history.length - 1) {
      setCurrentMove(currentMove + 1);
    }
  }

  function moveRepeat() {
    setCurrentMove(0);
    setHistory([Array(9).fill(null)]);
  }

  function launchMenu(e) {
    e.preventDefault();
    document.querySelector('body').classList.add('hidden');
    setTimeout(() => {
      setShowMenu(true);
    }, 300);
  }

  // function handleBot() {
  //   setVsBot(!vsBot);
  //   setdesactiver(!desactiver);
  //   document.querySelector('.modeBot').style.color = desactiver ? 'crimson' : 'blue';
  // }

  

  if (showMenu) {
    return <Start />;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay} 
          onMoveBackward={moveBackward}
          onMoveForward={moveForward}
          onMoveRepeat={moveRepeat}
          first={firstName}
          second={vsBot ? 'Bot' : secondName}
        />
        <div className="exit">
          <i onClick={launchMenu} className="bi bi-box-arrow-left"></i> <span>Exit</span>
        </div>
      </div>
    </div>
  );
}

// Fonction pour calculer le gagnant
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Fonction pour calculer le meilleur coup pour le bot
function calculateBestMove(squares, player) {
  // Vérifier si le bot peut gagner en un coup
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = player;
      if (calculateWinner(squares) === player) {
        squares[i] = null;
        return i;
      }
      squares[i] = null;
    }
  }

  // Vérifier si l'adversaire peut gagner en un coup et bloquer ce coup
  const opponent = player === 'O' ? 'X' : 'O';
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = opponent;
      if (calculateWinner(squares) === opponent) {
        squares[i] = null;
        return i;
      }
      squares[i] = null;
    }
  }

  // Jouer un coup stratégique (par exemple, le centre, puis les coins)
  const strategicMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (let move of strategicMoves) {
    if (squares[move] === null) {
      return move;
    }
  }

  return null;
}
