import {PubSubManager} from './PubSubManager'
import {worker} from './worker'
worker()

    PubSubManager.getInstance().userSubscribe('sr','APPL')
    PubSubManager.getInstance().userSubscribe('sd','APPL')

    // setTimeout(() => {
    // PubSubManager.getInstance().userUnsubscribe('sr','APPL')
        
    // }, 3000);

