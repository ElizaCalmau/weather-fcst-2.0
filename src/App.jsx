import { useState } from 'react'
import { Form } from './components/Form/Form'
import { Main } from './components/Main/Main'
import './App.css'



function App() {
  const [formVisibility, setFormVisibility] = useState(false)

  const handleFormState = () => {
    setFormVisibility(!formVisibility)
  }

  return (
    <>
        <Main onClick={handleFormState}/>
      { formVisibility && <Form onClick={handleFormState}/>}
    </>
  )
}

export default App
