import React, { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at



export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [index, setIndex] = useState(initialIndex)
  const [steps, setSteps] = useState(initialSteps)
  const [email, setEmail] = useState(initialEmail)
  const [message, setMessage] = useState(initialMessage)

  function getXY(index) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    //let adjX = index + 1

    let x = index % 3 + 1
    let y = Math.ceil((index + 1) / 3)
    
    return [x, y];
  }

  function getXYMessage(index) {  
    return (
      <p>Coordinates ({getXY(index)[0]}, {getXY(index)[1]})</p>
    )
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex)
    setSteps(initialSteps)
    setEmail(initialEmail)
    setMessage(initialMessage)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid, this helper should return the current index unchanged.
    let x = getXY(index)[0]
    let y = getXY(index)[1]
       
      if (direction == "left") {
        if (x > 1) {          
          setIndex(index - 1)
          setMessage(initialMessage)
          setSteps(steps + 1)
        } else { setMessage("You can't go left")}
      }  else if (direction == 'right') {
        if (x < 3) {
          setIndex(index + 1)
          setMessage(initialMessage)
          setSteps(steps + 1)
        } else { setMessage("You can't go right")}      
      } else if (direction == 'up') {
        if (y > 1) {
          setIndex(index - 3) 
          setMessage(initialMessage)
          setSteps(steps + 1)
        } else { setMessage("You can't go up")}     
      } else if (direction == 'down') {
        if (y < 3) {
          setIndex(index + 3)
          setMessage(initialMessage)
          setSteps(steps + 1)
        } else { setMessage("You can't go down")}
      } else {return index}
      
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const button = document.getElementById(evt.target.value)
    getNextIndex(button.value)

    //console.log(button.value)
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage(index)}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move} value={"left"}>LEFT</button>
        <button id="up" onClick={move} value={"up"}>UP</button>
        <button id="right" onClick={move} value={"right"}>RIGHT</button>
        <button id="down" onClick={move} value={"down"}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}





///////////
/* 

CODE PLANNING
------------

  The grid {
    COORDINATES {
      - use remainder (%) to find the x coordinate
        (2%3=2, 7%3=1, etc)

      - divide the index by 3 for the y coordinate 
        (2/3 = < 1, 4/3=<2, etc.) 
        use math.ceiling 
        }

    
  }


///////////
*/