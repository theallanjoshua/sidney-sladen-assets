import * as React from 'react';
import { Input } from 'antd';
import PhotoGallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";

const { Search } = Input;
const photos = [
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid1.jpg",
    width: 3,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid2.jpg",
    width: 3,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid3.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid4.jpg",
    width: 3,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid5.jpg",
    width: 3.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid6.jpg",
    width: 3,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid7.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid8.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid9.jpg",
    width: 3.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid10.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid11.jpg",
    width: 3,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid12.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid13.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid14.jpg",
    width: 3,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid15.jpg",
    width: 3,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid16.jpg",
    width: 3,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid17.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid18.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid19.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid20.jpg",
    width: 2.5,
    height: 4
  },
  {
    src: "https://sidneysladen-media.s3.amazonaws.com/uuid21.jpg",
    width: 2.5,
    height: 4
  },
];

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

const categories = [
  'The classic pattu saree',
  'Shimmering saree',
  'Embroidery saree',
  'The classic pattu saree',
  'Shimmering saree',
  'Embroidery saree',
  'The classic pattu saree',
  'Shimmering saree',
  'Embroidery saree',
  'The classic pattu saree',
  'Shimmering saree',
  'Embroidery saree',
  'The classic pattu saree',
  'Shimmering saree',
  'Embroidery saree',
  'The classic pattu saree',
  'Shimmering saree',
];

export class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      showGallery: false,
      galleryStartIndex: 0
    }
  }
  render = () => {
    return <>
        <div className='flex-column'>
          <Search
            placeholder="Ex. Red Lehenga"
            size='large'
            style={{ maxWidth: '630px' }}
          />
          <br />
          <div className='flex-nowrap'>
            {categories.map(category => <div style={{
              minWidth: '120px',
              minHeight: '160px',
              background: 'black',
              margin: '2px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '10px',
            }}>
              {category.toUpperCase()}
            </div>)}
          </div>
        </div>
      <br />
      <br />
      <PhotoGallery
        margin={0.5}
        photos={photos}
        onClick={(e, {index }) => this.setState({ showGallery: true, galleryStartIndex: index })}
      />
      <ModalGateway>
        {this.state.showGallery ? (
          <Modal onClose={() => this.setState({ showGallery: false, galleryStartIndex: 0 })}>
            <Carousel
              currentIndex={this.state.galleryStartIndex}
              views={photos.map(({ src }) => ({ source: src }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </>;
  }
}