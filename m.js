(function(){

var boardWidth = 6;
var boardHeight = 14;

var tileSize = 32;


var framePeriod = 30;

var deleteDelay = 400;

var garbageSpeed = 4;

var startY = 8;

var playerX = 224;
var playerY = 48;

var truckX = 6*64;
var truckV = 0;


var COLOR_WHITE = 'white';
var COLOR_BLACK = 'black';
var HELVETICA = ' Helvetica, Arial, sans-serif';


var TV_ARR = [0, 224, 640, 432];
var basementExtras = [TV_ARR];
for(var i=0;i<9;i++){
    basementExtras.push([0, 208, 832, i*64]);
}

var upgradeOptions = [
    {
        name:'Push Speech',
        ss: function(){
            return [0,32,16,32];
        }
    },
    {
        name: 'Junk',
        ss: function(){
            return [16*upgrades[1],16,16*upgrades[1],16];
        }
    },
    {
        name: 'Speedup',
        ss: function(){
            return [48,16,48,16];
        }
    }
]

var upgrades = [0,0, 0];
var upgradeSelector = 0;

var playerGender = 1;
var spouseGender = 0;

var getName =function(id){
    if(typeof characters[id].name == "function")
        return characters[id].name();
    return characters[id].name;
}

var characters = [
    {
        name: '',
        ssy: 0
    },{
        name: 'Dad',
        ssy: 64
    },{
        name: function(){
            if(currentLevel == 2){
                return 'Coworker';
            }else if(currentLevel == 3){
                if(spouseGender==1){
                    return 'Girlfriend';
                }else{
                    return 'Boyfriend';
                }
            }else{
                if(spouseGender==1){
                    return 'Wife';
                }else{
                    return 'Husband';
                }
            }
        },
        ssy: 32
    },
    {
        name: 'Son',
        ssy: 96
    },
    {
        name: 'Daughter',
        ssy: 80
    },
    {
        name: 'Boss',
        ssy: 112
    },{
        name: 'Doctor',
        ssy: 176
    },{
        name: "#2 Amateur"
    },{
        name: "#1 Amateur"
    },{
        name: "East Coast Champ"
    },{
        name: "USA Champ"
    },{
        name: "NA Champ"
    },{
        name: "World Champ"
    }
];

var YOU = 0;
var DAD = 1;
var SPOUSE = 2;
var SON = 3;
var DAUGHTER = 4;
var BOSS = 5;
var DOCTOR = 6;
var AMATEUR2 = 7;
var AMATEUR1 = 8;
var EASTCOASTCHAMP = 9;
var USCHAMP = 10;
var NACHAMP = 11;
var WORLDCHAMP = 12;


//actions
var ACTION_WALK = 0;
var ACTION_CONVO = 1;
var ACTION_EXTRA = 2;
var ACTION_START = 3;
var ACTION_DELAY = 4;
var ACTION_DIRECTION = 5;
var ACTION_END = 6;

var levels = [
    {
        sightRadius: 800,
        speed: 35,
        aiSpeed: 50,
        wall:[16,160],
        floor:[0,160],
        p2: DAD,
        extras:[],
        characters:[{
            character: YOU,
            young: true,
            x: 5*64
        },{
            character: DAD,
            x: -64
        }],
        script: [
            [ACTION_WALK,1, 2*64],
            [ACTION_CONVO,1,[1]],
            [ACTION_DELAY,1000],
            [ACTION_CONVO,1,[21]],
            [ACTION_DELAY,2500],
            [ACTION_CONVO,1,[21,0,21]],
            [ACTION_DELAY,1500],
            [ACTION_WALK,1, 9*64],
            [ACTION_EXTRA, [0, 224, 640, 7*64-16]],
            [ACTION_DELAY,1200],
            [ACTION_DIRECTION, 0, 16],
            [ACTION_DIRECTION, 1, 16],
            [ACTION_START]
        ]
    },{
        sightRadius: 750,
        speed: 30,
        aiSpeed: 30,
        wall:[16,160],
        floor:[0,160],
        p2: DAD,
        extras:[
            TV_ARR.concat([16, 240, 13*64, 400])
        ],
        characters:[{
            character: YOU,
            x: 5*64
        },{
            character: DAD,
            x: -64
        }],
        script: [
            [ACTION_WALK,1, 0],
            [ACTION_CONVO,1,[21,14]],
            [ACTION_DELAY,700],
            [ACTION_WALK,1, 9*64],
            [ACTION_DIRECTION, 0, 16],
            [ACTION_DIRECTION, 1, 16],
            [ACTION_START]
        ]
    },{
        sightRadius: 740,
        speed: 25,
        aiSpeed: 15,
        wall:[16,256],
        floor:[0,240],
        characters:[{
            character: YOU,
            x: -64
        },{
            character: SPOUSE,
            x: -64
        },{
            character: BOSS,
            x: -64
        }],
        script: [
            [ACTION_WALK,0, 2*64],
            [ACTION_DELAY,1000],
            [ACTION_WALK,2, 1*64],
            [ACTION_CONVO,2,[4]],
            [ACTION_DELAY,1500],
            [ACTION_CONVO,2,[12,12,12,12,12]],
            [ACTION_DELAY,700],
            [ACTION_CONVO,2,[13,23]],
            [ACTION_DELAY,500],
            [ACTION_CONVO,2,[14,23]],
            [ACTION_DELAY,700],
            [ACTION_CONVO,2,[23,23,23,23,23]],
            [ACTION_DELAY,200],
            [ACTION_WALK,2, -64],
            [ACTION_DELAY,1500],
            [ACTION_WALK,1, 64],
            [ACTION_DELAY,1500],
            [ACTION_CONVO,1,[11]],
            [ACTION_WALK,0, 5*64],
            [ACTION_DIRECTION, 0, 16],
            [ACTION_WALK,1, 3*64],
            [ACTION_START, [[
                1,
                400,
                [
                    [12,14],
                    [0,2],
                    [9,11]
                ]
            ]]]
        ],
        corporate: true
    },{
        sightRadius: 720,
        speed: 20,
        aiSpeed: 10,
        wall:[0,192],
        floor:[16,256],
        p2: AMATEUR2,
        extras: basementExtras,
        characters:[{
            character: YOU,
            x: 5*64
        },{
            character: SPOUSE,
            x: 4*64
        }],
        script: [
            [ACTION_CONVO,1,[10,10,10]],
            [ACTION_DELAY,1000],
            [ACTION_WALK, 1, function(){return 3*64-32*upgrades[0]}],
            [ACTION_DIRECTION, 0, 16],
            [ACTION_START, [[
                1,
                300,
                [
                    [1,23],
                    [10,10]
                ]
            ]]]
        ]
    },{
        sightRadius: 690,
        speed: 15,
        aiSpeed: 7,
        wall:[0,192],
        floor:[16,256],
        p2: AMATEUR1,
        extras: basementExtras,
        characters:[{
            character: YOU,
            x: 5*64
        },{
            character: SPOUSE,
            x: -64
        }],
        script: [
            [ACTION_WALK, 1, 5*64],
            [ACTION_DIRECTION, 1, 16],
            [ACTION_CONVO,1,[9]],
            [ACTION_DELAY,1000],
            [ACTION_DIRECTION, 1, 0],
            [ACTION_WALK, 1, function(){return 3*64-32*upgrades[0]}],
            [ACTION_DIRECTION, 0, 16],
            [ACTION_START, [[
                1,
                175,
                [
                    [1,23],
                    [22,22]
                ]
            ]]]
        ]
    },{
        sightRadius: 650,
        speed: 10,
        aiSpeed: 5,
        wall:[0,192],
        floor:[16,256],
        p2: EASTCOASTCHAMP,
        extras:basementExtras,
        characters:[{
            character: YOU,
            direction: 16,
            x: 5*64
        },{
            character: SPOUSE,
            x: -64
        },{
            character: DAUGHTER,
            x: -64
        }],
        script: [
            [ACTION_WALK,2, function(){return 2*64+16-32*upgrades[0]}],
            [ACTION_WALK,1, function(){return 3*64-32*upgrades[0]}],
            [ACTION_START, [[
                1,
                150,
                [
                    [1,23],
                    [22,22]
                ]
            ]]]
        ]
    },{
        sightRadius: 600,
        speed: 9,
        aiSpeed: 4,
        wall:[0,192],
        floor:[16,256],
        p2: USCHAMP,
        extras:basementExtras,
        characters:[{
            character: YOU,
            direction: 16,
            x: 5*64
        },{
            character: SPOUSE,
            x: -64
        },{
            character: DAUGHTER,
            x: -64
        },{
            character: SON,
            x: -64
        }],
        script: [
            [ACTION_WALK,3, function(){return 1*64+32-32*upgrades[0]}],
            [ACTION_WALK,2, function(){return 2*64+16-32*upgrades[0]}],
            [ACTION_WALK,1, function(){return 3*64-32*upgrades[0]}],
            [ACTION_START, [
                [
                    1,
                    125,
                    [
                        [1,23]
                    ]
                ],[
                    2,
                    300,
                    [
                        [0,8]
                    ]
                ]
            ]]
        ]
    },{
        sightRadius: 550,
        wall:[16,256],
        floor:[0,256],
        extras:[
            [16, 208, 4*64, 3*64],
            [16, 208, 5*64, 4*64],
            [16, 208, 6*64, 5*64],
            [16, 224, 4*64, 4*64],
            [16, 224, 4*64, 5*64],
            [16, 224, 5*64, 3*64],
            [16, 224, 5*64, 5*64],
            [16, 224, 6*64, 3*64],
            [16, 224, 6*64, 4*64]
        ],
        characters:[{
            character: YOU,
            x: -64
        },{
            character: BOSS,
            direction: 16,
            x: 5*64
        }],
        script: [
            [ACTION_WALK,0, 4*64],
            [ACTION_DELAY,400],
            [ACTION_DIRECTION, 0, 16],
            [ACTION_CONVO,1,[6, 23]],
            [ACTION_DELAY,1200],
            [ACTION_CONVO,1,[23, 23, 23]],
            [ACTION_DELAY,300],
            [ACTION_CONVO,1,[23, 23]],
            [ACTION_DELAY,300],
            [ACTION_CONVO,1,[23]],
            [ACTION_DELAY,4000],
            [ACTION_CONVO,1,[6,6,6,6]],
            [ACTION_DELAY,300],
            [ACTION_CONVO,1,[6,12, 13, 14, 6, 6 ,6]],
            [ACTION_DELAY,900],
            [ACTION_CONVO,1,[23]],
            [ACTION_DELAY,4000],
            [ACTION_DIRECTION, 1, 0],
            [ACTION_DELAY,3000],
            [ACTION_CONVO,1,[17, 19]],
            [ACTION_DELAY,3000],
            [ACTION_CONVO,1,[7]],
            [ACTION_DELAY,3000],
            [ACTION_DIRECTION, 0, 0],
            [ACTION_DELAY,1000],
            [ACTION_WALK,0, -64],
            [ACTION_DELAY,1000],
            [ACTION_DIRECTION, 1, 16],
            [ACTION_DELAY,1000]
        ],
        corporate: true,
        removeTv:true
    },{
        sightRadius: 500,
        speed: 8,
        aiSpeed: 3,
        wall:[0,192],
        floor:[16,256],
        p2: NACHAMP,
        extras:basementExtras,
        characters:[{
            character: YOU,
            direction: 16,
            x: 5*64
        },{
            character: SPOUSE,
            x: -64
        },{
            character: DAUGHTER,
            x: -64
        },{
            character: SON,
            x: -64
        }],
        script: [
            [ACTION_WALK,3, function(){return 1*64+32-32*upgrades[0]}],
            [ACTION_WALK,2, function(){return 2*64+16-32*upgrades[0]}],
            [ACTION_WALK,1, function(){return 3*64-32*upgrades[0]}],
            [ACTION_START, [
                [
                    1,
                    300,
                    [
                        [23,23],
                        [6, 7,8]
                    ]
                ],[
                    2,
                    150,
                    [
                        [7,8]
                    ]
                ],[
                    3,
                    150,
                    [
                        [7,8]
                    ]
                ]
            ]]
        ]
    },{
        sightRadius: 450,
        wall:[16,256],
        floor:[0,256],
        extras:[
            [16, 192, 4*64, 5*64],
            [16, 192, 5*64, 5*64],
            [16, 192, 4*64, 4*64],
            [16, 192, 5*64, 4*64]
        ],
        characters:[{
            character: YOU,
            x: 5*64
        },{
            character: DOCTOR,
            x: -64
        }],
        script: [
            [ACTION_WALK, 1, 4*64],
            [ACTION_DELAY, 300],
            [ACTION_DIRECTION, 1, 16],
            [ACTION_DELAY, 500],
            [ACTION_DIRECTION, 0, 16],
            [ACTION_DELAY, 1000],
            [ACTION_CONVO, 1, [24]],
            [ACTION_DELAY, 2500],
            [ACTION_CONVO, 1, [5, 14, 24]],
            [ACTION_DELAY, 3500],
            [ACTION_CONVO, 1, [14,14,14,14,14,14]],
            [ACTION_DELAY, 1000],
            [ACTION_CONVO, 1, [14,14,14]],
            [ACTION_DELAY, 1200],
            [ACTION_CONVO, 1, [14]],
            [ACTION_DELAY, 1800],
            [ACTION_CONVO, 1, [24]],
            [ACTION_DELAY, 2000],
            [ACTION_CONVO, 1, [19, 10, 15,20]],
            [ACTION_DELAY, 4000],
            [ACTION_DIRECTION, 1, 0],
            [ACTION_WALK, 1, 64],
            [ACTION_DELAY, 500],
            [ACTION_CONVO, 1, [7]],
            [ACTION_DELAY, 2000],
            [ACTION_WALK, 1, -64],
            [ACTION_DELAY, 5000]
        ],
        removeTv:true
    },{
        sightRadius: 390,
        speed: 7,
        aiSpeed: 2,
        wall:[0,192],
        floor:[16,256],
        p2: WORLDCHAMP,
        extras:basementExtras,
        characters:[{
            character: YOU,
            direction: 16,
            x: 5*64
        },{
            character: SPOUSE,
            x: -64
        }],
        script: [
            [ACTION_WALK,1, function(){return 3*64-32*upgrades[0]}],
            [ACTION_START, [
                [
                    1,
                    50,
                    [
                        [0,24]
                    ]
                ]
            ]]
        ]
    },{
        sightRadius: 90,
        wall:[16,256],
        floor:[0,256],
        extras:[
            [16, 96, 5*64, 7*64]
        ],
        foregroundExtras:[
            [16, 80, 5*64, 7*64],
            [0, 272, 5*64, 8*64]
        ],
        characters:[{
            character: YOU,
            x: 5*64
        },{
            character: DOCTOR,
            x:6*64
        },{
            character: SPOUSE,
            x: 2*64
        },{
            character: DAUGHTER,
            x: 2*64
        },{
            character: SON,
            x: 2*64
        }],
        script: [
            [ACTION_CONVO, 1, [14]],
            [ACTION_DELAY, 2500],
            [ACTION_CONVO, 1, [13, 24]],
            [ACTION_DELAY, 2500]
        ],
        removeTv:true
    }
]

//currentLevel = levels.length - 1;
var currentLevel = 0;




var PuzzleBoard = function(x,y, name, garbageUpgrade, speed){
    var self = this;    
    var selector  = {x:2,y:startY};
    var swaps = [];

    var name = name;

    var x = x;
    var y = y;

    var garbageUpgrade = garbageUpgrade;

    var speed = speed;

    var board = [];

    var opponent = null;

    var boardOffset = 0;

    var combos = [];

    //var comboCounter = 0;
    //var comboTotal = 0;
    //var comboMultiplier = 0;

    var garbageCounter = 0;

    for(var i=0;i<boardWidth;i++){
        board[i]=[]

        for(var j=0;j<boardHeight;j++){
            if(j>=startY){
                board[i][j] = getNewTile();
            }else{
                board[i][j] = getNewTile(VOID);
            }
        }
    }

    this.getSelector = function(){
        return selector;
    }

    this.getBoard = function(){
        return board;
    }

    this.isSelectorStationary = function(){
        var tile1 = board[selector.x][selector.y];
        var tile2 = board[selector.x+1][selector.y]; 
        if(tile1.xOffset == 0 && tile1.yOffset == 0 && tile2.xOffset==0 && tile2.yOffset == 0){
            return true;
        }
    }

    this.isSelectorExposed = function(){
        if(selector.y==0){
            return true;
        }
        var tile1 = board[selector.x][selector.y-1];
        var tile2 = board[selector.x+1][selector.y-1]; 
        if(tile1.type == VOID && tile2.type == VOID){
            return true;
        }
    }

    this.tryMove = function(direction){
        //LEFT
        if(direction == 3){
            if(selector.x>0){
                selector.x--
            }
        }
        //RIGHT
        if(direction == 1){
            if(selector.x<4){
                selector.x++
            }
        }
        //UP
        if(direction == 0){
            if(selector.y>2){
                selector.y--;
            }
        }
        //DOWN
        if(direction == 2){
            if(selector.y<13){
                selector.y++;
            }
        }
    }

    this.trySwap = function(){
        swaps.push({x:selector.x, y:selector.y});
    }

    this.getCeiling = function(){
        for(var j=0;j<boardHeight;j++){
            for(var i=0;i<boardWidth;i++){
                if(board[i][j].type != VOID && !board[i][j].locked){
                    return j;
                }
            }
        }
        return 13;
    }

    var isTileGrounded = function(i,j){
        for(var k=j+1;k<boardHeight;k++){
            if(board[i][k].type == VOID){
                return false;
            }
        }

        if(board[i][j].yOffset == 0){
            return true;
        }
    }

    this.update = function(){
        handleSwaps();

        this.checkCombos();

        garbageCollection();

        gravity();

        drawBoard();

        return crawlBoard();
    }

    var handleSwaps = function(){
        if(swaps.length){
            var s = swaps.shift();
            swap(s,{x:s.x+1,y: s.y});
        }
    }

    var swap = function(a, b){
        if(!board[a.x][a.y].deleted && !board[b.x][b.y].deleted){
            var t = board[a.x][a.y];
            board[a.x][a.y] = board[b.x][b.y];
            board[b.x][b.y] = t;

            board[a.x][a.y].xOffset += tileSize * (b.x-a.x);
            board[b.x][b.y].xOffset += tileSize * (a.x-b.x);

            board[a.x][a.y].yOffset += tileSize * (b.y-a.y);
            board[b.x][b.y].yOffset += tileSize * (a.y-b.y);
        }
    }

    this.advance = function(){
        boardOffset+=10;
    }

    var crawlBoard = function(){
        var modSpeed = speed;
        if(self.getCeiling() <= 1){
            modSpeed = speed*4
        }
        if(tickCount % modSpeed == 0){
            boardOffset++;
        }


        if(boardOffset>tileSize){
            if(selector.y>2){
                selector.y--;
            }

            boardOffset -= tileSize

            for(var i=0;i<boardWidth;i++){
                for(var j=0;j<boardHeight;j++){
                    if(j==13){
                        board[i][j]=getNewTile();
                    }else{
                        board[i][j]=board[i][j+1];
                    }
                }
            }
        }

        for(var i=0;i<boardWidth;i++){
            if(isTileGrounded(i,1) && board[i][1].type != VOID && !board[i][1].locked && getMaxMultiplier()==0){
                return true;
            }
        }
    }

    var getMaxMultiplier = function(){
        var multiplier = 0;
        for(var i=0;i<combos.length;i++){
            if(combos[i].total>0 && combos[i].multiplier>multiplier){
                multiplier = combos[i].multiplier;
            }
        }
        return multiplier;
    }

    var findComboIndex = function(comboId){
        for(var i=0;i<combos.length;i++){
            if(combos[i].id == comboId){
                return i;
            }
        }
        return null;
    }

    this.garbage = function(blocks){
        garbageCounter += blocks;
    }

    var getGarbageTile = function(){
        var g = getNewTile();
        g.type = getGarbageElement();
        g.locked = true;
        return g;
    }

    var getGarbageElement = function(){
        return elements[
            rand(
                1,
                4+opponent.getGarbageUpgrade()
            )
        ];
    }

    var garbageCollection = function(){
        if(tickCount % garbageSpeed == 0){
            var i = 0;
            var j = Math.max(0,Math.min(2, self.getCeiling()-1));
            while(garbageCounter > 0){
                if(board[i][j].type == VOID){
                    board[i][j] = getGarbageTile();
                    garbageCounter--;
                    return;
                }

                i++;
                if(i==boardWidth){
                    i=0;
                    j++;
                    if(j==boardHeight){
                        garbageCounter = 0;
                        break;
                    }
                }
            }

            if(garbageCounter==0){
                for(i=0;i<boardWidth;i++){
                    for(j=0;j<boardHeight;j++){ 
                        board[i][j].locked = false;
                    }
                } 
            }
        }
    }

    this.getGarbageUpgrade = function(){
        return garbageUpgrade;
    }

    this.setOpponent = function(oppa){
        opponent = oppa;
    }

    this.checkCombos = function(){
        var comboTiles = [];

        for(var i=combos.length-1;i>=0;i--){
            var comboFinished = true;
            for(var k=0;k<boardWidth;k++){
                for(var j=0;j<13;j++){
                    if(board[k][j].comboId == combos[i].id){
                        comboFinished = false;
                        break;
                    }
                }
                if(!comboFinished){
                    break;
                }
            }

            if(comboFinished){
                combos[i].counter += framePeriod;
                if(combos[i].counter > 2000){
                    //unleash current combos and delete
                    if(combos[i].total > 0){
                        var total = combos[i].total*combos[i].multiplier;
                        opponent.garbage(total);
                    }
                    combos.splice(i,1);
                }
            }
        }

        
        

        var tickCombos = 0;

        //VERTICAL CHECK
        for(var i=0;i<boardWidth;i++){
            var lastType = null;
            var matches = 0;

            for(var j=0;j<13;j++){      
                var type = board[i][j].type;

                if((board[i][j].deleted && !board[i][j].deletedThisTurn) ||
                type == VOID ||
                !isTileGrounded(i,j)){
                    matches = 0;
                    lastType = null;
                }else if(type==lastType){
                    matches++;
                }else{
                    lastType = type;
                    matches=1;
                }

                //type switch or end of column
                if(matches>=3 && (j==12 || type!=board[i][j+1].type)){
                    tickCombos+=matches;

                    for(var k=j;k>j-matches;k--){
                        board[i][k].deleted = true;
                        board[i][k].deletedThisTurn = true;
                        board[i][k].deletedCounter = deleteDelay;

                        comboTiles.push([i,k]);
                    }
                }
            }
        }

        //HORIZONTAL CHECK
        for(var j=0;j<13;j++){
            var lastType = null;
            var matches = 0;

            for(var i=0;i<boardWidth;i++){
                var type = board[i][j].type;
                
                if((board[i][j].deleted && !board[i][j].deletedThisTurn) ||
                type == VOID ||
                !isTileGrounded(i,j)){
                    matches = 0;
                    lastType = null;
                }else if(type==lastType){
                    matches++;
                }else{
                    lastType = type;
                    matches=1;
                }

                //type switch or end of row
                if(matches>=3 && (i==boardWidth-1 || type!=board[i+1][j].type)){
                    tickCombos+=matches;

                    for(var k=i;k>i-matches;k--){
                        board[k][j].deleted = true;
                        board[k][j].deletedThisTurn = true;
                        board[k][j].deletedCounter = deleteDelay;
                        
                        comboTiles.push([k,j]);
                    }
                }
            }
        }

        var comboId;
        if(tickCombos > 0){
            var existingCombo = null;
            for(var i=0;i<comboTiles.length;i++){
                var tile = board[comboTiles[i][0]][comboTiles[i][1]];
                if(tile.comboId){
                    existingCombo = tile.comboId;
                    break;
                }
            }

            if(existingCombo && findComboIndex(existingCombo) != null){
                comboId = existingCombo;
            }else{
                comboId = tickCount;      
            }

            for(var i=0;i<comboTiles.length;i++){
                var x = comboTiles[i][0];
                var y = comboTiles[i][1];
                var tile = board[x][y];
                if(y>0){
                    var above = board[x][y-1];
                    if(!above.deleted && above.type != VOID && isTileGrounded(x,y-1)){
                        above.comboId = comboId;
                    }
                }
            }
            

            //DO A BARREL ROLL
            if(existingCombo && findComboIndex(existingCombo) != null){
                var combo = combos[findComboIndex(existingCombo)];
                combo.multiplier++;
                combo.total+=tickCombos;
                combo.counter=0;
            }else{
                combos.push({
                    id: comboId,
                    multiplier: 1,
                    counter: 0,
                    total: tickCombos>3 ? tickCombos : 0
                });
            }
        }

        for(var j=0;j<boardHeight;j++){
            for(var i=0;i<boardWidth;i++){
                if(board[i][j].deleted){
                    board[i][j].deletedThisTurn = false;
                    board[i][j].deletedCounter -= framePeriod;
                    if(board[i][j].deletedCounter <=0){
                        board[i][j] = getNewTile(VOID);
                    }
                }
            }
        }

        //reset combo IDs on all grounded tiles
        //you only combo if in air
        for(var j=0;j<13;j++){
            for(var i=0;i<boardWidth;i++){
                if(isTileGrounded(i,j) && !board[i][j+1].deleted){
                    board[i][j].comboId = null;
                }
            }
        }

        if(tickCombos > 0){
            return true;
        }
    }

    var gravity = function(){
        for(var i=0;i<boardWidth;i++){
            for(var j=13;j>0;j--){
                var a = board[i][j];
                var b = board[i][j-1];
                if(b.xOffset == 0 && b.yOffset >= 0 && a.type==VOID && b.type!=VOID
                && !a.locked && !b.locked){
                    swap({x:i,y:j},{x:i,y:j-1});
                }
            }
        }
    }

    var drawBoard = function(){
        if(level.corporate){
            ctx.fillStyle = 'grey';
        }else{
            if(name == 0){
                ctx.fillStyle = getLinearGradient('#008899', '#aaffdd');
            }else{
                ctx.fillStyle = getLinearGradient('#ccff44', '#33cc00');
            }
        }
        ctx.fillRect(x-4,y,200, 384);

        ctx.save();
        ctx.beginPath();
        ctx.rect(x,y,192, 384);
        ctx.clip();

        for(var i=0;i<boardWidth;i++){
            for(var j=0;j<boardHeight;j++){
                var tile = board[i][j];
                tile.xOffset *= .2;
                if(Math.abs(tile.xOffset)<1){
                    tile.xOffset = 0;
                }

                
                if(tile.yOffset < 0){
                    tile.yv += 15;
                    tile.yOffset += tile.yv*.03;
                }
                if(tile.yOffset > 0){
                    tile.yOffset = 0;

                    if(isTileGrounded(i,j)){
                        tile.yv = 0;
                    }
                }

                var type = tile.type;
                if(type != VOID){
                    if(level.corporate){
                        ctx.fillStyle = '#'+type.grey;
                        ctx.beginPath();
                        ctx.fillRect(
                            tileSize*i+x+tile.xOffset,
                            tileSize*(j-1)+y+tile.yOffset - boardOffset,
                            tileSize,
                            tileSize
                        );
                        ctx.strokeStyle = COLOR_BLACK;
                        ctx.lineWidth = 2;
                        ctx.strokeRect(
                            tileSize*i+x+tile.xOffset,
                            tileSize*(j-1)+y+tile.yOffset - boardOffset,
                            tileSize,
                            tileSize
                        );
                    }else{
                        ctx.drawImage(
                            color,
                            type.ssx,
                            type.ssy,
                            16,
                            16,
                            tileSize*i+x+tile.xOffset,
                            tileSize*(j-1)+y+tile.yOffset - boardOffset,
                            32,
                            32
                        );
                    }

                    if(tile.deleted){
                        ctx.fillStyle = 'rgba(0,0,0,'+(1-tile.deletedCounter/deleteDelay)+')';
                        ctx.fillRect(
                            tileSize*i+x+tile.xOffset,
                            tileSize*(j-1)+y+tile.yOffset - boardOffset,
                            tileSize,
                            tileSize
                        );
                    }
                    
                }
            }
        }

        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255,255,255,.95)';
        ctx.strokeRect(
            tileSize*selector.x+x+1,
            tileSize*(selector.y-1)+y+1 - boardOffset,
            64,
            tileSize
        );

        ctx.restore();
        ctx.beginPath();

        
        var maxMultiplier = getMaxMultiplier();
        if(maxMultiplier>0){
            ctx.textAlign = "center";
            ctx.fillStyle = COLOR_WHITE;
            ctx.font = "24px "+HELVETICA;
            if(name == 0){
                ctx.fillText(maxMultiplier+'x', x+227, y+50);
            }else{
                ctx.fillText(maxMultiplier+'x', x-35, y+50);
            }
        }
    }
}





var VOID = {};
var EARTH = {
    color: '776655',
    ssx: 0,
    ssy: 0,
    grey: '111'
};
var WATER = {
    color: '0088ee',
    ssx: 16,
    ssy: 0,
    grey: '666'
};
var AIR = {
    ssx: 32,
    ssy: 0,
    grey: 'fff'
};
var FIRE = {
    color: 'ff4400',
    ssx: 48,
    ssy: 0,
    grey: 'aaa'
};
var FISH = {
    color: 'ff9c00',
    ssx: 0,
    ssy: 16,
    grey: '2244aa'
}
var BIRD = {
    color: '55ff00',
    ssx: 16,
    ssy: 16,
    grey: '55aa00'
}
var WORM = {
    color: 'dd55ee',
    ssx: 32,
    ssy: 16,
    grey: 'dd55aa'
}

var elements = [
    VOID,
    AIR,
    EARTH,
    WATER,
    FIRE,
    FISH,
    BIRD,
    WORM
];




var emoticons = new Image();
emoticons.src = "e.png";

var main = new Image();
main.src = "m.png";

var color = new Image();
color.src = "c.png";


window['s'] = function(){
    characters[0].name = value('#n');
    playerGender = value('.g:checked');
    spouseGender = value('.p:checked');
    menuState++;
    document.querySelector('#b').style.display = 'none';
}

var value = function(q){
    return document.querySelector(q).value;
}

var ctx
var convos = [];
var tvBackground, wallGradient, floorGradient;

var ac;

window.onload = function(){
    ac = new AudioContext();

    ctx = document.querySelector('#c').getContext('2d');
    ctx['imageSmoothingEnabled'] = false;
    ctx['mozImageSmoothingEnabled'] = false;

    tvBackground = ctx.createLinearGradient(
        208,
        32,
        752,
        464
    );
    tvBackground.addColorStop(0, '#666');
    tvBackground.addColorStop(.3, COLOR_BLACK);

    wallGradient = getLinearGradient('rgba(5,0,15,0)','rgba(5,0,15,.85)', 248, 448);
    floorGradient = getLinearGradient('rgba(5,0,15,.85)','rgba(5,0,15,0)', 448, 544);

    




    document.addEventListener('keydown', function(e){
        var w = e.which;

        if(menuState==0){
            menuState++
        }

        if(menuState == 2){
            menuState++;
            document.querySelector('#d').style.display = 'none';
        }

        if(menuState == 3){
            //E
            if(w==69){
                playerBoard.advance();
            }

            //LEFT
            if(w==37 || w==65){
                playerBoard.tryMove(3);
                if(!level.gameOn) truckV -=2;

                moveUpgradeSelectorLeft();
            }
            //RIGHT
            if(w==39 || w==68){
                playerBoard.tryMove(1);
                if(!level.gameOn) truckV +=2;
                
                moveUpgradeSelectorRight();
            }
            //UP
            if(w==38 || w==87){
                playerBoard.tryMove(0);
            }
            //DOWN
            if(w==40 || w==83){
                playerBoard.tryMove(2);
            }
            //SPACE
            if(w==32){
                playerBoard.trySwap();
                if(level.gameOn && gameState == 6){
                    selectUpgrade();
                }
            }

            e.preventDefault();
        }
    });

    startLevel();
    startGame();

    setInterval(tick,framePeriod);
}

var selectUpgrade = function(){
    if(upgrades[upgradeSelector]<3){
        upgrades[upgradeSelector]++;
        currentLevel++;
        startLevel();
    }
}

var moveUpgradeSelectorLeft = function(){
    for(var i=0;i<3;i++){
        upgradeSelector--;
        if(upgradeSelector < 0){
            upgradeSelector = 2;
        }
        if(upgrades[upgradeSelector]<3){
            //found it
            break;
        }
    }
}

var moveUpgradeSelectorRight = function(){
    for(var i=0;i<3;i++){
        upgradeSelector++;
        if(upgradeSelector > 2){
            upgradeSelector = 0;
        }
        if(upgrades[upgradeSelector]<3){
            //found it
            break;
        }
    }
}

var findElement = function(type){
    for(var i=0;i<elements.length;i++){
        if(elements[i] == type){
            return i;
        }
    }
}

var level;
var levelState;

var startLevel = function(){
    //get level and initialize
    level = clone(levels[currentLevel]);
    levelState = {
        action: -1,
        counter: 1000+(400*(currentLevel+2)),
        gameOn: false
    }
    if(currentLevel ==11)
        levelState.counter += 4000;
    convos = [];

    //last level script is dynamic
    if(currentLevel == levels.length-1){
        if(upgrades[0] < 3){
             level.script = level.script.concat([
                [ACTION_WALK,2, 4*64+16],
                [ACTION_DELAY, 2000],
                [ACTION_CONVO, 2, [8]],
                [ACTION_DELAY, 2000],
                [ACTION_CONVO, 2, [10,7]],
                [ACTION_DELAY, 3500],
                [ACTION_CONVO, 2, [3]],
                [ACTION_DELAY, 1500],
                [ACTION_CONVO, 2, [21,0]],
                [ACTION_DELAY, 2000],
                [ACTION_CONVO, 2, [13,21,23,2]],
                [ACTION_DELAY, 6500]
            ]);

            if(upgrades[0] == 0){
                level.script = level.script.concat([
                    [ACTION_CONVO, 3, [7], 2]
                ]);
            }else{
                level.script = level.script.concat([
                    [ACTION_DELAY, 1500],
                    [ACTION_CONVO, 2, [22, 15, 10]]
                ]);
            }

            if(upgrades[0] < 2){
                level.script = level.script.concat([
                    [ACTION_DELAY, 1500],
                    [ACTION_CONVO, 4, [8,7,8,7, 7, 8], 2]
                ]);
            }else{
                level.script = level.script.concat([
                    [ACTION_DELAY, 1500],
                    [ACTION_CONVO, 2, [22, 20, 10]]
                ]);
            }


            level.script = level.script.concat([
                [ACTION_DELAY, 1500],
                [ACTION_CONVO, 2, [8,8,8]],
                [ACTION_DELAY, 1000],
                [ACTION_CONVO, 2, [9]],
                [ACTION_DELAY, 5000],
                [ACTION_END],
                [ACTION_DELAY, 4000],
                [ACTION_CONVO, 2, [10,10,10,10]]
            ]);



            if(upgrades[0] == 0){
                level.script = level.script.concat([
                    [ACTION_DELAY, 300],
                    [ACTION_CONVO, 3, [10,10,10,10], 2]
                ]);
            }

            if(upgrades[0] < 2){
                level.script = level.script.concat([
                    [ACTION_DELAY, 300],
                    [ACTION_CONVO, 4, [10,10,10,10], 2]
                ]);
            }
        }else{
             level.script = level.script.concat([
                [ACTION_CONVO, 1, [18, 19, 25]],
                [ACTION_DELAY, 2000],
                [ACTION_CONVO, 1, [18, 10, 25]],
                [ACTION_DELAY, 1500],
                [ACTION_CONVO, 1, [18, 20, 15, 22, 25]],
                [ACTION_DELAY, 8000],
                [ACTION_CONVO, 1, [21, 26,26,26,25]],
                [ACTION_DELAY, 5000],
                [ACTION_CONVO, 1, [8]],
                [ACTION_DELAY, 1000],
                [ACTION_END]
            ]);
        }

        level.script = level.script.concat([
            [ACTION_DELAY, 6000],
            [ACTION_CONVO, 1, [14,24,25]],
            [ACTION_DELAY,6000]
        ]);
    }
}

var tickCount;
var gameStateCounter;
var gameState;

var startGame = function(){
    tickCount = 0;
    //0 console logo
    //1 game logo
    //2 versus
    //3 playing
    //4 victory screen
    gameState = 0;
    gameStateCounter = 1500;

    //get from level
    var playerSpeed = level.speed;
    var enemySpeed = Math.ceil(playerSpeed * (10 - upgrades[2])/10);

    while(true){
        playerBoard = new PuzzleBoard(playerX, playerY, 0, upgrades[1], playerSpeed);
        if(!playerBoard.checkCombos()){
            break;
        }
    }
    
    var enemyGarbage = Math.floor(currentLevel/3);
    while(true){
        enemyBoard = new PuzzleBoard (544, playerY, 1, enemyGarbage, enemySpeed);
        if(!enemyBoard.checkCombos()){
            break;
        }
    }

    playerBoard.setOpponent(enemyBoard)
    enemyBoard.setOpponent(playerBoard);
}

var getRandomElement = function(){
    return elements[rand(1,4)];
}

var rand = function(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

//http://stackoverflow.com/a/122190/199042
var clone = function(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            temp[key] = clone(obj[key]);
        }
    }
    return temp;
}

