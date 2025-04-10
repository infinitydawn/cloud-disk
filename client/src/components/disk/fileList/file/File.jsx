import React from 'react'
import './styles/file.css'
import dirLogo from "../../../../assets/img/folder-icon.svg"
import fileLogo from "../../../../assets/img/file-icon.svg"
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer"
import {downloadFile, deleteFile } from "../../../../actions/file"
import sizeFormat from '../../../../utils/sizeFormat'

const File = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  function openDirHandler(file) {
    if(file.type === "dir"){
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
    }
  }

  function downloadClickHandler(event){
    event.stopPropagation()
    downloadFile(file)
  }

  function deleteClickHandler(event){
    event.stopPropagation()
    dispatch(deleteFile(file))
  }

  return (
    <div className="file" key={file.id} onClick= { () =>  openDirHandler(file)}>
      <img src={file.type === `dir` ? dirLogo : fileLogo} alt="" className="file__img" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{sizeFormat(file.size)}</div>
      {file.type !== "dir" && <button onClick={(e)=> downloadClickHandler(e)} className="file__btn file__download">Download</button>}
      <button onClick={(e)=> deleteClickHandler(e)} className="file__btn file__delete">Delete</button>
    </div>
  )
}

export default File