import {Instruction, InstructionType, Status} from "../definitions";

export class CommandProcessor{
    constructor(private instruction:Instruction) {}

    run():Status{
        switch(this.instruction.type){
            case InstructionType.Add:
            case InstructionType.Change:{
                console.log("Add or Change file...", this.instruction.path)

                return Status.Done
            }
            case InstructionType.AddDir:{
                console.log("AddDir...",this.instruction.path)
                return Status.Done
            }
            case InstructionType.UnLink:{
                console.log("Unlink file...",this.instruction.path)
                return Status.Done
            }
            case InstructionType.UnlinkDir:{
                console.log("Unlink dir...", this.instruction.path)
                return Status.Done
            }
            case InstructionType.UpdateMD5:{
                console.log("updating md5...",this.instruction.md5)
                return Status.Done
            }
            default:{
                return Status.Failure
            }
        }
    }

}