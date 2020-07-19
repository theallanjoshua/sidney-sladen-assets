import * as React from 'react';
import { Typography, Input } from 'antd';
import PhotoGallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";

const { Search } = Input;
const { Text } = Typography;
const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3
  }
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
              views={photos}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </>;
  }
}