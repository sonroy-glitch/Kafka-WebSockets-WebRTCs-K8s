interface Game{
    id:string,
    whitePlayer:string,
    blackPlayer:string,
    moves:string[]
}
class GameManager{
    games:Game[]=[];
    constructor(){
        this.games=[]
    }
    addMove(id:string,move:string){
       console.log(`Adding move ${move} to ${id}`)
       this.games.map((item:Game)=>{
        if(item.id==id){
            item.moves.push(move)
        }
       })
    }
    addGame(game:Game){
      this.games.push(game)
    }
    log(){
        console.log(this.games)
    }
}
export const gameManager=new GameManager();