import  React, {useState} from 'react'
import Input from "../../utils/input/input.jsx"
import { setPopupDisplay } from '../../reducers/fileReducer.js'
import { createDir } from "../../actions/file.js"
import { useSelector, useDispatch } from 'react-redux'


const Popup = () => {
    const [dirName, setDirName] = useState("")
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    async function createHandler() {
        await dispatch(createDir(currentDir, dirName))
        dispatch(setPopupDisplay("none"))
        setDirName("")
    }

    return (
        <div className='popup' style={{display: popupDisplay}} onClick={() => dispatch(setPopupDisplay("none"))}>
            <div className="popup__content" onClick={event => event.stopPropagation() }>
                <div className="popup__header">
                    <div className="popup__title">Create a new folder</div>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay("none"))}>X</button>
                </div>
                <Input type="text" placeholder="Enter the new folder name..." value={dirName} setValue={setDirName} />
                <button className="popup__create" onClick={() => createHandler()}>Create Folder</button>
            </div>
        </div>
    );
};

export default Popup