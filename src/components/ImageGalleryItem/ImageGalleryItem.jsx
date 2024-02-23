import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, showModal }) => {
  return (
    <li
      onClick={() => {
        showModal(largeImageURL);
      }}
      className={styles.ImageGalleryItem}
    >
      <img src={webformatURL} alt="" className={styles.ImageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;
