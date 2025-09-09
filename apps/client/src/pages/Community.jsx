import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import { dummyPublishedImages } from '../assets/assets'

const Community = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setImages(dummyPublishedImages);
    setLoading(false);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        🌐 Community Images
      </h2>
      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <a
              href={image.imageUrl}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden border bg-white shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.userName}
                  className="w-full h-56 object-cover transform hover:scale-105 transition duration-300"
                />
              </div>
              <p className="p-3 text-sm text-gray-700 bg-gray-50 border-t">
                Created by <span className="font-semibold text-gray-900">{image.userName}</span>
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No images available</p>
      )}
    </div>
  )
}

export default Community
