
import { X } from 'lucide-react'
import './Form.css'
import { useState } from 'react'

export const Form = ({onClick}) => {
    const [inputData, setInputData] = useState({startDate: '', endDate: ''})


    return <div className='FormWrapper'>
        <form id='tripForm'>
            <div className='formLabelWrapper'>
                <label className='formTitle' htmlFor="tripForm">Create trip</label>
                <button onClick={onClick}><X/></button>
            </div>
            <div className='inputElements'>
                <label>
                    Start Date
                    <input type='date' value={inputData.startDate} onChange={(e) => setInputData({...inputData,startDate: e.target.value})}/>
                </label>
                <label>
                    End Date
                    <input type='date' value={inputData.endDate} onChange={(e) => setInputData({...inputData, endDate: e.target.value})}/>
                </label>
            </div>
            <div>{inputData.startDate}, {inputData.endDate}</div>
            <div className='formButtons'>
                <button onClick={onClick}>Cancel</button>
                <button>Save</button>
            </div>
        </form>
    </div>
}