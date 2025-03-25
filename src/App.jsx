import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import AllPuppies from './components/AllPuppies'
import SinglePuppy from './components/SinglePuppy'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
      <h1>Puppy Bowl</h1>
     
     
   <Routes>
    <Route path="/" element= {<AllPuppies />}/>
    <Route path="/:id" element= {<SinglePuppy />} />
   </Routes>
    </>
  )
}

export default App
