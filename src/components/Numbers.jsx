import React from "react"
import phonebook from '../services/phonebook'

const Numbers=({persons, newFilter, setPersons})=>{
    
    const filteredList = persons.filter(person =>person.name.toLowerCase().includes(newFilter.toLowerCase()))
    
    const onDelete = (delPerson) => {
        if (window.confirm(`Delete ${delPerson.name} ?`)) {
        phonebook
            .onDelete(delPerson.id)
            .then(deletedNum => {
            setPersons(persons.filter(person => person.id !== delPerson.id))
            })
        }
    }

    return(
        <div>
            <h2>Numbers</h2>

            <ul>
                {filteredList.map(person => 
                    <li key={person.id} >
                        {person.name} {person.number}
                        <button onClick={()=>onDelete(person)}>delete</button>
                    </li>
                )}
            </ul>
        </div>
    )

}

export default Numbers