var menuState = 0;
var menuCounter = 2500;

//0 enter state
//1 main menu
//2 how to
//3 game
//4 credits

var tick = function(){
    tickCount++;

    menuCounter-=framePeriod;

    if(menuState == 0){
        ctx.fillStyle = COLOR_WHITE;
        ctx.fillRect(0,0,960,544);
        var focus = Math.max(.15, menuCounter/3000);
        for(var i=0;i<100;i++){
            ctx.font = "92px"+HELVETICA;
            ctx.fillStyle = 'rgba(0,0,0,.1)';
            ctx.fillText('par\u00B7tic\u00B7u\u00B7lar\u00B7ism', 200+rand(-30,30)*focus,250+rand(-30,30)*focus);
            ctx.font = "27px"+HELVETICA;
            ctx.fillStyle = 'rgba(0,0,0,'+Math.min(.1,(-menuCounter/20000))+')';
            ctx.fillText('exclusive or special devotion to a particular interest', 200+rand(-8,8)*focus,300+rand(-8,8)*focus) 

            /*
            ctx.fillStyle = 'rgba(100,100,100,'+Math.min(.1,-(menuCounter+1500)/10000)+')';
            ctx.fillText('do you have what it takes to become              ?', 200+rand(-8,8)*focus, 520+rand(-8,8)*focus)
            ctx.fillStyle = 'rgba(210,0,0,'+Math.min(.1,-(menuCounter+3000)/10000)+')';
            ctx.fillText('the best', 645+rand(-8,8)*focus, 520+rand(-8,8)*focus) */
        }
    }else if(menuState ==1){
        document.querySelector('#b').style.display = 'block';
        ctx.fillStyle = COLOR_BLACK;
        ctx.fillRect(0, 0, 960,544);
    }else if(menuState ==2){
        document.querySelector('#d').style.display = 'block';
        ctx.fillStyle = COLOR_BLACK;
        ctx.fillRect(0, 0, 960,544);
    }else if(menuState ==3){
        if(levelState.action >= level.script.length){
            currentLevel++;
            if(currentLevel >= levels.length){
                menuState++;
                menuCounter = 3000;
            }else{
                startLevel();
            }
        }else{
            if(levelState.action >=0){
                var action = level.script[levelState.action];
                if(action[0] == ACTION_DELAY){
                    if(levelState.counter<=0){
                        levelState.counter = action[1];
                    }
                }else if(action[0] == ACTION_WALK){
                    var walkX = action[2];
                    if(typeof(action[2]) == "function"){
                        walkX = action[2]();
                    }
                    var chr = level.characters[action[1]];
                    if(chr.x < walkX){
                        chr.x+=4;
                        levelState.counter = 1000;
                    }else if(chr.x > walkX){
                        chr.x-=4;
                        levelState.counter = 1000;
                    }else{
                        levelState.counter = 0;
                    }
                }else if(action[0]==ACTION_CONVO){
                    var chr = level.characters[action[1]];

                    var x = chr.x;
                    //group conversation horizontally with another character, if specified
                    if(action.length==4){
                        x = level.characters[action[3]].x;
                    }

                    convos.push({
                        timer: 3500,
                        currentCharacter: 0,
                        convo: action[2],
                        x: x+16,
                        characterId: level.characters[action[1]].character
                    });
                }else if(action[0]==ACTION_EXTRA){
                    level.extras.push(action[1]);
                }else if(action[0]==ACTION_START){
                    if(!level.gameOn){
                        level.gameOn = true;
                        startGame();
                    }
                    levelState.counter = 1000;

                    //convos
                    if(action.length>1){
                        for(var i=0;i<action[1].length;i++){
                            var x = level.characters[action[1][0][0]].x;
                            if(convos.length==0 || (convos.length < 4 && rand(1,action[1][i][1])==1)){
                                var convo = [];
                                var num = rand(0,action[1][i][2].length-1);
                                for( var j = 0; j<rand(1,8); j++){
                                    convo.push(rand(
                                        action[1][i][2][num][0],
                                        action[1][i][2][num][1]
                                    ));
                                }
                                var chr = level.characters[action[1][i][0]];
                                convos.push({
                                    timer: 5000,
                                    currentCharacter: 0,
                                    convo: convo,
                                    x: x+16,
                                    characterId: chr.character
                                });
                            }
                        }
                    }
                }else if(action[0]==ACTION_DIRECTION){
                    level.characters[action[1]].direction = action[2];
                }else if(action[0]==ACTION_END){
                    levelState.counter = 100000;
                    level.sightRadius*=.99
                    if(level.sightRadius > 1){
                        level.sightRadius *= .99;
                    }else{
                        level.sightRadius -= .1;
                    }

                    if(level.sightRadius<=0){
                        level.sightRadius = 0;
                        levelState.counter = 0;
                    }
                }
            }
        }

        levelState.counter-= framePeriod;

        if(levelState.counter<=0){
            levelState.action++;
        }



        ctx.save();
        ctx.beginPath();

        var heartbeat = 0

        var sightRadius = level.sightRadius;
        if(level.sightRadius <=100 && (!level.script[levelState.action] || level.script[levelState.action][0] != ACTION_END)){
            level.sightRadius *= .9985;
            heartbeat = Math.cos(tickCount/10);
        }

        ctx.fillStyle = COLOR_BLACK;
        ctx.fillRect(0, 0, 960,544);

        ctx.arc(
            5*64+26,
            7*64+17.5,
            heartbeat*level.sightRadius*.05+level.sightRadius,
            0,
            2*Math.PI
        );
        ctx.clip();


        for (var i = 0; i< 15;i++){
            for(var j=0;j<7;j++){
                drawMain(level.wall[0], level.wall[1], i*64, j*64);
            }
            for(var j=7;j<9;j++){
                drawMain(level.floor[0], level.floor[1], i*64, j*64);
            }
        }



        ctx.fillStyle = wallGradient;
        ctx.fillRect(0, 248, 960,200);
        ctx.fillStyle = floorGradient;
        ctx.fillRect(0, 448, 960,96);


        //TV, IF NECESSARY

        if(!level.removeTv){
            ctx.fillStyle = level.corporate ? '#e8dbb7':tvBackground;
            ctx.fillRect(208, 32, 544, 432);
        }

        ctx.save();
        ctx.beginPath();
        ctx.rect(playerX,playerY, 512, 384);
        ctx.clip();

        if(!level.removeTv){
            ctx.fillStyle = "#101610";
            ctx.fillRect(playerX,playerY, 512, 384);
        }

        

        if(level.gameOn){
            gameStateCounter-=framePeriod;
            if(gameStateCounter<=3){
                gameState++;
                gameStateCounter = 1500;
            }

            if(gameState == 0){
                //CONSOLE LOGO

                if(level.corporate){
                    ctx.fillStyle = COLOR_BLACK;
                    ctx.fillRect(playerX,playerY, 512, 384);

                    ctx.fillStyle = COLOR_WHITE;
                    ctx.font = "20px 'Courier New'";
                    ctx.fillText("> KARABSOFT 2000", 264, 88);
                }else{ 
                    ctx.fillStyle = 'hsl(0,0%, '+(1500-gameStateCounter)/3+'%)';
                    ctx.fillRect(playerX,playerY, 512, 384);

                    ctx.fillStyle = 'rgba(34,221,0,'+(1000-gameStateCounter)/300+')';
                    ctx.fillRect(354, 198, 260,75);
                    ctx.fillStyle = 'hsl(0,0%, '+(1500-gameStateCounter)/3+'%)';
                    ctx.fillRect(364, 208, 240,55);
                    ctx.fillStyle = 'rgba(34,221,0,'+(1000-gameStateCounter)/300+')';
                    ctx.font = "50px Verdana, sans-serif";
                    ctx.fillText("Karabodo", 364, 253);
                }
            }else if(gameState ==1){
                //TITLE
                if(level.corporate){
                    ctx.fillStyle = COLOR_WHITE;
                    ctx.fillRect(playerX,playerY, 512, 384);

                    ctx.fillStyle = '#222';
                    ctx.font = "40px Verdana";
                    ctx.fillText("Partic Office", playerX+140, playerY+140);ctx.fillStyle = '#222';
                    ctx.font = "20px Verdana";
                    ctx.fillText("ENTEPRISE EDITION", playerX+140, playerY+180);
                }else{ 
                    ctx.fillStyle = getLinearGradient("#332244", "#000", playerY,playerY+384);
                    ctx.fillRect(playerX,playerY, 512, 384);

                    ctx.fillStyle = COLOR_WHITE;
                    ctx.font = "36px"+HELVETICA;
                    ctx.fillText("SUPER", playerX+135+60, playerY+95);

                    ctx.textAlign = "center";
                    ctx.font = "40px Georgia, sans-serif";
                    var gameTitle = "PARTIC";
                    for(var i=0;i<gameTitle.length;i++){
                        ctx.fillStyle = '#'+elements[i+2].color;
                        ctx.fillRect(playerX+120+50*i-15, playerY+140-40, 50,50);
                        ctx.fillStyle = COLOR_WHITE;
                        ctx.fillText(gameTitle[i], playerX+120+50*i+10, playerY+140);
                    }
                    /*
                    ctx.fillStyle = COLOR_WHITE;
                    ctx.font = "18px"+HELVETICA;
                    ctx.fillText('Press Start', playerX+240, playerY+300);
                    */
                }
            }else if(gameState ==2){
                if(level.corporate){
                    /*
                    ctx.fillStyle = '#2299ff';
                    ctx.fillRect(playerX,playerY, 512, 384);

                    ctx.font = "20px"+HELVETICA;  
                    ctx.fillStyle = COLOR_WHITE;

                    ctx.fillText(getName(0), playerX+150, playerY+180);
                    ctx.font = "30px"+HELVETICA;  
                    ctx.fillText('User:', playerX+150, playerY+130);*/
                    gameState++;
                }else{
                    ctx.fillStyle = COLOR_WHITE;
                    ctx.textAlign = "center";
                    ctx.font = "40px Georgia, sans-serif";
                    ctx.fillText(getName(0), playerX+250+Math.max(0,gameStateCounter-1100), playerY+150);
                    ctx.fillText(getName(level.p2), playerX+250-Math.max(0,gameStateCounter-1100), playerY+260);
                    ctx.font = "24px"+HELVETICA;  
                    ctx.fillStyle = 'hsl(0,0%, '+Math.min(100,(1500-gameStateCounter)/4)+'%)';
                    ctx.fillText('VERSUS', playerX+250, playerY+200);
                }
            }else if(gameState==3){
                //only happens once
                if(!level.corporate)
                    startPlayingMuzak(currentLevel*13 + 40);

                playerLost = playerBoard.update();

                
                if(tickCount % level.aiSpeed == 0){
                    //5, 4, of 3 OF A KIND, IF POSSIBLE
                    var fiveOfType = null;
                    var fiveOfRow = null;
                    var elementCounts = {};fiveOfRow
                    var board = enemyBoard.getBoard();

                    for(var h=5;h>=3;h--){
                        for(var i=1;i<elements.length;i++){
                            elementCounts[i] = 0;
                        }
                        for(var j=12;j>=7;j--){
                            var rowCounts = {};
                            for(var k=1;k<elements.length;k++){
                                rowCounts[k] = 0;
                            }

                            for(var i=0;i<boardWidth;i++){
                                var type = board[i][j].type;
                                if(type != VOID && !board[i][j].deleted){
                                    rowCounts[findElement(type)]++;
                                }
                            }

                            for(var k=1;k<elements.length;k++){
                                if(rowCounts[k]>0){
                                    elementCounts[k]++;
                                }else{
                                    elementCounts[k] = 0;
                                }
                                if(elementCounts[k]>=h){
                                    fiveOfType = elements[k];
                                    fiveOfRow = j;
                                    break;
                                }
                            }

                            if(fiveOfType){
                                break;
                            }
                        }
                        if(fiveOfType){
                            break;
                        }
                    }
                    var moved = false;

                    var x = enemyBoard.getSelector().x;
                    var y = enemyBoard.getSelector().y;


                    //todo: get rid of towers, hugely problematic

                    

                    //swap if you can drop blocks
                    /*if(y<boardHeight-1 &&
                    ((board[x][y].type == VOID && board[x][y+1].type == VOID && board[x+1][y].type != VOID && board[x+1][y].xOffset == 0) ||
                    (board[x+1][y].type == VOID && board[x+1][y+1].type == VOID && board[x][y].type != VOID && board[x][y].xOffset == 0))){
                        enemyBoard.trySwap();
                    }else */

                    //like lugnuts, avoid going in sequential order
                    var tileOrder = [];
                    tileOrder[3] = [2,1,0];
                    tileOrder[4] = [3,2,0,1];
                    tileOrder[5] = [4,3,0,1,2];

                    var c = enemyBoard.getCeiling()
                    if(enemyBoard.getSelector().y < c){
                        enemyBoard.tryMove(2);
                    }else if(board[4][c].type == VOID &&
                    board[5][c].type != VOID &&
                    board[5][c].xOffset == 0 &&
                    board[4][c+1].type == VOID){
                        if(enemyBoard.getSelector().y > c){
                            enemyBoard.tryMove(0);
                        }else if(enemyBoard.getSelector().x < 4){
                            enemyBoard.tryMove(1);
                        }else{
                            enemyBoard.trySwap();
                        }
                    }else if(fiveOfType){
                        for(var k=0;k<h;k++){
                            var j = tileOrder[h][k]+fiveOfRow;
                            for(var i=0;i<boardWidth;i++){
                                var type = board[i][j].type;

                                if(i==0 && fiveOfType == type){
                                    //we're done with this row;
                                    break;
                                }else{
                                    if(fiveOfType == type){
                                        //OK... HERE!
                                        if(y < j){
                                            enemyBoard.tryMove(2);
                                        }else if(y > j){
                                            enemyBoard.tryMove(0);
                                        }else if(x+1 > i){
                                            enemyBoard.tryMove(3);
                                        }else if(x+1 < i){
                                            enemyBoard.tryMove(1);
                                        }else{
                                            enemyBoard.trySwap();
                                        }
                                        moved = true;
                                        break;
                                    }
                                }
                            }
                            if(moved){
                                break;
                            }
                        }
                    }else{
                        //do random shit
                        if(enemyBoard.isSelectorExposed() && enemyBoard.getSelector().y == enemyBoard.getCeiling()){
                            enemyBoard.tryMove(rand(1,3));
                        }else{
                            enemyBoard.tryMove(rand(0,3));
                        }
                        if(enemyBoard.isSelectorStationary()){
                            enemyBoard.trySwap();
                        }
                    }

                    //let enemy advance itself
                    if(enemyBoard.getCeiling() > 5 + level.aiSpeed){
                        enemyBoard.advance();
                    }
                }

                enemyLost = enemyBoard.update();


                if(playerLost || enemyLost){
                    gameState++;
                    stopPlayingMuzak();
                    gameStateCounter = 3000;
                }else{
                    gameStateCounter = 100000;
                }
            }else if(gameState==4){
                ctx.textAlign = "center";
                ctx.fillStyle = COLOR_WHITE;
                ctx.fillRect(playerX,playerY, 512, 384);

                ctx.font = "24px Georgia, sans-serif";
                ctx.fillStyle = COLOR_BLACK
                var winText = 'Job '+ (playerLost?'Failed':'Completed');
                if(!level.corporate)
                    winText = getName(playerLost?level.p2:0) +' wins!'
                ctx.fillText(winText, playerX+250, playerY+200);
            }else if(gameState == 5){
                convos = [];
                if(playerLost){
                    startLevel();
                }else{
                    //UPGRADE SCREEN
                    gameState++;
                    upgradeSelector = 0;
                    //handle empty upgrades
                    moveUpgradeSelectorLeft();
                    moveUpgradeSelectorRight();
                }
            }
        }
        
        ctx.restore();

        //draw characters


        if(level.extras){
            for(var i=0;i<level.extras.length;i++){
                var extra = level.extras[i];
                drawMain(extra[0], extra[1], extra[2], extra[3]);
            }
        }

        for(var i=0;i<level.characters.length;i++){
            var character = level.characters[i];

            var ssx = character.direction | 0;
            var ssy = characters[character.character].ssy;
            if(character.young)
                ssy += 128;
            if((character.character == YOU && playerGender == 1) ||
            (character.character == SPOUSE && spouseGender ==1))
                ssy += 16;

            drawMain(ssx, ssy, character.x, 448);
        }

        if(level.foregroundExtras){
            for(var i=0;i<level.foregroundExtras.length;i++){
                var extra = level.foregroundExtras[i];
                drawMain(extra[0], extra[1], extra[2], extra[3]);
            }
        }

    //TRUCK
        truckX += truckV;
        if(truckX>=896){
            truckX = 896;
            truckV = -2;
        }
        if(truckX<=0){
            truckX = 0;
            truckV = 2;
        }
        if(currentLevel == 0) drawMain(16, 240,truckX,7*64+16);


        ctx.restore();

        //CONVOS
        var deleteOldest = false;
        for(var i=0;i<convos.length;i++){
            drawConvo(convos[i], i);
            convos[i].timer-=framePeriod;
            if(convos[i].timer <= 0){
                deleteOldest = true;
            }
        }
        if(deleteOldest){
            convos.shift();
        }

        if(levelState.action==-1){
            ctx.fillStyle = 'rgba(0,0,0,'+(levelState.counter/(400*(currentLevel+2)))+')';
            ctx.fillRect(0,0,960,544);
        }

        if(level.gameOn && gameState == 6){
            if(currentLevel<2 || currentLevel >8){
                currentLevel++;
                startLevel();
            }else{
                gameStateCounter = 100000;
                ctx.fillStyle = getLinearGradient('rgba(51,34,68,.9)', 'rgba(0,0,0,.9)');
                ctx.fillRect(0,0,960,544);
                ctx.fillStyle = COLOR_WHITE;
                ctx.font = "70px"+HELVETICA;
                ctx.fillText('Select upgrade', 200,150);

                ctx.font = "20px"+HELVETICA;

                for(var i=0;i<3;i++){
                    if(upgrades[i]<3){
                        var u = upgradeOptions[i];
                        ctx.fillText(u.name+' ('+(upgrades[i]+1)+'/3)', 150+250*i,250);
                        if(Math.floor((tickCount*.05)) % 2 == 0){
                            ctx.drawImage(color, u.ss()[0], u.ss()[1], 16, 16,  190+250*i, 260, 64, 64);
                        }else{
                            ctx.drawImage(color, u.ss()[2], u.ss()[3], 16, 16,  190+250*i, 260, 64, 64);
                        }
                    }
                }

                ctx.beginPath();
                ctx.moveTo(220+250*upgradeSelector, 335);
                ctx.lineTo(235+250*upgradeSelector, 350);
                ctx.lineTo(205+250*upgradeSelector, 350);
                ctx.closePath();
                ctx.fill();
            }
        }
    }else if(menuState == 4){
        ctx.fillStyle = COLOR_BLACK;
        ctx.fillRect(0,0,960,544);
        ctx.fillStyle = 'rgba(255,255,255,'+((3000-menuCounter)/3000)+')';
        ctx.font = "70px"+HELVETICA;
        ctx.fillText('par\u00B7tic\u00B7u\u00B7lar\u00B7ism', 220,150);
        ctx.font = "24px"+HELVETICA;
        ctx.fillText('A game by Jeremiah Reid', 250,200);
    }
}

