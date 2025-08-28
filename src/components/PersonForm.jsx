import React from "react"

function PersonForm({ newName, nameChange, newNumber, numberChange, addPerson }) {
    return (
        <>
            <h2>Add A New</h2>
        
            <form onSubmit={addPerson}>
            
            <div>
                name: <input value={newName} onChange={nameChange} />
            </div>
    
            <div>
                number: <input value={newNumber} onChange={numberChange}/>
            </div>
            
            <div>
                <button type="submit">add</button>
            
            </div>
  
        </form>.
        </>
    )

}

export default PersonForm