import axios from 'axios';
import { X } from 'lucide-react'
import { useContext, useState } from 'react'
import './Form.css'
import { FormContext} from '../../App'

export const Form = () => {
    const { handleSubmission, handleFormVisibility } = useContext(FormContext)
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
        handleSubmission();
        handleFormVisibility();
    }

    return <div className='formWrapper'>
        <form id='inputDataForm' onSubmit={handleSubmit}>
            <div className='formLabelWrapper'>
                <label className='formTitle' htmlFor="inputDataForm">Create trip</label>
                <button onClick={handleFormVisibility}><X/></button>
            </div>
            <div className='inputElements'>
                <div className='formInputWrapper'>
                    <label htmlFor="cities">City</label>
                    <select name="cities" id="cities" defaultValue="Please seelct a city" required onChange={(e) => setInputData({...inputData, city: e.target.value})}>
                        <option value="Please select a city" disabled>Please seelct a city</option>
                        <option value="Fresno">Fresno</option>
                        <option value="Kharkiv">Karkiv</option>
                        <option value="Lviv">Lviv</option>
                        <option value="Canberra">Canberra</option>
                        <option value="Memphis">Memphis</option>
                        <option value="Florence">Florence</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Venice">Venice</option>
                        <option value="Lincoln">Lincoln</option>
                    </select>
                </div>

                <div className='formInputWrapper'>
                    <label htmlFor='startDate'>Start Date </label>
                    <input id='startDate' type='date' onChange={(e) => setInputData({...inputData, startDate: e.target.value})}/>
                </div>
                <div className='formInputWrapper'>
                    <label htmlFor='endDate'>End Date </label>
                    <input id='endDate' type='date' onChange={(e) => setInputData({...inputData, endDate: e.target.value})}/>
                </div>
            </div>
            <div className='formButtons'>
                <button onClick={handleFormVisibility}>Cancel</button>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
}