var drawMain = function(ssx, ssy, x, y){
    ctx.drawImage(main, ssx, ssy, 16, 16, x, y, 64,64);
}

var getLinearGradient = function(color1, color2, y1, y2){
    if(y1==undefined){
        y1 = 0;
        y2 = 544;
    }
    var backgroundGrad = ctx.createLinearGradient(0, y1, 0, y2);
    backgroundGrad.addColorStop(0, color1);
    backgroundGrad.addColorStop(1, color2);
    return backgroundGrad;
}

var drawConvo = function(convoObject, index){
    var convo = convoObject.convo;

    if(tickCount % 3 == 0 && convoObject.currentCharacter < convo.length){
        convoObject.currentCharacter++;
    }

    var borderRadius = 20;
    var w = Math.max(110,16*convo.length+20);
    var h = 64;

    var x = convoObject.x;
    var y = playerY + 320 - index * h;

    ctx.beginPath();
    ctx.moveTo(x+borderRadius, y);
    ctx.arcTo(x+w, y,   x+w, y+h, borderRadius);
    ctx.arcTo(x+w, y+h, x,   y+h, borderRadius);

    ctx.arcTo(x,   y+h, x,   y+h+1,   borderRadius);
    
    ctx.arcTo(x,   y,   x+w, y,   borderRadius);
    ctx.closePath();
    ctx.fillStyle = COLOR_WHITE;
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = COLOR_BLACK;
    ctx.stroke();

    ctx.fillStyle = COLOR_BLACK
    ctx.font = "16px"+HELVETICA;
    ctx.fillText(getName(convoObject.characterId), x+10,y+20);

    for( var i = 0; i<convoObject.currentCharacter; i++){
        ctx.drawImage(emoticons, 16*(convo[i]% 3), 16*Math.floor(convo[i]/3), 16, 16, x+10+16*i, y+30, 16, 16);
    }
}

