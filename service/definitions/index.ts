

export enum InstructionType {
    Add = "add",
    AddDir = "addDir",
    UnLink = "unlink",
    UnlinkDir = "unlinkDir",
    Change = "change",
    UpdateMD5 = "updateMD5"
}

export enum Status {
    Send = "send",
    Received = "received",
    Processing = "processing",
    Failure = "failure",
    Done = "done",
    UpdatedMD5 = "updatedMD5"
}

export interface Instruction{
    id?:number;
    path?:string;
    base64Compress?:string;
    md5?:string;
    type:InstructionType;
    status?:Status;
}

export interface CheckSumRecord{
    id?: number;
    path?:string;
    md5:string
}

export interface  Configuration{
    local:string;
    remote:string
}