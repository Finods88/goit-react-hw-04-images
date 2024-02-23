import { useState, useRef, useEffect } from 'react';
import styles from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef);
    inputRef.current.focus();
  }, []);

  const handleChange = e => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = e => {
    console.log(`Searchbar ${search}`);
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          ref={inputRef}
          value={search}
          onChange={handleChange}
          className={styles.searchForm}
          name="search"
          type="text"
          required
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