var getNewTile = function(type){
    return {
        type: type ? type : getRandomElement(),
        xOffset: 0,
        yOffset: 0,
        yv: 0,
        deleted: false,
        deletedThisTurn: false,
        locked: false,
        comboId: null
    }
}







/* MUZAK */
/* Kevin Ennis is a god */

//https://gist.github.com/kevincennis/0a5bcd12625a02e48970

var enharmonics = 'B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb',
  middleC = 440 * Math.pow( Math.pow( 2, 1 / 12 ), -9 ),
  octaveOffset = 4,
  offsets = {};

// populate the offset lookup (note distance from C, in semitones)
enharmonics.split('|').forEach(function( val, i ) {
  val.split('-').forEach(function( note ) {
    offsets[ note ] = i;
  });
});

/*
 * Note class
 */

// new Note ('A4 q') === 440Hz, quarter note
// new Note ('- e') === 0Hz (basically a rest), eigth note
// new Note ('A4 es') === 440Hz, dotted eighth note (eighth + sixteenth)
// new Note ('A4 0.0125') === 440Hz, 32nd note (or any arbitrary 
// divisor/multiple of 1 beat)
var Note = function( str ) {
  var couple = str.split(/\s+/);
  // frequency, in Hz
  this.frequency = Note.getFrequency( couple[ 0 ] ) || 0;
  // duration, as a ratio of 1 beat (quarter note = 1, half note = 0.5, etc.)
  this.duration = Note.getDuration( couple[ 1 ] ) || 0;
}

