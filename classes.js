class Sprite {
    // Takes in a position and Image Source
    constructor({ 
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = {x: 0, y: 0} }) {


        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        // This is the image source
        this.image.src = imageSrc
        // This is the scale of the image
        this.scale = scale
        // This stores the max amount of frames per asset
        this.framesMax = framesMax
        // This stores the current frame, and start at 0 for it's default
        this.framesCurrent = 0
        // How many frames have elpased over the entire animation and increases overtime
        this.framesElapsed = 0
        // How many frames should you go through before you change frames.Current which is the actual animation
        this.framesHold = 10
        this.offset = offset
        
       
        
    }
    draw() {
       c.drawImage(
        this.image, 
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x, 
        this.position.y - this.offset.y, 
        this.image.width / this.framesMax * this.scale, 
        this.image.height * this.scale) 
    }
    
    // This animates the frames of all of the assets
    animateFrames() {
        this.framesElapsed++

        // Take framesElpased and divide it by frames hold and if the remainder is 0 then 
        if (this.framesElapsed % this.framesHold === 0) {
            // This updates the frames that we are currently on until the current frame that you're on reaches the max number of frames then it is set back to 0
            // subtract one from framesMax
            if (this.framesCurrent < this.framesMax - 1){
            this.framesCurrent++
            } else {
            this.framesCurrent = 0
            }
        }
    }
    
    update() {
        this.draw()
        this.animateFrames()
       
        
            

        
    }
    
}

// Class is like def in python, in it needs a constructor method, which is just a function in the class itself
class Fighter extends Sprite{
    // With the {} (which makes them an object) tthat passes through a position property and or a velocity property, they're not required and the order doesn't matter because they are being passed through as properties in an object
    constructor({ 
        position, 
        velocity, 
        color = 'red',  
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = {x: 0, y: 0},
        // Stores all of the sprites for the fighters
        sprites,
        attackBox = {
            offset: {},
            width: undefined,
            height: undefined
        }
    }) {
            // Calls the constructor of the parent function
            super({
                position,
                imageSrc,
                scale,
                framesMax,
                offset
            })
            // This will be assigned to the position of the individual sprite that is made
            //this.position = position
            
            // This will be assigned to the velocity of the indivdual sprite that is made
            this.velocity = velocity
            
            // This will be assigned the height of the individual sprite that is made
            this.height = 150
            
            // This will be assigned the width of the individual sprite that is made
            this.width = 50
            
            // This is just the last key pressed for all create sprites
            this.lastKey
            
            // This is the attack box for the sprites
            this.attackBox = {
                // Whenever position changes, the attack box position changes as well
                // position: this.position,
                position: {
                    x : this.position.x,
                    y : this.position.y
                },
                // Offset just refers to itself
                offset: attackBox.offset, 
                width: attackBox.width,
                height: attackBox.height,
            }
            // This takes on the color assigned in the constructor
            this.color = color
            // This is the variable to store if you are attacking or not
            this.isAttacking
            // This is the health for the player and enemy
            this.health = 100
            // This stores the current frame, and start at 0 for it's default
            this.framesCurrent = 0
            // How many frames have elpased over the entire animation and increases overtime
            this.framesElapsed = 0
            // How many frames should you go through before you change frames.Current which is the actual animation
            this.framesHold = 10
            // Sprites for the fighters
            this.sprites = sprites
            // Declares if the players are dead
            this.dead = false

            for (const sprite in this.sprites) {
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }

            console.log(this.sprites)


        }
        // This draws the sprite itself
        //draw() {
            // Makes sure that we fill in the rectangle with a red color
            // c.fillStyle = 'red'

            //c.fillStyle = this.color
            // Makes a rectangle using the x and y values stored in this.position from new sprite, and then width and height
            //c.fillRect(this.position.x, this.position.y, this.width, this.height)

