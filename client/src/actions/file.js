// action that gets file from server

import axios from 'axios'
import { setFiles } from '../reducers/fileReducer'
import { addFile } from '../reducers/fileReducer'

//parameter - current dir
export function getFiles(dirId) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:5000/api/files${dirId ? "?parent=" + dirId : ""}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            console.log(response.data)
            dispatch(setFiles(response.data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}



//parameter - current dir, name - new folder
export function createDir(dirId, name) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`http://localhost:5000/api/files`
                , {
                    name,
                    parent: dirId,
                    type: 'dir'
                }
                , {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            console.log(response.data)
            dispatch(addFile(response.data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}


//
export function uploadFile(file, dirId) {
    return async function (dispatch) {
        try {
            const formData = new FormData()
            formData.append('file', file)

            if (dirId) {
                formData.append("parent", dirId)
            }

            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if(totalLength){
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (error) {

        }
    }
}