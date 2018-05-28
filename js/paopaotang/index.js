function Player(name,teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.partners = [];
    this.enemies = [];
    this.state = 'live';
}

Player.prototype.die = function() {
    // var dieNum = 1;
    // 假设游戏结束
    let all_dead = true;
    this.state = 'die';
    // this.enemy.win();
    // 判断是否游戏结束？ state live | dead
    // for this.partners   4个 dead
    for (let i = 0;i < this.partners.length;i++) {
        if (this.partners[i].state === 'live') {
            all_dead = false;
            break;
        }
    }
    if (all_dead) {
        this.lose();
        for (let i = 0;i<this.partners.length;i++) {
            this.partners[i].lose();
        }
        for (let i = 0;i<this.enemies.length;i++) {
            this.enemies[i].win();
        }
    }
}

Player.prototype.win = function() {
    console.log(`${this.name} win!`);
}
Player.prototype.lose = function() {
    console.log(`${this.name} lose!`)
}

// 流程太多了，有一定规律，根据 teamColor 分队
// 工厂模式
const players = [];
function playerFactory (name, teamColor) {
    // 实例化，分配队伍
    var newPlayer = new Player(name, teamColor);
    for (var i = 0;i < players.length;i++) {
        const player = players[i];
        if(player.teamColor === newPlayer.teamColor){
            // 颜色相同则添加为队友
            player.partners.push(newPlayer);
            newPlayer.partners.push(player);
        }else {
            // 否则添加为敌人
            player.enemies.push(newPlayer);
            newPlayer.enemies.push(player);
        }
    }
    // 将新成员添加到全部人员的数组中
    players.push(newPlayer);
    return newPlayer;
}

const player1 = playerFactory('皮蛋','red');
const player2 = playerFactory('小乖','red');
const player3 = playerFactory('宝宝','red');
const player4 = playerFactory('小强','red');
const player5 = playerFactory('黑妞','blue');
const player6 = playerFactory('葱头','blue');
const player7 = playerFactory('胖墩','blue');
const player8 = playerFactory('海盗','blue');

player1.die();
player2.die();
player3.die();
player4.die();


// const player1 = new Player('皮蛋','red');
// const player2 = new Player('小乖','red');
// const player3 = new Player('小明','red');
// const player4 = new Player('小红','red');
// const player2 = new Player('小乖','yellow');
// const player6 = new Player('嘿嘿','yellow');
// const player7 = new Player('呵呵','yellow');
// const player8 = new Player('嘻嘻','yellow');

// 角色上线，互成敌人，匹配到一局
// player1.enemy = player2;
// player2.enemy = player1;

// player1.die();


// enemy 实例 instanceof  /=> new Player