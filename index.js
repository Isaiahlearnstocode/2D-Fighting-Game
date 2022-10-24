// This takes the element canvas from html and stores it in the constant canvas in javascript
const canvas = document.querySelector('canvas')

// Canvas Context - Responsible for drawing shapes and sprites onto the canvas itself, want to get 2d context because this is a 2d game
const c = canvas.getContext('2d')

// 15:9 ratio
// Edits the canvas width and height
canvas.width = 1024
canvas.height = 576

// Makes a big rectange, takes four arguments (x position, y position, rectangle width, rectangle height)
c.fillRect(0, 0, canvas.width, canvas.height)

// This makes the gravity of the game so the player is constantly falling 0.2 pixels
const gravity = 0.7

// Places the background image 
const background = new Sprite({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: 'background.png'
})

const shop = new Sprite({
    position: {
      x: 600,
      y: 128
    },
    // References the image that we're using
    imageSrc: 'shop_anim.png',
    // Scales the size of the shop
    scale: 2.75,
    // Number of frames for the shop in order to animate it
    framesMax : 6
})




// Makes the player sprite
const player = new Fighter({
    // This object is the position of the sprite
    position: {
    // Places the player sprite at 0,0 on the canvas to start
        x: 0,
        y: 0
    },
    
    // This is the velocity of the sprite
    velocity: {
        // This set the x and y velocity to 0 so our player is not going to moving by default
        x: 0,
        y: 0
    },
    // This is to offset the attack box
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: 'MedievalIdle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 100,
        y: 110
    },
    sprites: {
        idle: {
            imageSrc: 'MedievalIdle.png',
            framesMax: 8
        },
        run: {
            imageSrc: 'MedievalRun.png',
            framesMax: 8
        },
        jump: {
            imageSrc: 'MedievalJump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: 'MedievalFall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: 'MedievalAttack3.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: 'MedievalTake Hit - white silhouette.png',
            framesMax: 4

        },
        death: {
            imageSrc: 'MedievalDeath.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 150,
            y: 50

        },
        width: 138,
        height: 50
    }
})

// This draws the player on the canvas
// player.draw()

// Makes the enemy sprite
const enemy = new Fighter({
    // This object is the position of the sprite
    position: {
    // Places the enemy sprite at 0,0 on the canvas to start
        x: 400,
        y: 100
    },
    
    // This is the velocity of the sprite
    velocity: {
        // This set the x and y velocity to 0 so our enemy is not going to moving by default
        x: 0,
        y: 0
    },
    
    // Makes the color of the enemy blue
    color: 'blue',

    // This is to offset the attack box
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: 'enemyidle.png',
    framesMax: 11,
    scale: 2.5,
    offset: {
        x: 215,
        y: 135
    },
    sprites: {
        idle: {
            imageSrc: 'enemyidle.png',
            framesMax: 11
        },
        run: {
            imageSrc: 'enemyrun.png',
            framesMax: 8
        },
        jump: {
            imageSrc: 'enemyjump.png',
            framesMax: 3
        },
        fall: {
            imageSrc: 'enemyfall.png',
            framesMax: 3
        },
        attack1: {
            imageSrc: 'enemyattack2.png',
            framesMax: 7
        },
        takeHit: {
            imageSrc: 'enemytakehit.png',
            framesMax: 4

        },
        death: {
            imageSrc: 'HeroDeath.png',
            framesMax: 11
        }
    },
    attackBox: {
        offset: {
            x: -200,
            y: 50

        },
        width: 136,
        height: 50
    }
})

// This draws the enemy on the canvas
//enemy.draw()


console.log(player)

// Makes a variable for all the keys we want to use in the game
const keys = {

    // Player Movements

    // To move to the left
    a: {
        // Sets it's pressed value at start to false
        pressed: false
    },
    // To move to the right
    d: {
        // Sets it's pressed value at start to false
        pressed: false
    },
    // To jump
    w: {
        // Sets it's pressed value at start to false
        pressed: false
    },

    // Enemy Movements

    // To move right
    ArrowRight: {
        pressed:false
    },
    // To move left
    ArrowLeft: {
        pressed:false
    }
}
// This keeps track of the last key pressed
let lastKey


decreaseTimer()

