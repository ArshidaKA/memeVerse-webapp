import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Explore from './pages/Explore'
import MemeDetails from './pages/MemeDetails'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import MemeUpload from './pages/Upload'

function App() {
  return (
    

    <div className="bg-background text-[var(--text)] bg-[var(--background)] min-h-screen">

   <Router>
    <Navbar/>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/explore" element={<Explore />} />
        <Route path="/upload" element={ < MemeUpload/>} />
        <Route path="/meme/:id" element={<MemeDetails/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer/>

   </Router>
   </div>
  )
}

export default App


