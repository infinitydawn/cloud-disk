import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from "../../actions/file.js"
import { createDir } from "../../actions/file.js"
import FileList from "./fileList/FileList"
import Popup from "./Popup.jsx"
import Uploader from "../uploader/Uploader.jsx"
import './styles/disk.css'
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer.js';

const Disk = function () {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')


    // every time a directory is changes, get files for that folder
    useEffect(function () {
        // only called once at start
        // and when any 1 variable in array changes also gets called
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])


    function showPopupHandler() {
        dispatch(setPopupDisplay("flex"))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        // console.log(files);
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    if(loader)

    return (
        !dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                {currentDir && <button className="disk__back" onClick={() => backClickHandler()}>Go Back</button>}
                <button className="disk__create" onClick={() => showPopupHandler()}>Create</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Upload File</label>
                    <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input" />
                </div>
                <select value={sort} onChange={(e)=> setSort(e.target.value)} className='disk__select'>
                    <option value="name">By Name</option>
                    <option value="type">By Type</option>
                    <option value="date">By Date</option>
                </select>
            </div>
            <FileList />
            <Popup />
            <Uploader />
        </div>
        : <div className='drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
         Drag Files Here 
          </div>
        
    )
}

export default Disk