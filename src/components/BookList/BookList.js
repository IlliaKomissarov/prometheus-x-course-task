import { Link } from 'react-router-dom';
import DATA from '../../books.json';
import { useState } from 'react';
import { LocalStorageService } from '../../services/localStorage';
import { Navigate } from 'react-router-dom';
import '../BookList/book-list.css';

function BookList() {
  const books = DATA.books;

  const [filterValue, setFilterValue] = useState('');
  const [filterPriceValue, setFilterPriceValue] = useState('all');

  function filterOnChange(e) {
    setFilterValue(e.target.value);
  }
  if (!LocalStorageService.get('username')) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <main className="container">
        <div className="filter-container">
          <input
            className="filter-input"
            type="text"
            placeholder="Search by book name"
            onChange={filterOnChange}
          />
          <p className="filter-price-text">Price:</p>
          <select
            value={filterPriceValue}
            onChange={e => setFilterPriceValue(e.target.value)}
            className="filter-price-input"
          >
            <option value="all">All</option>
            <option value="<15">0 {'<'} 15</option>
            <option value="<30">15 {'<'} 30</option>
            <option value="30<">30 {'<'}</option>
          </select>
        </div>
        <div className="book-list">
          {books
            .filter(book =>
              book.title.toLowerCase().includes(filterValue.toLowerCase())
            )
            .filter(function (book) {
              let result;
              if (filterPriceValue === 'all') {
                result = 0 < book.price && book.price <= Number.MAX_VALUE;
              } else if (filterPriceValue === '<15') {
                result = 0 < book.price && book.price <= 15;
              } else if (filterPriceValue === '<30') {
                result = 15 < book.price && book.price <= 30;
              } else if (filterPriceValue === '30<') {
                result = 30 < book.price && book.price <= Number.MAX_VALUE;
              }
              return result;
            })
            .map(filteredBook => {
              return (
                <div className="book-container" key={filteredBook.id}>
                  <div className="book-image-container">
                    <img
                      className="book-image"
                      src={
                        filteredBook.image ||
                        require('../../media/images/imageNotFound.png')
                      }
                      alt={filteredBook.title}
                    />
                  </div>
                  <h3 className="book-title">
                    {filteredBook.title.length > 24
                      ? filteredBook.title.substring(0, 24) + '...'
                      : filteredBook.title}
                  </h3>
                  <span className="book-author">
                    Author: {filteredBook.author}
                  </span>
                  <div className="bottom-container">
                    <p className="book-price">Price: {filteredBook.price}$</p>
                    <Link
                      className="view-link"
                      to={`/specific-book/${filteredBook.id}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    );
  }
}

export default BookList;
