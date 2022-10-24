// This determines if the attack box hits the other player/enemy
// replaces player with rectangle1 and enemy with rectangle2
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        // and if they go past the enemy the are no longer attack them
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        // and if the attack box position and height is greater than or equal to the top side of the enemy
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        // and if the top side of the player attack box is less than or equal to the bottom side of our enemy and enemy height then we know they are colliding on the y axis
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height  
        // and player is attacking
    )
}

function determineWinner({player,enemy, timerID}) {
    clearTimeout(timerID)
    document.querySelector('#displayText').style.display = 'flex'
    
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
        
    } else if (enemy.health > player.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
        
    }
}

// This makes the timer count down by one by setting to 10, decreasing it by 1 per second
let timer = 60
let timerID 
function decreaseTimer() {
    if (timer > 0) {
        timerID = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        
        determineWinner({player,enemy, timerID})
        
    }
   
}