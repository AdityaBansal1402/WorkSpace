import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      pixelArt: true,  // Pixel art settings to maintain crisp graphics
      parent: gameRef.current,  // Attach the game to this DOM element
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },  // No gravity for top-down movement
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);

    // Preload assets (map, tiles, avatar sprite)
    function preload() {
      this.load.image('tiles', '/assets/tileset.png');  // Load tileset image
      this.load.tilemapTiledJSON('map', '/assets/map.json');  // Load map created in Tiled
      this.load.spritesheet('avatar', '/assets/avatar.png', {
        frameWidth: 16,  // Each frame in the sprite sheet
        frameHeight: 16,
      });
    }

    // Create the map, avatar, and animations
    function create() {
      // Create the map
      const map = this.make.tilemap({ key: 'map' });
      const tileset = map.addTilesetImage('TilesetNameInTiled', 'tiles');
      const layer = map.createLayer('TileLayerName', tileset);
      
      // Create player (avatar) sprite
      this.player = this.physics.add.sprite(100, 100, 'avatar');
      
      // Camera follow
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      
      // Define movement controls (arrow keys)
      this.cursors = this.input.keyboard.createCursorKeys();
      
      // Create walking animations for avatar
      this.anims.create({
        key: 'walk_down',
        frames: this.anims.generateFrameNumbers('avatar', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: 'walk_left',
        frames: this.anims.generateFrameNumbers('avatar', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: 'walk_right',
        frames: this.anims.generateFrameNumbers('avatar', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: 'walk_up',
        frames: this.anims.generateFrameNumbers('avatar', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // Update method for handling movement and animation
    function update() {
      // Stop player velocity (standing still by default)
      this.player.body.setVelocity(0);

      // Movement and animations based on cursor input
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-100);  // Move left
        this.player.anims.play('walk_left', true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(100);  // Move right
        this.player.anims.play('walk_right', true);
      } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-100);  // Move up
        this.player.anims.play('walk_up', true);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(100);  // Move down
        this.player.anims.play('walk_down', true);
      } else {
        this.player.anims.stop();  // Stop animation when player is idle
      }
    }

    // Clean up Phaser game instance on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} />;
};

export default Game;
