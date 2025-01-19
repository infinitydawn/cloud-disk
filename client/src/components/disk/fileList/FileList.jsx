import React from 'react'
import "./styles/fileList.css"
import {useSelector} from "react-redux"
import File from "./file/File"

const FileList = () => {

    // const files = useSelector(state => state.files.files).map( file => <File/>)
    const files = [{_id:1, name: "direc", type: 'dir',size:"5gb", date:"1.19.2025"}].map(file => <File key={file.id}/>)
    

  return (
    <div className="filelist">
        <div className="filelist__header">
            <div className="filelist__name">Name</div>
            <div className="filelist__date">Date</div>
            <div className="filelist__size">Size</div>
        </div>
    </div>
  )
}

export default FileList