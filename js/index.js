var displayWidth = window.innerWidth
var displayHeight = window.innerHeight
// var displayWidth = 390
// var displayHeight = 844
var unit = displayWidth/10

var config = {
    type: Phaser.AUTO,
    width: displayWidth,
    height: displayHeight,
    backgroundColor: '#39b438',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



var game = new Phaser.Game(config);



var cards_origin = [
    ["spade",   "ace"], ["spade",   "2"], ["spade",   "3"], ["spade",   "4"], ["spade",   "5"], ["spade",   "6"], ["spade",   "7"], ["spade",   "8"], ["spade",   "9"], ["spade",   "10"], ["spade",   "jack"], ["spade",   "queen"], ["spade",   "king"],
    ["club",    "ace"], ["club",    "2"], ["club",    "3"], ["club",    "4"], ["club",    "5"], ["club",    "6"], ["club",    "7"], ["club",    "8"], ["club",    "9"], ["club",    "10"], ["club",    "jack"], ["club",    "queen"], ["club",    "king"],
    ["heart",   "ace"], ["heart",   "2"], ["heart",   "3"], ["heart",   "4"], ["heart",   "5"], ["heart",   "6"], ["heart",   "7"], ["heart",   "8"], ["heart",   "9"], ["heart",   "10"], ["heart",   "jack"], ["heart",   "queen"], ["heart",   "king"],
    ["diamond", "ace"], ["diamond", "2"], ["diamond", "3"], ["diamond", "4"], ["diamond", "5"], ["diamond", "6"], ["diamond", "7"], ["diamond", "8"], ["diamond", "9"], ["diamond", "10"], ["diamond", "jack"], ["diamond", "queen"], ["diamond", "king"],
]
var cards = cards_origin.slice()
var player1_hand = [,]
var player2_hand = [,]
var board = [,,,,]
var pot = 0
var blind = 200
var player1_money = 10000
var player2_money = 10000




function preload(){
    // this.load.image("background", "assets/background.jpg")

    // 카드 이미지 로드
    for(let s=0; s<4; s++){
        var shape
        if(s==0)      shape = "s"
        else if(s==1) shape = "c"
        else if(s==2) shape = "h"
        else          shape = "d"

        for(let number=1; number<10; number++){
            this.load.image(`${number}${shape}`, `assets/cards/${number}${shape}.png`)
        }

        this.load.image(`a${shape}`, `assets/cards/a${shape}.png`)
        this.load.image(`j${shape}`, `assets/cards/j${shape}.png`)
        this.load.image(`q${shape}`, `assets/cards/q${shape}.png`)
        this.load.image(`k${shape}`, `assets/cards/k${shape}.png`)
    }
    // 카드 뒷면 로드
    this.load.image("back", "assets/cards/back.png")
}

function create(){
    // var container = this.add.container(displayWidth/2, displayHeight/2)
    // var test = game.add.sprite(200, 200, 'back');
    var board_sprite = [,,,,]
    var pivot = [displayWidth/2 - 340, displayHeight/2]
    for(let i=0; i<5; i++){
        board_sprite[i] = this.add.sprite(pivot[0] + i*170, pivot[1], "back").setScale(0.3)
    }
    
    var player1_hand_sprite = [,]
    player1_hand_sprite[0] = this.add.sprite(95, displayHeight, "back").setScale(0.3)
    player1_hand_sprite[0].angle = -5
    player1_hand_sprite[1] = this.add.sprite(170, displayHeight, "back").setScale(0.3)
    player1_hand_sprite[1].angle = 5

    var player2_hand_sprite = [,]
    player2_hand_sprite[0] = this.add.sprite(displayWidth - 95, 0, "back").setScale(0.3)
    player2_hand_sprite[0].angle = -5
    player2_hand_sprite[1] = this.add.sprite(displayWidth - 170, 0, "back").setScale(0.3)
    player2_hand_sprite[1].angle = 5

    var player_hand_hitbox = this.add.rectangle(150, displayHeight - 100, 300, 200)
    player_hand_hitbox.setInteractive()
    player_hand_hitbox.on("pointerover", () => {
        player_hand_hitbox.setStrokeStyle(4, 0xefc53f);
        player1_hand_sprite[0].setTexture("as")
        player1_hand_sprite[1].setTexture("ah")
    })
    player_hand_hitbox.on("pointerout", () => {
        player_hand_hitbox.setStrokeStyle(0, 0xefc53f);
        player1_hand_sprite[0].setTexture("back")
        player1_hand_sprite[1].setTexture("back")
    })

    // var button_fold = this.add.sprite(displayWidth - 200, 0, "back").setScale(0.3)
    // var button_bet
    // var button_call
}

function update ()
{
}


function action(){
    cards = cards_origin.slice()

    player1_hand[0] = drawCard()
    player1_hand[1] = drawCard()

    player2_hand[0] = drawCard()
    player2_hand[1] = drawCard()
}

function drawCard(){
    return cards.splice((Math.random() * cards.length) | 0, 1)
}