# Desafio VAR — Codecon

A partir de um lance congelado no momento do passe, decidir se há algum jogador
do time atacante em **posição de impedimento**.

A função **não decide o lance** — ela entrega o veredito da posição. O árbitro
decide o resto.

A regra do impedimento vocês já conhecem. O desafio é traduzir ela em código a
partir das posições dos jogadores.

## O que você implementa

```js
function checkOffside(play) {
  // sua lógica aqui
  return {
    hasOffside: false,
    offsidePlayers: [],       // ids dos atacantes em posição irregular
    offsideLineDefender: null // id do defensor que define a linha
  };
}
```

## O objeto `play`

```jsonc
{
  "field": { "width": 68, "length": 105 },
  "attackingTeam": "A",
  "attackDirection": "right",  // o time atacante SEMPRE ataca o gol da direita (x maior = mais perto do gol)
  "passInstant": true,         // as posições estão congeladas no momento do passe
  "passer": "A9",              // quem deu o passe
  "players": [
    { "id": "A11", "team": "A", "x": 88, "y": 34 },
    { "id": "B1",  "team": "B", "x": 103, "y": 34, "goalkeeper": true }
    // ... 22 jogadores no total
  ],
  "ball": { "x": 60, "y": 30 }
}
```

Coordenadas em metros. `x` cresce para a direita (0 = linha de fundo esquerda,
105 = linha de fundo direita). `y` cresce de uma lateral à outra (0 a 68).
Goleiros vêm com `"goalkeeper": true`.

## Os lances de teste

Cada arquivo é um objeto `play` pronto para passar à função. O `index.json` lista todos.

## Retorno esperado

```js
{ hasOffside: true, offsidePlayers: ["A11"], offsideLineDefender: "B4" }
```

- `hasOffside` — tem algum atacante em posição irregular?
- `offsidePlayers` — a lista de quem está
- `offsideLineDefender` — o defensor que define a linha (usado para desenhar o resultado)