// convert a note name (e.g. 'A4') to a frequency (e.g. 440.00)
Note.getFrequency = function( name ) {
  var couple = name.split(/(\d+)/),
    distance = offsets[ couple[ 0 ] ],
    octaveDiff = ( couple[ 1 ] || octaveOffset ) - octaveOffset,
    freq = middleC * Math.pow( Math.pow( 2, 1 / 12 ), distance );
  return freq * Math.pow( 2, octaveDiff );
};

// convert a duration string (e.g. 'q') to a number (e.g. 1)
// also accepts numeric strings (e.g '0.125')
Note.getDuration = function( symbol ) {
  return symbol/4;
};


/*
 * Sequence class
 */

var Sequence = function(tempo, arr ) {
  this.ac = ac;
  this.createFxNodes();
  this.tempo = tempo;
  this.smoothing = 0;
  this.notes = [];
  this.push.apply( this, arr || [] );
}

// create gain and EQ nodes, then connect 'em
Sequence.prototype.createFxNodes = function() {
  var eq = [ [ 'bass', 100 ], [ 'mid', 1000 ] , [ 'treble', 2500 ] ],
    prev = this.gain = this.ac['createGain']();

    //volume control, hardcoded right now to not be so damn loud
    prev['gain'].value = .05;

  eq.forEach(function( config, filter ) {
    filter = this[ config[ 0 ] ] = this.ac['createBiquadFilter']();
    filter.type = 'peaking';
    filter['frequency'].value = config[ 1 ];
    prev['connect']( prev = filter );
  }.bind( this ));
  prev['connect']( this.ac['destination']);
  return this;
};

