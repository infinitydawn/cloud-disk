// action that gets file from server

import axios from 'axios'
import { setFiles } from '../reducers/fileReducer'
import { addFile } from '../reducers/fileReducer'
import { deleteFileAction } from '../reducers/fileReducer'
import { addUploadFile, changeUploadFile, showUploader } from "../reducers/uploadReducer";

//parameter - current dir
export function getFiles(dirId, sort) {
    return async function (dispatch) {
        try {
            let url = `http://localhost:5000/api/files`
            if (dirId) {
                url = `http://localhost:5000/api/files?parent=${dirId}`
            }
            if (sort) {
                url = `http://localhost:5000/api/files?sort=${sort}`
            }
            if (dirId && sort) {
                url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`
            }
            const response = await axios.get(url, {
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
            const uploadFile = { name: file.name, progress: 0, id: Date.now() }
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))

            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (error) {

        }
    }
}


export function deleteFile(file) {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }
}



export async function downloadFile(file) {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    )

    if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}