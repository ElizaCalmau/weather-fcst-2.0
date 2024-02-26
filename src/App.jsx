import { Form } from './components/Form/Form'
import './App.css'
import { useState } from 'react'
import { Main } from './components/Main/Main'
import axios from 'axios'


function App() {
  const [formVisibility, setFormVisibility] = useState(false)
  const [cities, setCities] = useState([])

  const handleFormState = () => {
    setFormVisibility(!formVisibility)
  }

  const getTrips = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getCities');
      setCities(response.data); // Update state with response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Main onClick={handleFormState}/>
      { formVisibility && <Form onClick={handleFormState}/>}
      <button onClick={getTrips}>get trip</button>
      <div>
        {cities.map((el) => {
          return <div>
              <h3>{el.city}</h3>
              <h4>{el.startDate}</h4>
              <h4>{el.endDate}</h4>
             </div>
        })}
      </div>
      </div>
    </>
  )
}

export default App
