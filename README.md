[![Codacy Badge](https://app.codacy.com/project/badge/Grade/144f837118c547f2b9697dc30fe74917)](https://www.codacy.com/gh/kaczor6418/dice-game/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kaczor6418/dice-game&amp;utm_campaign=Badge_Grade)

# Dice Game

> Guess next dice score

## Game rules:

  - The player can see one dice at a time
  - The player can guess by using the ***Less*** and ***More*** buttons whether the next dice will have a lower value
  - Once the player chooses one of the options, player gets `0.1` point if the answer was correct, and a new dice is shown
  - Game have **30** rounds in total

### Hints:

  - The player may stop the game at any time. Next time when the player will open app he will be asked does he want to
    load old game state or start a new game
  - The player can check game history by Clicking ***> Game history*** label

## Built with:

<p align="center">
  &nbsp; &nbsp; <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg" alt="javascript"/></a> &nbsp; &nbsp;
  &nbsp; &nbsp; <a href="https://www.typescriptlang.org/"><img src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" 
alt="typescript"/></a> &nbsp; &nbsp; 
  &nbsp; &nbsp; <a href="https://vuejs.org/"><img src="https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg" 
alt="vue"/></a> &nbsp; &nbsp;
</p>

>I also used ***[DiceApi](http://roll.diceapi.com/)*** to roll dice

## Project setup

### Requirements:

To run this project you will need:
  - npm
  - node.js
  - any moder web-browser

### Setup

  - Installation:
    ```
    git clone https://github.com/kaczor6418/dice-game.git
    cd ./dice-game
    npm install
    ```
  - Running server:
    ```
    npm run serve
    ```
  - Build production version:
    ```
    npm run build
    ```
  - Running linters:
    ```
    npm run lint
    ```
