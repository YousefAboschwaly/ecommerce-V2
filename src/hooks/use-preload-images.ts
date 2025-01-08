import { useState, useEffect } from 'react'

export function usePreloadImages(images: string[]) {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const loadImage = (src: string) =>
      new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
      })

    Promise.all(images.map(loadImage))
      .then(() => setImagesLoaded(true))
      .catch(error => console.error("Error preloading images", error))
  }, [images])

  return imagesLoaded
}

