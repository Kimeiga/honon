import Phaser from "phaser";

import bg from "../assets/honon_background_square_2.png";
import ship from "../assets/playerShip1_blue.png";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("background", bg);
    this.load.image("ship", ship);
  }

  create() {
    /**
     *
     *  A TileSprite is a Sprite that has a repeating texture.
     *  The texture can be scrolled and scaled independently of the TileSprite itself.
     *  Textures will automatically wrap and are designed so that you can create game
     *  backdrops using seamless textures as a source.
     *
     **/

    // You can access the game's config to read the width & height
    const { width, height } = this.sys.game.config;

    // Creating a repeating background sprite
    this.bg = this.add.tileSprite(0, 0, width, 512, "background").setScale(2);
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0, 1);

    this.ship = this.physics.add
      .sprite(0, 0, "ship")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(53, 40);

    this.ship.setDrag(250);
    this.ship.setAngularDrag(100);
    this.ship.setMaxVelocity(1500);

    this.cameras.main.startFollow(this.ship);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      strafe_left: Phaser.Input.Keyboard.KeyCodes.Q,
      strafe_right: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.ship.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.ship.setAngularVelocity(150);
    } else {
      this.ship.setAngularVelocity(0);
    }

    if (
      this.cursors.up.isDown ||
      this.cursors.strafe_left.isDown ||
      this.cursors.strafe_right.isDown ||
      this.cursors.down.isDown
    ) {
      if (this.cursors.up.isDown) {
        this.physics.velocityFromRotation(
          this.ship.rotation - 1.5708,
          800,
          this.ship.body.acceleration
        );
      }
      if (this.cursors.strafe_left.isDown) {
        this.physics.velocityFromRotation(
          this.ship.rotation - 3.14159,
          600,
          this.ship.body.acceleration
        );
      }
      if (this.cursors.strafe_right.isDown) {
        this.physics.velocityFromRotation(
          this.ship.rotation - 3.14159,
          -600,
          this.ship.body.acceleration
        );
      }
      if (this.cursors.down.isDown) {
        this.physics.velocityFromRotation(
          this.ship.rotation - 1.5708,
          -600,
          this.ship.body.acceleration
        );
      }
    } else {
      this.ship.setAcceleration(0);
    }

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.bg.tilePositionX = this.cameras.main.scrollX * 0.3;
    // this.bg.tilePositionY = this.cameras.main.scrollY * .3;

    if (this.ship.y < 500) {
      this.cameras.main.setBackgroundColor("#34B4DB");
    } else {
      this.cameras.main.setBackgroundColor("#218AC8");
    }
  }
}
