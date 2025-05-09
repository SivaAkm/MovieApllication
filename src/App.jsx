import './css/App.css'
import NavBar from './components/NavBar'
import Favorites from './Pages/Favorites'
import HomePage from './Pages/HomePage'
import {Routes,Route} from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
function App() {
  return (
    <MovieProvider>
    <NavBar/>
     
    <Routes>
      <Route path = "/" element={<HomePage/>}/>
      <Route path = "/Home" element={<HomePage/>}/>
      <Route path = "/MyFavorites" element={<Favorites/>}/>
    </Routes>
      
      </MovieProvider>
     
    
  )
}

export default App
