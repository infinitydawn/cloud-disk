const fs = require('fs')
const file = require("../models/File")
const config = require("config")

class FileService {
    createDir(file){
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise( (resolve, reject) => {
            try {
                if(!fs.existsSync(file)){
                    fs.mkdirSync(filePath)
                    return resolve({message: "File was created"})
                } else {
                    return reject({message: "File already exists"})
                }
            } catch (error) {
                return reject({message: "File error"})
            }
        })
    }


    deleteFile(file){
        const path = this.getPath(file)

        if(file.type === "dir"){
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file){
        // prone to errors
        return config.get('filePath')+"/"+file.user + "/" + file.path
    }
}

module.exports = new FileService()