// accepts Note instances or strings (e.g. 'A4 e')
Sequence.prototype.push = function() {
  Array.prototype.forEach.call( arguments, function( note ) {
    this.notes.push( note instanceof Note ? note : new Note( note ) );
  }.bind( this ));
  return this;
};

// recreate the oscillator node (happens on every play)
Sequence.prototype.createOscillator = function() {
  this.stop();
  this.osc = this.ac['createOscillator']();
  this.osc.type = 'square';
  this.osc['connect']( this.gain);
  return this;
};

// schedules this.notes[ index ] to play at the given time
// returns an AudioContext timestamp of when the note will *end*
Sequence.prototype.scheduleNote = function( index, when ) {
  var duration = 60 / this.tempo * this.notes[ index ].duration,
    cutoff = duration * this.inverseStaccato;

  this.setFrequency( this.notes[ index ].frequency, when );

  if ( this.smoothing && this.notes[ index ].frequency ) {
    this.slide( index, when, cutoff );
  }

  this.setFrequency( 0, when + cutoff );
  return when + duration;
};

// get the next note
Sequence.prototype.getNextNote = function( index ) {
  return this.notes[ index < this.notes.length - 1 ? index + 1 : 0 ];
};

// how long do we wait before beginning the slide? (in seconds)
Sequence.prototype.getSlideStartDelay = function( duration ) {
  return duration - Math.min( duration, 60 / this.tempo * this.smoothing );
};

