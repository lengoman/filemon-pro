import {CheckSumRecord, Instruction, Status} from "../definitions";
import axios, {AxiosResponse} from "axios";

const { get, post, put} = axios

export class ApiConnector{

    constructor(private server:string) {
    }

    getConfiguration = () => get(`${this.server}/configuration`)

    getCommandsByStatus=(status:Status)=>get(`${this.server}/commands?status=${status}`)

    postCommand = (instruction:Instruction) =>post(`${this.server}/commands`, instruction)

    getChecksumByPath = (path:string) => get(`${this.server}/checksums?path=${path}`)

    addOrUpdateMD5 = (instruction:Instruction) => {
        const {path}= instruction
        if(path) {
            return this.getChecksumByPath(path).then((response) => {
                if (response.data.length>0 && response.data[0].id) {
                    if(response.data[0].md5!== instruction.md5) {
                        return this.updateMD5(instruction, response.data[0].id)
                    }else{
                        return new Promise((_,reject)=>reject(new Error("no change")));
                    }
                } else {
                    return this.addMD5(instruction)
                }
            }).catch(() => {
                return new Promise((_,reject)=>reject(new Error("fail by socket")));
            })
        }
        else{
            return new Promise((_,reject)=>reject(new Error("missing path")));
        }
    }

    addMD5 = (instruction:Instruction) => post(`${this.server}/checksums`, {path: instruction.path, md5: instruction.md5})

    updateMD5 =  (instruction:Instruction, id:number) => put(`${this.server}/checksums/${id}`, {
        path: instruction.path,
        md5: instruction.md5
    })

    updateStatus=(instruction:Instruction,status:Status)=>{
        instruction.status = status
        return put(`${this.server}/commands/${instruction.id}`,instruction)
    }
}