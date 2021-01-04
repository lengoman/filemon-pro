import {watch} from "chokidar";
import {CommandSender, InstructionType} from "./CommandSender";

class Filewatch {
  constructor(private path:string, private server:string) {
  }
  run() {
    watch(this.path).on("all", (event:InstructionType, path:string) => {
      if((event === InstructionType.Add) || event === InstructionType.Change) {
        new CommandSender({type: event, path,base64Compress:'abc'}, this.server).execute()
      }else
        new CommandSender({type: event, path}, this.server).execute()
    });
  }
}

new Filewatch(".", "http://localhost:3000/commands").run();
