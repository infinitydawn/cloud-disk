// action that gets file from server

import axios from 'axios'
import { setFiles } from '../reducers/fileReducer' 

//parameter - current dir
export function getFiles(dirId) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:5000/api/files${dirId ? "?parent="+dirId : ""}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            console.log(response.data)
            dispatch(setFiles(response.data))
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}