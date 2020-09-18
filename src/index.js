import Phaser from "phaser";

import GameScene from "./scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 300 },
    },
  },
  pixelArt: true,
  scene: [GameScene],
  antialias: true,
};

export default new Phaser.Game(config);
