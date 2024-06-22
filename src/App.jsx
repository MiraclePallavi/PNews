import React ,{useEffect,useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Search from './Search'
import News from './News'
import Navbar from './Navbar'
import Weather from './Weather'
import Technology from './Technology'
import Health from './Health'
import Politics from './Politics'
import Sports from './Sports'
import Bookmark from './Bookmark'
const App=()=>{

  return(
    <>
   
    <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Navbar />
    <Routes>
      <Route path='/' element = {<News />}/>
      <Route path='/weather' element = {<Weather />}/>
      <Route path='/technology' element = {<Technology />}/>
      <Route path='/health' element = {<Health />}/>
      <Route path='/politics' element = {<Politics />}/>
      <Route path='/sports' element = {<Sports />}/>
      <Route path='/search' element = {<Search />}/>
      <Route path='/bookmark' element = {<Bookmark />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