// slide the note at <index> into the next note at the given time,
// and apply staccato effect if needed
Sequence.prototype.slide = function( index, when, cutoff ) {
  var next = this.getNextNote( index ),
    start = this.getSlideStartDelay( cutoff );
  this.setFrequency( this.notes[ index ].frequency, when + start );
  this.rampFrequency( next.frequency, when + cutoff );
  return this;
};

// set frequency at time
Sequence.prototype.setFrequency = function( freq, when ) {
  this.osc['frequency']['setValueAtTime']( freq, when );
  return this;
};

// ramp to frequency at time
Sequence.prototype.rampFrequency = function( freq, when ) {
  this.osc['frequency']['linearRampToValueAtTime']( freq, when );
  return this;
};

// run through all notes in the sequence and schedule them
Sequence.prototype.play = function( when ) {
  when = typeof when === 'number' ? when : this.ac['currentTime'];

  this.createOscillator();
  this.osc.start( when );

  this.notes.forEach(function( note, i ) {
    when = this.scheduleNote( i, when );
  }.bind( this ));

  this.osc.stop( when );
  this.osc['onended'] = this.play.bind( this, when );

  return this;
};

// stop playback, null out the oscillator, cancel parameter automation
Sequence.prototype.stop = function() {
  if ( this.osc ) {
    this.osc['onended'] = null;
    this.osc.stop( 0 );
    this.osc['frequency']['cancelScheduledValues']( 0 );
    this.osc = null;
  }
  return this;
};

