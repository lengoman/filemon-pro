import {watch} from "chokidar";
import {CommandSender} from "./CommandSender";
import {InstructionType} from "../definitions";
import {FileUtil} from "../utils/FileUtil";

export class FileWatch {
  constructor(private path:string, private server:string) {
  }
  run() {
    const {compress,md5}=new FileUtil();
    watch(this.path,{
      ignored: ['node_modules','tmp']
    }).on("all", (event:InstructionType, path:string) => {
      console.log("new event", event)
      // TODO: remove timeout and use Promises instead
      setTimeout(() => {
        const commandSender = new CommandSender(this.server);
        if (event === InstructionType.Add || event === InstructionType.Change) {

          md5(path).then((hash)=> {
            if(typeof hash === "string") {
              commandSender.execute({type: InstructionType.UpdateMD5, path, md5: hash}).then(()=>{
                console.log("md5 added or updated")
                //commandSender.execute({type: event, path, base64Compress: compress(path)});
              }).catch((fail)=>{
                console.log("error on md5",path,fail)
              })
            }
          })
        } else {
          //Add directories to the list??? maybe directories can be excluded for saving performance
          console.log("adding directories")
          //commandSender.execute({type: event, path})
        }
      }, 500)
    });
  }
}


