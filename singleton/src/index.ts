import {startLogger} from './logger'
import {gameManager} from './store'
startLogger();


    gameManager.addGame({
        "id":"1",
        "whitePlayer":"Bob",
        "blackPlayer":"Bobiya",
        moves:[]
    })

setInterval(() => {
    gameManager.addMove("1",String(Math.random()))
}, 5000);
