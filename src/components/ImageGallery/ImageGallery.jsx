import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.css';

const ImageGallery = ({ items, showModal }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL }) => (
    <ImageGalleryItem
      key={id}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
      showModal={showModal}
    />
  ));

  return <ul className={styles.imageGallery}>{elements}</ul>;
};

export default ImageGallery;
