import {spawn} from "child_process";
import {FileWatch} from "./client/FileWatch";
import {Configuration} from "./definitions";
import {ApiConnector} from "./api/ApiConnector";

class FilemonPro{
    start(){
        const local="http://localhost:3000"
        // sequence events...
        spawn("cmd",["/c","json-server","--watch","./tmp/db.json","--port","3000"])
        // Check configuration - TODO need to add default config
        const configuration:Configuration={local,remote:''}
        new ApiConnector(local).getConfiguration().then(response=>{
            console.log("configuration response",response)
            configuration.remote=response.data.remote
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

    }
}

new FilemonPro().start()