import { useState } from 'react'
import { Form } from './components/Form/Form'
import { Main } from './components/Main/Main'
import './App.css'



function App() {
  const [formVisibility, setFormVisibility] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmission = () => {
    setIsSubmitted(!isSubmitted)
  }

  const handleFormState = () => {
    setFormVisibility(!formVisibility)
  }
  
  console.log(isSubmitted)

  return (
    <>
        <Main onClick={handleFormState} isSubmitted={isSubmitted}/>
      { formVisibility && <Form onClick={handleFormState} handleSubmission={handleSubmission}/>}
    </>
  )
}

export default App
