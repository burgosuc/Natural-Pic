import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'
import Context from './context/MyContext'
import Favoritas from './views/Favoritos'
import Home from './views/Home'

const PHOTO_URL = '/photos.json'

const App = () => {
  const [photos, setPhotos] = useState([])

  const getPhotos = async () => {
    try {
      const response = await fetch(PHOTO_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch photos.')
      }
      const data = await response.json()
      const transformedPhotos = data.photos.map((photo) => ({
        id: photo.id,
        src: photo.src.tiny,
        alt: photo.alt,
        liked: false
      }))
      setPhotos(transformedPhotos)
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }

  useEffect(() => {
    getPhotos()
  }, [])

  return (
    <>
      <Context.Provider value={{ photos, savePhotos: setPhotos }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favoritos' element={<Favoritas />} />
        </Routes>
      </Context.Provider>
    </>
  )
}

export default App
