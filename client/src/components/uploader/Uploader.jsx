import React from 'react'
import UploadFile from './UploadFile'
import "./styles/Uploader.css"
import {useDispatch, useSelector} from "react-redux"
import { hideUploader } from '../../reducers/uploadReducer'

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

    return ( isVisible &&
        <div className='uploader'>
            <div className="uploader__header">
                <div className='uploader__title'>Uploads</div>
                <button className='uploader__close' onClick={() => dispatch(hideUploader())}>X</button>
            </div>
            {files.map(file =>  <UploadFile key={file.id} file={file}/>)}
        </div>
    )
}

export default Uploader

// 1 added markup basic
// made fake array for testing
// made uploadFile componenct and mapped them into uploader
// made styles for uploader
// more details for uploadFile
// 