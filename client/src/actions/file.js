// action that gets file from server

import axios from 'axios'

//parameter - current dir
export function getFiles(dirId) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:5000/api/files${dirId ? "?parent="+dirId : ""}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            console.log(response.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}