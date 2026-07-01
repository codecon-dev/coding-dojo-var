// ---- runner: roda os lances do index.json. Rode com: node solucao.js ----
const fs = require("fs");
const path = require("path");

const index = JSON.parse(fs.readFileSync(path.join(__dirname, "index.json"), "utf8"));

function listOfOffside(play) {
  const { attackingTeam, passer } = play;

  play.players = play.players.sort((i, j) => i.x - j.x);

  let bPlayers = play.players.filter((player) => player.team === "B");
  let aPlayers = play.players.filter((player) => player.team === "A");

  if (attackingTeam === "A") {
    // find B
    // console.log(`bPlayers`, bPlayers);
    let lastPlayer = bPlayers[bPlayers.length - 2];
    aPlayers = aPlayers.filter((a) => a.x > lastPlayer.x);

    return {
      hasOffside: aPlayers.length > 0,
      offsidePlayers: aPlayers.map((i) => i.id), // ids dos atacantes em posição irregular
      offsideLineDefender: lastPlayer.id, // id do defensor que define a linha
    };
    // console.log(`lineOfDeffense`, lineOfDeffense);
    // let indice = play.players.findIndex((player) => player.id === lineOfDeffense.id);
    // console.log(`indice`, indice);
    // // players que estejam na frente do indice
    // // jogador que está com o índice menor que a variável indice e seja do time A
    // console.log(play.players.filter((jogador) => jogador.team === "A"));
    // let aPlayers = play.players.filter((jogador) => jogador.team === "A");
    // let aLastPlayer = aPlayers[aPlayers.length - 1];
    // let aBeforeLastPlayer = aPlayers[aPlayers.length - 2];
    // .findIndex((player) => player.id === lineOfDeffense.id)
    // console.log("aLastPlayer", aLastPlayer);
    // console.log("aBeforeLastPlayer", aBeforeLastPlayer);

    //ordem por proximidade do gol

    return {
      hasOffside: false,
      offsidePlayers: [], // ids dos atacantes em posição irregular
      offsideLineDefender: null, // id do defensor que define a linha
    };
  }
  // attacking team B
  return {
    hasOffside: false,
    offsidePlayers: [], // ids dos atacantes em posição irregular
    offsideLineDefender: null, // id do defensor que define a linha
  };
}

function checkOffside(play) {
  // os gols ficam no eixo X

  return listOfOffside(play, play.attackingTeam);
}

for (const { nome, arquivo } of index) {
  const play = JSON.parse(fs.readFileSync(path.join(__dirname, arquivo), "utf8"));
  console.log(nome);
  console.log(checkOffside(play));
  console.log("");
}
