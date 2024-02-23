import { useState, useEffect, useRef } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { searchResults } from 'components/api/api';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import styles from './pixabayFinder.module.css';

const PixabayFinder = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [imageModal, setimageModal] = useState({});
  const prevSearchRef = useRef('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data } = await searchResults(search, page);
        console.log('Fetching images for page:', page); // Добавлен лог
        if (data.hits && data.hits.length > 0) {
          console.log('Fetched images:', data.hits);
          setImages(prevImages => [...prevImages, ...data.hits]);
        } else {
          alert('Your query is invalid');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search !== prevSearchRef.current || page !== 1) {
      console.log(`PrevSearch: ${prevSearchRef.current}`);
      fetchImages();
      prevSearchRef.current = search;
    }
  }, [search, page]);

  const handleSearch = search => {
    if (search === prevSearchRef.current) {
      return alert(`You alredy get results of ${search}! Try something else.`);
    }
    console.log('Submitted:', search);
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);

  const showModal = largeImageURL => {
    setModal(true);
    setimageModal({ largeImageURL });
  };

  const closeModal = () => {
    setModal(false);
    setimageModal({});
  };

  const isImages = Boolean(images.length);
  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && <Loader />}
      {isImages && <ImageGallery items={images} showModal={showModal} />}
      {isImages && (
        <div className={styles.btnWrapper}>
          <Button onClick={loadMore} type="button">
            Load more
          </Button>
        </div>
      )}
      {modal && (
        <Modal largeImageURL={imageModal.largeImageURL} close={closeModal} />
      )}
    </>
  );
};

export default PixabayFinder;
