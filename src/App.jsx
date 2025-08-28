import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import phonebook from './services/phonebook'
import NotificationMsg from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const[newNumber, setNewNumber] = useState('')

  const[filterParam, setFilterParam] = useState('')

  const[notificationMessage, setNotificationMessage]=useState('')

  const[isError, setIsError]=useState(false)

  useEffect(() => {
    phonebook
        .getAll()
        .then(allNumbers=>{
          setPersons(allNumbers)
        })
  },[])
  
  const nameChange=(event)=>{
    setNewName(event.target.value)
  }

  const numberChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilter=(event) => {
    setFilterParam(event.target.value)
  }

  const addPerson = (event) => {

    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}
        phonebook
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNotificationMessage(`Updated ${returnedPerson.name}'s number`)
            setIsError(false)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setIsError(true)
            setNotificationMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      } 
      else{
        alert(`${newName} was not updated`)
        setNewName('')
        setNewNumber('')
        return
      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber        
      }
      phonebook
        .create(personObject)
        .then(newNum => {
          setNotificationMessage(`Added ${newNum.name}`)
          setIsError(false)
          setPersons(persons.concat(newNum))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })      
    }    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMsg message={notificationMessage} isError={isError}/>
      <Filter handleChange={handleFilter} newFilter={filterParam} />
      <PersonForm 
        newName={newName} 
        nameChange={nameChange} 
        newNumber={newNumber} 
        numberChange={numberChange} 
        addPerson={addPerson}
      />
      <Numbers persons={persons} newFilter={filterParam} setPersons={setPersons}/>
    </div>
  )
}

export default App
