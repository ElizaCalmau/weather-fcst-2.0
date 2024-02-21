import { useState } from 'react'
import axios from 'axios';
import { X } from 'lucide-react'
import './Form.css'

export const Form = ({onClick}) => {
    const [inputData, setInputData] = useState({city: '', startDate: '', endDate: ''})
    
    
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
                <div className='inputWrapper'>
                    <label htmlFor="cities">City</label>
                    <select name="cities" id="cities">
                        <option value="" disabled selected>Choose city</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Karkiv">Karkiv</option>
                        <option value="Lviv">Lviv</option>
                        <option value="Canberra">Canberra</option>
                        <option value="Cape Town">Cape Town</option>
                        <option value="Florence">Florence</option>
                    </select>
                </div>

                <div className='inputWrapper'>
                    <label htmlFor='startDate'>Start Date </label>
                    <input 
                    id='startDate'
                    type='date' 
                    required 
                    value={inputData.startDate} 
                    onChange={(e) => setInputData({...inputData,startDate: e.target.value})}
                    />
                </div>
                <div className='inputWrapper'>
                    <label htmlFor='endDate'>End Date </label>
                    <input 
                    id='endDate'
                    type='date' 
                    required 
                    value={inputData.endDate} 
                    onChange={(e) => setInputData({...inputData,endDate: e.target.value})}
                    />
                </div>
                
            </div>
            <div>{inputData.startDate}, {inputData.endDate}</div>
            <div className='formButtons'>
                <button onClick={onClick}>Cancel</button>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
}