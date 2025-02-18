import React, { useState } from 'react'
import axios from 'axios'

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
  const baseURL = 'http://localhost:9000/api/result'


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
    document.getElementById('email').value='';
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
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    axios
      .post(baseURL, {
        "email": email, 
        "steps": steps,
        "x": getXY(index)[0],
        "y": getXY(index)[1]
      })
      .then((res) => {
        console.log(res)
        setMessage(res.data.message)     
        setEmail(initialEmail)
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      })
      
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage(index)}</h3>
        <h3 id="steps">{steps == 1 ? `You moved ${steps} time` : `You moved ${steps} times`}</h3>
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
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
} 