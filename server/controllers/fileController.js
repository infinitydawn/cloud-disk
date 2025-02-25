const fileService = require("../services/fileService")
const User = require('../models/User')
const File = require('../models/File')
const config = require("config")
const fs = require("fs")

class FileController {
    async createDir(req, res){
        try {
            const { name, type, parent} = req.body
            const file = new File({name,type,parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})

            if(!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.children.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }


    async getFiles(req, res){
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            return res.json(files)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "cannot get files"})
        }
    }

    async uploadFile(req,res){
        try {
            // the file to save
            const file = req.files.file

            // find parent folder and user in DB
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            // if not enough space return error
            if (user.usedSpace + file.size > user.diskSpace){
                return res.status(400).json({message: "There is no space on the disk"})
            }

            // update used space
            user.usedSpace = user.usedSpace + file.size

            let path;

            // decide path if there is parent or not
            if(parent) {
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${file.name}`
            }

            // check if this file already exists
            if(fs.existsSync(path)){
                return res.status(400).json({message: 'File already exists.'})
            }

            // save file by path
            file.mv(path)

            // get the file extension type
            const type = file.name.split('.').pop()
            let filePath = file.name
            if(parent) {
                filePath = parent.path + "\\" + file.name
            }

            // create model of the file
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            })

            // save file and user in database
            await dbFile.save()
            await user.save()


            // respond back to client
            res.json(dbFile)

        } catch (error) {
            console.log(error)
            return res.status(400).json({message: "Upload error"})
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const path = config.get('filePath')+"\\"+req.user.id+"\\"+file.path
            console.log(path)
            if(fs.existsSync(path)){
                return res.download(path, file.name)
            }

            return res.status(400).json({message: "Download Error - File not found."})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Download error", errorDetails: error})
        }
    }

    async deleteFile(req, res){
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})

            if(!file){
                return res.status(400).json({message: "File not found."})
            }

            fileService.deleteFile(file)

            await file.deleteOne()

            return res.json({message: 'File was deleted.'})
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: "Most likely dir is not empty."})
        }
    }
}


module.exports = new FileController()