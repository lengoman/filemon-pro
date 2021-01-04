import {spawn} from "child_process";
import {FileWatch} from "./client/FileWatch";
import {Configuration} from "./definitions";
import {ApiConnector} from "./api/ApiConnector";

class FilemonPro{
    start(){
        const local="http://localhost:3000"
        // sequence events...
       // const spawnProcess=spawn("cmd",["/c","json-server","--watch","./tmp/db.json","--port","3000"])
        spawn("cmd",["/c","json-server","--watch","./tmp/db.json","--port","3000"])
        // Check configuration - TODO need to add default config
       // spawnProcess.stdout.on('data',(message)=> {
       //     console.log("Message",message.toString())
        console.log("Starting ...")
        setTimeout(()=> {
            const configuration: Configuration = {local, remote: ''}
            new ApiConnector(local).getConfiguration().then(response => {
                configuration.remote = response.data.remote
                console.log("configuration response", configuration)
                // ApiConnector.getConfiguration()
                // First checksums for local files
                // ApiConnector.getLocalChecksums -> store on local variable
                // Chechsums for remote files
                // ApiConnector.getRemoteChecksums -> store on local variable
                // Compare checksums
                // calculateDiff(localMD5,remoteMD5)
                // sync local with remote
                // if local < remote -> pullRemote files
                // else -> send local files
                // then...
                new FileWatch(".", local).run();
                // Add onChange
                // Add onUpdateChecksum
                // Add onSendToRemote
            })
            //  })
        },3000)

    }
}

new FilemonPro().start()