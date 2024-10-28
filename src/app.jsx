
import { Route, Routes } from 'react-router-dom'
import './app.css'
import Header from './components/Header';
import Record from "../src/components/Record";
export function App () {

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </>
  )
}
