import {Kafka} from 'kafkajs'


const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})


const consumer = kafka.consumer({ groupId: 'test-group' })
async function run(){
    await consumer.connect()
    await consumer.subscribe({ topic: 'random', fromBeginning: true })
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if(message.value){
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
    }
      },
    })
}
run();



