import './App.css'
import Weather from './components/Weather/Weather'

export default function App() {
  return (
    <div className="app">
      <Weather defaultCity='St. Catharines'/>
    </div>
  )
}
