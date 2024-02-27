import { useState } from 'react';
import DATA from '../../books.json';
import { Link, Navigate, useParams } from 'react-router-dom';
import { LocalStorageService } from '../../services/localStorage';
import '../SpecificBook/specific-book.css';

export default function SpecificBook() {
  const { bookId } = useParams();

  const specificBook = DATA.books.find(book => book.id === parseInt(bookId));

  const { author, price, image, title, level, tags, amount, description } =
    specificBook;

  const [count, setCount] = useState(1);

  function handleChange(e) {
    if (e.target.value < 1) {
      setCount(1);
    } else if (e.target.value > amount) {
      setCount(amount);
    } else {
      setCount(e.target.value);
    }
  }

  function handleClick(e) {
    let cart = LocalStorageService.get('cart');
    let isIdRepeated = undefined;

    if (cart !== null)
      for (let i = 0; i < cart.length; i+=1) {
        if (cart[i].id === +bookId) {
          cart[i] = { id: +bookId, count: +count };
          isIdRepeated = true;
          break;
        } else {
          isIdRepeated = false;
        }
      }
    else {
      cart = [{ id: +bookId, count: +count }];
    }

    if (isIdRepeated === false) {
      cart = [...cart, { id: +bookId, count: +count }];
    }

    LocalStorageService.set('cart', cart);
  }

  if (!LocalStorageService.get('username')) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <main className="specific-book">
        <Link to="/books" className="navigate-link">
          ← Back to books
        </Link>

        <div className="specific-book-container">
          <div className="specific-book-image-container">
            <img
              className="specific-book-image"
              alt={title}
              src={image || require('../../media/images/imageNotFound.png')}
            />
          </div>
          <div className="specific-book-info">
            <h2 className="specific-book-title">{title}</h2>
            <p>
              <b>Author:</b> {author}
            </p>
            <p>
              <b>Level:</b> {level}
            </p>
            <p>
              <b>Tags:</b>
              {tags.map(tag => (
                <span key={tag}> {tag} </span>
              ))}
            </p>
          </div>
          <div className="specific-book-price-form">
            <div className="specific-book-price-form-item">
              <span>Price</span>
              <span>{price}$</span>
            </div>
            <div className="specific-book-price-form-item">
              <span>Count</span>
              <input
                className="specific-book-count-price"
                type="number"
                value={count}
                data-testid="counter"
                onChange={handleChange}
              />
            </div>
            <div className="specific-book-price-form-item">
              <span>Total price</span>
              <span>{Math.round(count * price * 100) / 100}$</span>
            </div>
            <input
              className="add-to-cart-input"
              type="submit"
              value="Add to card"
              onClick={handleClick}
            />
          </div>
          <div className="specific-book-description-container">
            <h3>Description</h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {description}
            </p>
          </div>
        </div>
      </main>
    );
  }
}
