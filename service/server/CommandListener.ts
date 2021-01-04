import axios, {AxiosResponse} from "axios"
import {CommandProcessor} from "./CommandProcessor";
import {Instruction, Status} from "../definitions";
import {ApiConnector} from "../api/ApiConnector";


//Remove server listener
class CommandListener{
    constructor(private server:string, private interval:number) {

    }

    start(){
        const { getCommandsByStatus,updateStatus }=new ApiConnector(this.server)
        setInterval(()=> {

            getCommandsByStatus(Status.Send).then((response: AxiosResponse) => {
                console.log("response", response.data)
                const instructions:Instruction[] = response.data
                instructions.forEach((instruction:Instruction)=> {
                    updateStatus(instruction, Status.Received).then(()=>{
                        updateStatus(instruction,new CommandProcessor(instruction).run())
                    })
                })
            }).catch(()=>{
                console.log("Remove server is down, trying to connect...")
            })
        },this.interval)
    }


}

new CommandListener("http://localhost:3000", 1000).start()