var sequence1;
var sequence2;
var sequence3;


var startPlayingMuzak = function(tempo){
    if(sequence1)return;

    var totalLead = [];
    var totalBass = [];
    var totalHarmony = [];
    var notesReference = [ 'A','B', 'C', 'D', 'E', 'F', 'G'];

    var notes = [];
    for(var i=0;i<6;i++){
      if(rand(1,8)==1 && i>1){
        notes.push('-');
      }else{
        notes.push(
          notesReference[rand(0,notesReference.length-1)]
        )
      }
    }

    for(var j=0;j<5;j++){
      var lead = [];
      var bass = [];
      var harmony = [];
      
      for(var i=0;i<8;i++){
        harmony.push(
          notes[rand(0,notes.length-1)] +
          rand(4,4)+
          ' 1'
        );
        harmony.push(
          notes[rand(0,notes.length-1)] +
          rand(4,4)+
          ' 1'
        );
      }


      var leadLength = rand(1,2)*4;
      for(var i=0;i<leadLength;i++){
        lead.push(
          notes[rand(0,notes.length-1)] +
          rand(3,5)+
          ' 2'
        );
      }
      if(leadLength==4)
        lead = lead.concat(['- 16']);


      var bassLength = rand(1,2)*2;
      for(var i=0;i<bassLength;i++){
        bass.push(
          notes[rand(0,1)] +
          rand(3,4)+
          ' 2')
        bass.push('- 2');
      }
      if(bassLength==2)
        bass = bass.concat(['- 16']);
        
      
      for(var k=0;k<3;k++){
        harmony = harmony.concat(harmony);
        lead = lead.concat(lead);
        bass = bass.concat(bass);
      }
      
      totalHarmony = totalHarmony.concat(harmony);
      totalLead = totalLead.concat(lead);
      totalBass = totalBass.concat(bass);
    }

    /*
    w-4
    h-2
    q-1
    e-.5
    s.25
    */

    sequence1 = new Sequence(tempo, totalLead );
    sequence2 = new Sequence(tempo, totalHarmony );
    sequence3 = new Sequence(tempo, totalBass );
     
    sequence1.inverseStaccato = 0.3;
    sequence2.inverseStaccato = 0.5;
    sequence3.inverseStaccato = 0.6;
    sequence3.smoothing = 0.6;

    sequence1['mid']['frequency'].value = 800;
    sequence2['mid']['frequency'].value = 1200;
/*
I NOT GOOD AT MUSC. OH GOD WHAT AM I DOING. can't really understand/hear if this is important, so can't justify the size

    sequence1['mid']['frequency'].value = 800;
    sequence1['mid']['gain'].value = 3;
     
    sequence2['mid']['frequency'].value = 1200;
    sequence3['mid']['gain'].value = 3;
     
    sequence3['bass']['gain'].value = 6;
    sequence3['bass']['frequency'].value = 80;
    sequence3['mid']['gain'].value = -6;
    sequence3['mid']['frequency'].value = 500;
    sequence3['treble']['gain'].value = -2;
    sequence3['treble']['frequency'].value = 1400;/*
*/

    sequence1.play( ac.currentTime );
    sequence2.play( ac.currentTime );
    sequence3.play( ac.currentTime );
}

var stopPlayingMuzak = function(){
    if(sequence1){
        sequence1.stop();
        sequence2.stop();
        sequence3.stop();
    }

    sequence1 = null;
}

})()
