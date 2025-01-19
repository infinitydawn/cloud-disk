import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getFiles} from "../../actions/file.js"
import FileList from "./fileList/FileList"
import './styles/disk.css'

const Disk = function () {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)


    // every time a directory is changes, get files for that folder
    useEffect(function () {
        // only called once at start
        // and when any 1 variable in array changes also gets called
        dispatch(getFiles(currentDir))
    }, [currentDir])



    return (
        <div className="disk">
            <div className="disk__btns">
                <button className="disk__back">Go Back</button>
                <button className="disk__create">Create</button>
            </div>
            <FileList/>
        </div>
    )
}

export default Disk