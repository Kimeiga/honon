import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  pixelArt: true
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "./src/assets/honon_background_square.png");
  this.load.image('ship', './src/assets/playerShip1_blue.png');

  
}

let ship;

// function create() {
//   // Create a tilesprite (x, y, width, height, key)
//   let tileSprite = this.add.tileSprite(
//     0,
//     0,
//     window.innerWidth,
//     window.innerHeight,
//     "honon_background_1"
//   );

//   // Phaser supports multiple cameras, but you can access the default camera like this:
//   const camera = this.cameras.main;

//   // Set up the arrows to control the camera
//   const cursors = this.input.keyboard.createCursorKeys();
//   controls = new Phaser.Cameras.Controls.FixedKeyControl({
//     camera: camera,
//     left: cursors.left,
//     right: cursors.right,
//     up: cursors.up,
//     down: cursors.down,
//     speed: 0.5
//   });

//   // Help text that has a "fixed" position on the screen
//   this.add
//     .text(16, 16, "Arrow keys to scroll", {
//       font: "18px monospace",
//       fill: "#ffffff",
//       padding: { x: 20, y: 10 },
//       backgroundColor: "#000000"
//     })
//     .setScrollFactor(0);
// }

// function update(time, delta) {
//   // Apply the controls to the camera each update tick of the game
//   controls.update(delta);
// }

function create() {

  /**
  * 
  *  A TileSprite is a Sprite that has a repeating texture. 
  *  The texture can be scrolled and scaled independently of the TileSprite itself.
  *  Textures will automatically wrap and are designed so that you can create game
  *  backdrops using seamless textures as a source.
  *
  **/
      // Create a tilesprite (x, y, width, height, key)
      // tileSprite = this.add.tileSprite(400, 300, game.width, game.height, 'background');

      // You can access the game's config to read the width & height
  const { width, height } = this.sys.game.config;

  // Creating a repeating background sprite
  this.bg = this.add.tileSprite(0, 0, width, 512, "background").setScale(2);
  this.bg.setOrigin(0, 0);
  this.bg.setScrollFactor(0, 1);



  this.ship = this.physics.add.sprite(0, 0, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  
  this.ship.setDrag(100);
  this.ship.setAngularDrag(100);
  this.ship.setMaxVelocity(200);


  this.cameras.main.startFollow(this.ship);

  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.cursors.left.isDown) {
    this.ship.setAngularVelocity(-150);
  } else if (this.cursors.right.isDown) {
    this.ship.setAngularVelocity(150);
  } else {
    this.ship.setAngularVelocity(0);
  }

  if (this.cursors.up.isDown) {
    this.physics.velocityFromRotation(this.ship.rotation + 1.5, -100, this.ship.body.acceleration);
  } else {
    this.ship.setAcceleration(0);
  }


  // scroll the texture of the tilesprites proportionally to the camera scroll
  this.bg.tilePositionX = this.cameras.main.scrollX * .3;
  // this.bg.tilePositionY = this.cameras.main.scrollY * .3;

  console.log(this.ship.y);

  if (this.ship.y < 500) {
    this.cameras.main.setBackgroundColor("#34B4DB");
  }
  else {
    this.cameras.main.setBackgroundColor("#218AC8");


  }
}