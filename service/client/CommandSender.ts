import axios, {AxiosResponse} from "axios";
import {Instruction, InstructionType, Status} from "../definitions";
import {ApiConnector} from "../api/ApiConnector";



export class CommandSender {
    constructor(public server:string) {}

    apiConnector:ApiConnector=new ApiConnector(this.server)

    execute(instruction:Instruction){
        console.log("executing",instruction)
        const {type, path, base64Compress} = instruction
        return new Promise((resolve)=>
        {
            switch (type) {
                case InstructionType.Add:
                case InstructionType.Change: {
                    if (path && base64Compress) {
                        resolve(this.send(instruction));
                    }
                }
                    ;
                    break;
                case InstructionType.AddDir:
                case InstructionType.UnLink:
                case InstructionType.UnlinkDir: {
                    if (path) {
                        resolve(this.send(instruction))
                    }
                }
                    ;
                    break;
                case InstructionType.UpdateMD5:{
                    if(path) {
                        resolve(this.apiConnector.addOrUpdateMD5(instruction))
                    }
                };break;
            }
        })
    }
    send(instruction:Instruction){
        //Add retry to connect
        instruction.status = Status.Send;
        return this.apiConnector.postCommand(instruction).then((response:AxiosResponse)=>{
                    return response.data
                }).catch(()=>{
                    return new Error("fail to connect to server")
                })


    }
}