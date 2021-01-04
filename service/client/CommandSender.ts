import axios, {AxiosResponse} from "axios";

export enum InstructionType {
    Add = "add",
    AddDir = "addDir",
    UnLink = "unLink",
    UnlinkDir = "unLinkDir",
    Change = "change"
}

export enum Status {
    Send = "send",
    Received = "received",
    Processing = "processing",
    Failure = "failure",
    Done = "done"
}

export interface Instruction{
    path?:string;
    base64Compress?:string;
    type:InstructionType;
    status?:Status;
}

export class CommandSender {
    constructor(public instruction:Instruction, public server:string) {}

    execute(){
        switch (this.instruction.type){
            case InstructionType.Add || InstructionType.Change:{
                console.log("adding execute", this.instruction)
                if(this.instruction.path && this.instruction.base64Compress) {
                    this.send();
                }
            };break;
            case InstructionType.AddDir || InstructionType.UnLink || InstructionType.UnlinkDir:{
                if(this.instruction.path){
                    this.send()
                }
            }
        }
    }
    private send(){
        this.instruction.status = Status.Send;
        axios.post(`${this.server}`, this.instruction).then((response:AxiosResponse)=>{
            console.log(response.data)
        }).catch(fail=>{
            console.log("fail",fail.data)
        })
    }
}