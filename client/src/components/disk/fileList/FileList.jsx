import React from 'react'
import "./styles/fileList.css"
import { useSelector } from "react-redux"
import File from "./file/File"

const FileList = () => {

  const files = useSelector(state => state.files.files).map( file => <File key={file._id} file={file} />)
  console.log(files)
  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Name</div>
        <div className="filelist__date">Date</div>
        <div className="filelist__size">Size</div>
      </div>
      {files}
    </div>
  )
}

export default FileList