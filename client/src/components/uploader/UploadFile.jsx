import React from 'react'
import "./styles/Uploader.css"
import { useDispatch } from 'react-redux'
import { removeUploadFile } from '../../reducers/uploadReducer'
const UploadFile = ({file}) => {
    const dispatch = useDispatch()
    return (
        <div className='upload-file'>
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <button onClick={()=> dispatch(removeUploadFile(file.id))} className="upload-file__remove">X</button>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: file.progress + "%"}}/>
                <div className="upload-file__percent">{file.progress}%</div>
            </div>

        </div>
    )
}

export default UploadFile

// 1 added markup basic
// made fake array for testing