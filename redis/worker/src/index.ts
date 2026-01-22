import {createClient} from 'redis'
const client = createClient()   

async function submission(data:string){
    var body= JSON.parse(data);
    await new Promise(resolve => setTimeout(resolve, 7000));

    console.log(body.problemId)
    console.log(body.code)
    console.log(body.language)

    console.log(`Finished processing submission for problemId ${body.problemId}.`);

}
async function connect(){
    try {
        await client.connect();
        while (true){
            try {

                var data = await client.brPop("problems",0);
                console.log("Data sent for processing")

                await submission(data.element);
            } catch (error) {
                console.log("Error handling submission"+error)
            }
        
        }
    } catch (error:any) {
        console.log("Failed connecting to redis")
    }
}
connect();