import { useState } from 'react'
import axios from 'axios';
import { X } from 'lucide-react'
import './Form.css'

export const Form = ({onClick}) => {
    const [inputData, setInputData] = useState({startDate: '', endDate: ''})
    
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/send', inputData)
        .then(function (response) {
            console.log('Response from server:', response.data);
        })
        .catch(function (error) {
        console.error('Error:', error);
        });

    }

    return <div className='FormWrapper' >
        <form id='tripForm' onSubmit={handleSubmit}>
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
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
}