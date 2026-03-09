import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CountriesList from './components/CardList'
import { CountriesProvider } from './context/CountriesContext'
import CountryDetails from './components/CardDetails'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'

function App() {


  return (
    <>
    <ThemeProvider>
      <CountriesProvider>
       <Navbar />

          <Routes>
            <Route path="/" element={<CountriesList />} />
            <Route path="/country/:name" element={<CountryDetails key={location.pathname} />} />
          </Routes>
      </CountriesProvider>
      </ThemeProvider>
    </>
  )
}

export default App
