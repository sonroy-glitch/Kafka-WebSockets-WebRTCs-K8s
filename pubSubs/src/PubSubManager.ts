import { createClient, RedisClientType } from "redis";

export class PubSubManager {
  public redisClient: RedisClientType;
  public subscription: Map<string, string[]>;
  public static instance: PubSubManager;

  private constructor() {
    this.subscription = new Map();
    connect();
  }
  private static async connect() {
    this.redisClient = createClient();
    await this.redisClient.connect();
  }
  private static getInstance():PubSubManager{
    if (!this.redisClient){
       this.redisClient=createClient()
    }
    return this.redisClient;
  }
  public userSubscribe(userId:string,stock:string){
    
  }
}
