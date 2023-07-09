import { useState } from "react";
import TextInput from "./components/textInput";
import { postData } from "./hooks/postData";
import Select from "./components/select";
import "./App.css";

export default function App() {
  const [players, setPlayers] = useState([
    { name: "", note: 1 },
    { name: "", note: 1 },
  ]);
  const [matchDescription, setMatchDescription] = useState([]);
  const [match, setMatch] = useState(null);
  const [submit, setSubmit] = useState(false);

  function handleChangeInput(value, player) {
    if (player === "player1") {
      let newPlayers = [...players];
      newPlayers[0].name = value;
      setPlayers(newPlayers);
    } else {
      let newPlayers = [...players];
      newPlayers[1].name = value;
      setPlayers(newPlayers);
    }
  }

  function handleChangeSelect(value, player) {
    if (player === "player1") {
      let newPlayers = [...players];
      newPlayers[0].note = Number(value);
      setPlayers(newPlayers);
    } else {
      let newPlayers = [...players];
      newPlayers[1].note = Number(value);
      setPlayers(newPlayers);
    }
  }

  function generateGame() {
    let game = matchDescription;
    for (let i = 0; i < 150; i++) {
      const user1score = Math.random() * players[0].note;
      const user2score = Math.random() * players[1].note;
      if (user1score < user2score) {
        game.push({
          userWinner: players[1].name,
          scoreUser1: user1score,
          scoreUser2: user2score,
        });
      } else {
        game.push({
          userWinner: players[0].name,
          scoreUser1: user1score,
          scoreUser2: user2score,
        });
      }
    }
    setSubmit(true);
    setMatchDescription(game);
  }

  async function getScore() {
    const response = await postData("/score", matchDescription, players);
    setMatch(response);
  }

  function calcScore(e) {
    e.preventDefault();
    e.stopPropagation();
    getScore();
  }

  function init() {
    setMatch(null);
    setMatchDescription([]);
    setPlayers([
      { name: "", note: 1 },
      { name: "", note: 1 },
    ]);
    setSubmit(false);
  }


  return (
    <div className="App">
      <h1>Tennis Game</h1>
      <form onSubmit={(e) => calcScore(e)}>
        <div className="form-container">
          <div className="form-section">
            <h2>Joueur 1</h2>
            <TextInput
              id={"player1"}
              disabled={submit}
              label={"player1Name"}
              handleChangeInput={handleChangeInput}
              value={players[0].name}
            />
            <Select
              id={"player1"}
              disabled={submit}
              label={"player1Note"}
              handleChangeSelect={handleChangeSelect}
              value={players[0].note}
            />
          </div>
          <div className="form-section">
            <h2>Joueur 2</h2>
            <TextInput
              id={"player2"}
              disabled={submit}
              label={"player2Name"}
              handleChangeInput={handleChangeInput}
              value={players[1].name}
            />
            <Select
              id={"player2"}
              disabled={submit}
              label={"player2Note"}
              handleChangeSelect={handleChangeSelect}
              value={players[1].note}
            />
          </div>
        </div>
        {match?.winner === undefined || match?.winner === null ? (
          <div>
            <button onClick={() => generateGame()} type="button">
              Générer les points
            </button>

            <button type="submit" disabled={submit === false ? true : false}>
              Calcul du score
            </button>
          </div>
        ) : (
          <button onClick={() => init()} type="button">
            Réinitialiser
          </button>
        )}
      </form>
      {match !== null && (
        <div>
          <h3>Resultats</h3>
          <h4>
            {match?.winner === null
              ? "Jeu en cours, pas de vainqueur"
              : `Match terminé, ${match?.winner} est le gagnant`}
          </h4>
          <table border={1}>
            <tbody>
              <tr>
                <th></th>
                {match.matchScore.map((item, i) => {
                  return <th key={`set${i}`}>Set {i + 1}</th>;
                })}
                {match.winner === null && <th>Current Game</th>}
              </tr>
              {match.players.map((player, x) => {
                return (
                  <tr key={player.name}>
                    <td>{player.name}</td>
                    {match.matchScore.map((set, i) => {
                      return set.map((game, y) => {
                        return x === y && <td key={`game${y}`}>{game}</td>;
                      });
                    })}
                    {match.winner === null &&
                      (match.tieBreak
                        ? match.pointPerGame.map((point, i) => {
                            return (
                              x === i && (
                                <td key={`pointTieBreak${i}`}>{point}</td>
                              )
                            );
                          })
                        : match.translatePointPerGame.map((point, i) => {
                            return (
                              x === i && <td key={`point${i}`}>{point}</td>
                            );
                          }))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {match.matchDescription.map((point, i) => {
            return (
              <p key={`description${i}`}>
                - Point {i + 1} : remporté par {point.userWinner}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
