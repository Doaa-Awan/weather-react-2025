import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Weather from './components/Weather/Weather'

export default function App() {
  return (
    <div id="app">
      <Weather defaultCity='Lisbon'/>
    </div>
  )
}
