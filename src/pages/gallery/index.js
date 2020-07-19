import * as React from 'react';
import { Typography, Input } from 'antd';
import PhotoGallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";

const { Search } = Input;
const { Text } = Typography;
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

export class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      showGallery: false,
      galleryStartIndex: 0
    }
  }
  render = () => {
    return <>
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