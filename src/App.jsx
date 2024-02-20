import { Form } from './components/Form/Form'
import './App.css'
import { useState } from 'react'
import { Main } from './components/Main/Main'

function App() {
  const [showForm, setShowForm] = useState(false)
  const handleFormState = () => {
    setShowForm(!showForm)
  }
  return (
    <>
      <Main onClick={handleFormState}/>
      { showForm && <Form onClick={handleFormState}/>}
    </>
  )
}

export default App
