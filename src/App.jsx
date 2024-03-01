import { useState,useCallback, useEffect, useRef } from 'react'


function App() {
const [length, setLengt] = useState(0);
const [numberallowed, setNumberAllowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState("")

// useRef hook
const passwordRef = useRef(null)




const passwordGenerator = useCallback(()=>{
let pass = "";
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

if(numberallowed) str+="0123456789" 
if (charAllowed) str+= "!@#$%^&*;:,.?/~"

for (let i = 1; i <= length; i++) {
  let char = Math.floor(Math.random() * str.length+1)
  pass += str.charAt(char)
}
setPassword(pass)
}, [length, numberallowed, charAllowed, setPassword])


const copyPasswordToClip = useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])


useEffect(()=> {
  passwordGenerator()
},[length, numberallowed, charAllowed,passwordGenerator])

  return (
    <>
      {/* <h1 className='text-4xl text-center text-white '>Password Generator</h1> */}
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-5'>
        <input
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly 
        ref={passwordRef}/>
        
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyPasswordToClip}
        >Copy</button>

      </div>
      <div className='flex text-sm gap-x-2 py-3'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={15}
          className='cursor-pointer'
          onChange={(e) => {setLengt(e.target.value)}} />
          <label>Length : {length} </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked = {numberallowed}
          id = "numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked = {charAllowed}
          id = "charInput"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          />
          <label htmlFor='charInput'>Special Chars</label>
        </div>


      </div>

      </div>
    </>
  )
}

export default App
