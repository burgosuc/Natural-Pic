import { useContext } from 'react'
import Context from '../context/MyContext'
import IconHeart from './Heart'
const Gallery = () => {
  const { photos, savePhotos } = useContext(Context)

  const setFavorito = (id) => {
    const photoIndex = photos.findIndex((f) => f.id === id)
    photos[photoIndex].liked = !photos[photoIndex].liked
    savePhotos([...photos])
  }

  return (
    <div className='gallery grid-columns-5 p-3'>
      {photos.map((photo, i) => (
        <div
          onClick={() => setFavorito(photo.id)}
          className='photo'
          style={{ backgroundImage: `url(${photo.src})` }}
          key={i}
        >
          <IconHeart filled={photo.liked} />
          <p>{photo.alt}</p>
        </div>
      ))}
    </div>
  )
}
export default Gallery