            //attack box
            // If the player is Attacking then make the attack box
            //if (this.isAttacking) {
                // Makes the attack box green
            //c.fillStyle = 'green'
            //c.fillRect(
                //this.attackBox.position.x, 
                //this.attackBox.position.y, 
                //this.attackBox.width, 
                //this.attackBox.height
            //)
            //}
        //}
        
        
        // Calls upon this properity when properities need to updated for sprites moving around the screen
        update() {
            // This references draw above this 
            this.draw()
            if (!this.dead) {this.animateFrames()}
            // This animates the frames
            

            // This makes sure that the attack boxes position updates with the position of the player and enemy
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y
            
            // This draws the attack box
            //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height )
            
            // Over time position.x will add onto it self 
            this.position.x += this.velocity.x
            
            // Over time position.y will have 10 pixles added onto it for each frame it is looped over
            // this.position.y += 10
            // Over time position.y will add onto it self
            this.position.y += this.velocity.y
            
            // Gravity Function
            // If the position of y plus bottom of the rectangle plus our sprite velocity is greater than or equal the bottom of our canvas, then we set the velocity of the rectangle to 0 so it doesn't fall off the canvas
            if (this.position.y + this.height + this.velocity.y >= canvas.height - 97) {
                // This stops our player from moving doward anymore
                this.velocity.y = 0
                this.position.y = 330
            // This is gravity over time which adds downward accleration to our objects
            }   else this.velocity.y += gravity

            //console.log(this.position.y)
        }
        // Calls upon this property when updating the sprites attack
        attack() {
            // Switchs the sprite
            this.switchSprite('attack1')

            // It will set this.Attacking equal to True and 
            this.isAttacking = true
            
            // then after 100 milliseconds, attacking is going to set to false, so we are not always attacking
            //setTimeout(() => {
              //  this.isAttacking = false
            //}, 1000)
        }

        takeHit(){
            this.health -= 20

            if (this.health <= 0){
                this.switchSprite('death')
            } else this.switchSprite('takeHit')
        }


        // Switches the sprite the we are using for each player
        switchSprite(sprite) {
            // If the player health = 0 then it won't run any other code
            if (this.image === this.sprites.death.image) {
                if (this.framesCurrent === this.sprites.death.framesMax - 1)
                    this.dead = true
                return
            }
            
            // Ovewrites all other animations with attack animation
            if (this.image === this.sprites.attack1.image && 
                this.framesCurrent < this.sprites.attack1.framesMax - 1)
                return

            // Overwrites all other animations when hit
            if (this.image === this.sprites.takeHit.image && 
                this.framesCurrent < this.sprites.takeHit.framesMax - 1) 
                return

            switch (sprite){
                case 'idle':
                    if (this.image !== this.sprites.idle.image){
                        this.image = this.sprites.idle.image
                        this.framesMax = this.sprites.idle.framesMax
                        this.framesCurrent = 0
                    }
                        
                    break;
                case 'run':
                    if (this.image !== this.sprites.run.image){
                        this.image = this.sprites.run.image
                        this.framesMax = this.sprites.run.framesMax
                        this.framesCurrent = 0
                    } 
                    break;
                case 'jump':
                    if (this.image !== this.sprites.jump.image){
                        this.image = this.sprites.jump.image
                        this.framesMax = this.sprites.jump.framesMax
                        this.framesCurrent = 0
                    }
                    break;
                case 'fall':
                    if (this.image !== this.sprites.fall.image){
                        this.image = this.sprites.fall.image
                        this.framesMax = this.sprites.fall.framesMax
                        this.framesCurrent = 0
                    }
                    break;
                case 'attack1':
                    if (this.image !== this.sprites.attack1.image){
                        this.image = this.sprites.attack1.image
                        this.framesMax = this.sprites.attack1.framesMax
                        this.framesCurrent = 0
                    }
                    break;
                case 'takeHit':
                    if (this.image !== this.sprites.takeHit.image){
                        this.image = this.sprites.takeHit.image
                         this.framesMax = this.sprites.takeHit.framesMax
                        this.framesCurrent = 0
                    }
                    break;
                case 'death':
                    if (this.image !== this.sprites.death.image){
                        this.image = this.sprites.death.image
                        this.framesMax = this.sprites.death.framesMax
                        this.framesCurrent = 0
                    }
                    break;
                    
                
            }

        }
    }
