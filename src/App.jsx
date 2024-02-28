import { createContext, useState } from 'react'
import { Form } from './components/Form/Form'
import { Main } from './components/Main/Main'
import './App.css'


export const FormContext = createContext()


function App() {

  const [formVisibility, setFormVisibility] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmission = () => {
    setIsSubmitted(!isSubmitted)
  }

  const handleFormVisibility = () => {
    setFormVisibility(!formVisibility)
  }
  const FormContextValue = {
    isSubmitted,
    handleSubmission,
    handleFormVisibility
  }
  
  return (
    <FormContext.Provider value={FormContextValue}>
        <Main/>
      { formVisibility && <Form />}
    </FormContext.Provider>
  )
}

export default App