// Looping a function over and over and over again, until you want it to stop
function animate() {
    window.requestAnimationFrame(animate)
    
    // This fills the rectangle called underneath with the color black
    c.fillStyle = 'black'
    
    // Clears the Rectangles
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    // Updates Background
    background.update()

    //Updates the Shop
    shop.update()

    // Updates datas the player's information
    player.update()
    
    // Updates the enemy's information
    enemy.update()

    // This is the default value of the player's x velocity, makes it so that it stops whenever we lift up on our keys
    player.velocity.x = 0

    // This is the default value of the enemy's x velocity, makes it so that it stops whenever we lift up on our keys
    enemy.velocity.x = 0

    // Player Movement
    
    
    // Ulitmately checks if one of our keys are pressed down
    // If key a is pressed and our last key is equal then 
    if (keys.a.pressed && player.lastKey === 'a') {
        // set the player's velocity to -5 so they can move to the left
        player.velocity.x = -5
        // This assigns the player sprite to the run image
        player.switchSprite('run')
    // If key d is pressed and our last key is equal then
    } else if (keys.d.pressed && player.lastKey === 'd') {
        // set the player's velocity to 5 so they can move to the right
        player.velocity.x = 5
        // This assigns the player sprite to the run image
        player.switchSprite('run')
    } else{
        // Sets the default image to idle
        player.switchSprite('idle')
    }
    // If the player is in the air
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }
    // Enemy Movement
    
    // If key ArrowLeft is pressed and our enemy last key is equal then 
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        // set the enemy's velocity to -5 so they can move to the left
        enemy.velocity.x = -5
        // This assigns the player sprite to the run image
        enemy.switchSprite('run')
    // If key ArrowRight is pressed and our enemy last key is equal then
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        // set the enemy's velocity to 5 so they can move to the right
        enemy.velocity.x = 5
        // This assigns the player sprite to the run image
        enemy.switchSprite('run')
    }  else{
        // Sets the default image to idle
        enemy.switchSprite('idle')
    }

 

    // detect for collision for player & enemy
    // If the right side of our attack box is greater than or equal to the left side of our enemy, then we know that they are colliding 
    if (
        rectangularCollision ({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking && player.framesCurrent === 2
        ){
        enemy.takeHit()
        // This makes sure that you only attack once
        player.isAttacking = false
        
        //document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        // Decreases enemy's health with gsap database
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    // If the player misses his attack
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    // detect for collision for enemy
    // If the right side of our attack box is greater than or equal to the left side of our enemy, then we know that they are colliding 
    if (
        rectangularCollision ({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking && enemy.framesCurrent === 2
        ){
            player.takeHit()
        // This makes sure that you only attack once
        enemy.isAttacking = false
        //document.querySelector('#playerHealth').style.width = player.health + '%'
        // Decreases player's health with gsap database
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    // If the enemy misses his attack
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }

    // end the game based on health
    if (enemy.health <= 0 || player.health <= 0 ) {
        determineWinner({ player,enemy, timerID })

    }



}

animate()

// This listens for a event to occur in this case it will be for any key on the keyboard, event will occur everytime we press down on a key within the arrow function
window.addEventListener('keydown' , (event) => {
    // This is to test the keys that are being output to the console
    // console.log(event.key);
    if(!player.dead) {
        switch (event.key){

            // These are the player's movement
    
            // If that key is equal to d on the keyboard then 
            case 'd':
                // Select ours player's velocity on the x axis and sets it to 1, meaning that we will be moving 1 pixel to the right for every frame that we press d
                // player.velocity.x = 1
    
                // When we press d, we set it's value to true
                keys.d.pressed = true
                // Sets the last pressed key to d
                player.lastKey = 'd'
                break
            
                // If that key is equal to a on the keyboard then 
            case 'a':
                // Select ours player's velocity on the x axis and sets it to -1, meaning that we will be moving 1 pixel to left for every frame that we press a
                // player.velocity.x = -1
    
                // When we press a, we set it's value to true
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            
                // If that key is equal to w on the keyboard then 
            case 'w':
                // When we press w, we set it's value to true
                // keys.w.pressed = true
    
                // When we press w, we set the value to -10 so it moves 10 pixels up which jumps up and falls down which works because of the gravity that we established earlier
                player.velocity.y = -20
                // May need to add player. before last key
                lastKey = 'w'
                break
            
            
                // If that key is equal to spacebar (double space in the argument)
            case ' ':
                // The player will attack
                player.attack()
                break
    }
    if(!enemy.dead) {
        switch (event.key){
            // This the enemy's movement
        
            // This moves the enemy to the right
            case 'ArrowRight':
                // When we press ArrowRight, we set it's value to true
                keys.ArrowRight.pressed = true
                // Sets the enemy's last pressed key to ArrowRight
                enemy.lastKey = 'ArrowRight'
                break
        
            // This moves the enemy to left
            case 'ArrowLeft':
                // When we press ArrowLeft, we set it's value to true
                keys.ArrowLeft.pressed = true
                // Sets the enemy's last pressed key to d
                enemy.lastKey = 'ArrowLeft'
                break
        
            // This allows the enemy to jump
            case 'ArrowUp':
                // When we press ArrowUp, we set the value to -10 so it moves 10 pixels up which jumps up and falls down which works because of the gravity that we established earlier
                enemy.velocity.y = -20
                // May need to add enemy. before last key
                lastKey = 'ArrowUp'
                break
        
            // If that key is equal to ArrowDown
            case 'ArrowDown':
                // The enemy will attack
                enemy.attack()
                break
       
        }
    }
    // Grabs the key that we're pressing with event.key  
    

        
    }
    // This tests to see what keys are being output to the console
    // console.log(event.key);

})

// This occurs when the key is let go within the arrow function 
window.addEventListener('keyup' , (event) => {

    // This is for the player's movement

    // Grabs the key that we're checking has been let go with event.key  
    switch (event.key){
        // If that key is equal to d on the keyboard then 
        case 'd':
            // Select ours player's velocity on the x axis and sets it to 0, meaning that we will be stop moving 1 pixel and instead stop moving
            // player.velocity.x = 0

            // When we let go of a, we set it's value to false
            keys.d.pressed = false
            break
        
        // If that key is equal to d on the keyboard then 
        case 'a':
            // Select ours player's velocity on the x axis and sets it to 0, meaning that we will be stop moving 1 pixel and instead stop moving
            // player.velocity.x = 0
            
            // When we let go of a, we set it's value to false
            keys.a.pressed = false
            break
        // case 'w':
            // When we let go of a, we set it's value to false
            // keys.w.pressed = false
            // break
    }

    // This is for the enemy's movement

    // Grabs the key that we're checking has been let go with event.key  
    switch (event.key){
        // If that key is equal to ArrowRight on the keyboard then 
        case 'ArrowRight':
            // When we let go of ArrowRight, we set it's value to false
            keys.ArrowRight.pressed = false
            break
        
        // If that key is equal to d on the keyboard then 
        case 'ArrowLeft':
            // When we let go of ArrowLeft, we set it's value to false
            keys.ArrowLeft.pressed = false
            break
    }
    // This tests to see what keys are being output to the console
    // console.log(event.key);

})