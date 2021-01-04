import {readFileSync} from "fs";
import {unzlibSync, zlibSync} from "fflate";
import { fromUint8Array,toUint8Array } from 'js-base64';
import * as checksum from "checksum";

export class FileUtil{

    compress(file:string):string{
        const contents = readFileSync(file);
        return fromUint8Array(zlibSync(contents, { level: 9,mem:12 }));
    }
    decompress(base64compress:string):Uint8Array{
        return unzlibSync(toUint8Array(base64compress))
    }
    md5(file:string){
       return new Promise((resolve,reject)=>{
           checksum.file(file,(error,hash:string)=>{
               if(error){
                   reject(error)
               }else {
                   resolve(hash);
               }
               })
           }
       )
    }
}
//const compressed=new FileUtil().compress("../client/test.txt")
//console.log(compressed)
//console.log(Buffer.from(new FileUtil().decompress(compressed)).toString('utf8'))
/*new FileUtil().md5("../client/test2.txt").then(result=>{
    console.log("cool",result)
}).catch(error=>{
    console.log("error",error)
})*/
/*
Steps
//1) check old commands????
2) Get checksum of local files
3) Get checksum of remote files
4) compare local and remote checksums
    - if local has less files than remote, get remote files
    - if remote has less files than local, send missing files
5) when local add/change a file report to remote and update checksum

 */