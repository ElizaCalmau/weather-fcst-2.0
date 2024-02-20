
import { X } from 'lucide-react'
import './Form.css'

export const Form = ({onClick}) => {
    return <div className='FormWrapper'>
        <form id='tripForm' action=''>
            <div className='formLabelWrapper'>
                <label className='formTitle' htmlFor="tripForm">Create trip</label>
                <button onClick={onClick}><X/></button>
            </div>
            <div className='inputElements'>
                <input/>
            </div>
            <div className='formButtons'>
                <button onClick={onClick}>Cancel</button>
                <button>Save</button>
            </div>
        </form>
    </div>
}