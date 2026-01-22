import {PubSubManager} from './store'
export  function worker(){
setInterval(() => {
PubSubManager.getInstance().handleMessage("sd","APPL",String(Math.random()))
    
}, 2000);
}