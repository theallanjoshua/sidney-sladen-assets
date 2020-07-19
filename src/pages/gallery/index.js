import * as React from 'react';
import { Typography, Input } from 'antd';
import PhotoGallery from 'react-photo-gallery';

const { Search } = Input;
const { Text } = Typography;
const getPhotos = () => [ ...new Array(50) ].map((item, index) => {
  const items = [1, 3, 4];
  const width = items[Math.floor(Math.random() * items.length)];
  const height = items[Math.floor(Math.random() * items.length)];
  return {
    src: String(index),
    width,
    height
  }
})

export const Gallery = () => <>
  <div className='horizontal-center-align'>
    <div className='flex-column'>
      <Text style={{ fontSize: '20px' }}>Explore our collection of exclusive dresses and sarees & find your style</Text>
      <Search
        placeholder="Ex. Red Lehenga"
        size='large'
      />
    </div>
  </div>
  <br />
  <br />
  <PhotoGallery
    photos={getPhotos()}
    renderImage={({ photo, index }) => <div
      key={index}
      style={{
        width: photo.width,
        height: photo.height,
        backgroundColor: '#fff',
        margin: '2px'
      }}
    />}
  />
</>;