import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from "../../actions/file.js"
import { createDir } from "../../actions/file.js"
import FileList from "./fileList/FileList"
import Popup from "./Popup.jsx"
import './styles/disk.css'
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer.js';

const Disk = function () {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)


    // every time a directory is changes, get files for that folder
    useEffect(function () {
        // only called once at start
        // and when any 1 variable in array changes also gets called
        dispatch(getFiles(currentDir))
    }, [currentDir])


    function showPopupHandler() {
        dispatch(setPopupDisplay("flex"))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }



    return (
        <div className="disk">
            <div className="disk__btns">
                {currentDir && <button className="disk__back" onClick={() => backClickHandler()}>Go Back</button>}
                <button className="disk__create" onClick={() => showPopupHandler()}>Create</button>
            </div>
            <FileList />
            <Popup />
        </div>
    )
}

export default Disk