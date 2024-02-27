import { useState } from 'react'
import axios from 'axios';
import { X } from 'lucide-react'
import './Form.css'


export const Form = ({onClick, handleSubmission}) => {
    
    const [inputData, setInputData] = useState({city: '', startDate: '', endDate: ''})

    const formattedData = {
        ...inputData,
        startDate: new Date(inputData.startDate).getTime(),
        endDate: new Date(inputData.endDate).getTime()
      };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/addCity', formattedData)
        .then(function (response) {
            console.log('Response from server:', response.data);
        })
        .catch(function (error) {
        console.error('Error:', error);
        });
        onClick()
        handleSubmission()
    }

    return <div className='formWrapper' >
        <p>{inputData && inputData.startDate ? inputData.startDate : ''}</p>
        <form id='inputDataForm' onSubmit={handleSubmit}>
            <div className='formLabelWrapper'>
                <label className='formTitle' htmlFor="inputDataForm">Create inputData</label>
                <button onClick={onClick}><X/></button>
            </div>
            <div className='inputElements'>
                <div className='inputWrapper'>
                    <label htmlFor="cities"><span>*</span>City</label>
                    <select name="cities" id="cities" defaultValue="Please seelct a city" required onChange={(e) => setInputData({...inputData, city: e.target.value})}>
                        <option value="Please seelct a city" disabled>Please seelct a city</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Kharkiv">Karkiv</option>
                        <option value="Lviv">Lviv</option>
                        <option value="Canberra">Canberra</option>
                        <option value="Cape Town">Cape Town</option>
                        <option value="Florence">Florence</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Venice">Venice</option>
                        <option value="Lincoln">Lincoln</option>
                    </select>
                </div>

                <div className='inputWrapper'>
                    <label htmlFor='startDate'><span>* </span>Start Date </label>
                    <input 
                    id='startDate'
                    type='date' 
                    required 

                    onChange={(e) => setInputData({...inputData, startDate: e.target.value})}
                    />
                </div>
                <div className='inputWrapper'>
                    <label htmlFor='endDate'><span>* </span>End Date </label>
                    <input 
                    id='endDate'
                    type='date' 
                    required 

                    onChange={(e) => setInputData({...inputData, endDate: e.target.value})}
                    />
                </div>
                
            </div>
            <div>City: {inputData.city}, {inputData.startDate} {inputData.endDate}</div>
            <div className='formButtons'>
                <button onClick={onClick}>Cancel</button>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
}