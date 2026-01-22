import {createClient,RedisClientType} from 'redis'

export class PubSubManager{
    private static instance:PubSubManager
    private redisClient:RedisClientType
    private subscriptions:Map<string,string[]>
    
    private  constructor(){
        this.redisClient=createClient();
        this.redisClient.connect();
        this.subscriptions=new Map();
    }

    public static getInstance(){
        if(PubSubManager.instance){
            return PubSubManager.instance
        }
        PubSubManager.instance=new PubSubManager()
        return PubSubManager.instance
    }
    public userSubscribe(userId:string,stock:string){
        if(!this.subscriptions.has(stock)){
            this.subscriptions.set(stock,[])
        }
        this.subscriptions.get(stock)?.push(userId);
        if(this.subscriptions.get(stock)?.length ==1){
            this.redisClient.subscribe(stock,(message)=>{
                console.log(message)
            })
        }
        console.log(`Subscribed to stock ${stock} with userId ${userId}`)
    }
    public userUnsubscribe(userId:string,stock:string){
      this.subscriptions.set(stock,this.subscriptions.get(stock)?.filter((item)=> item!=userId)||[]);
      if(this.subscriptions.get(stock)?.length==0){
        this.redisClient.unsubscribe(stock)
      }
      console.log(this.subscriptions);
    }
    public handleMessage(userId:string,stock:string,message:string){
        this.subscriptions.get(stock)?.map((item)=>{
            console.log(`Sending ${message} to user ${item}`)
        })
    }
}