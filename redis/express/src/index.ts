import express,{Request,Response} from "express"
import {createClient} from 'redis'
const client= createClient()
const app = express();
app.use(express.json());
app.post("/",async(req:Request,res:Response):Promise<any>=>{
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;
    try {
        await client.lPush("problems",JSON.stringify({problemId,code,language}))
        //store it in the db here
        return res.status(200).send("Submission recieved and stored")
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
})
async function  connect(){
try {
    await client.connect();
    app.listen(3000);
    console.log("Redis connected and server running on port 3000")
} catch (error:any) {
    console.log(error.error)
}
}
connect()