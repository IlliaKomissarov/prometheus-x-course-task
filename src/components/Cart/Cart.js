import { LocalStorageService } from '../../services/localStorage';
import { Link, Navigate } from 'react-router-dom';
import DATA from '../../books.json';
import '../Cart/cart.css';

function CartContent() {
  const data = DATA.books;
  let cart = LocalStorageService.get('cart');
  let books = [];
  let totalPrice = 0;

  if (cart !== null) {
    cart.forEach(element => {
      books = [...books, data.find(book => book.id === element.id)];
    });
  }

  function handleOnClick() {
    LocalStorageService.remove('cart');
    window.location.reload();
  }
  if (cart !== null) {
    return (
      <>
        <div className="cart-container">
          {books.map(function (book) {
            let count = cart[books.indexOf(book)].count;
            let price = Math.round(book.price * count * 100) / 100;
            totalPrice += price;
            return (
              <div key={book.id} className="cart-book-container">
                <div className="cart-book-left-container">
                  <div className="cart-image-container">
                    <img
                      alt={book.title}
                      src={
                        book.image ||
                        require('../../media/images/imageNotFound.png')
                      }
                    />
                  </div>
                  <p className="cart-book-title">{book.title}</p>
                  <p className="cart-book-price-for-one">
                    Price for one: {book.price}$
                  </p>
                  <p className="cart-book-count">
                    Count: {cart[books.indexOf(book)].count}
                  </p>
                </div>
                <p className="cart-book-price">Price: {price}$</p>
              </div>
            );
          })}
          <div className="purchase-container">
            <p>Total price: {Math.round(totalPrice * 100) / 100}$</p>
            <button
              disabled={cart === null ? true : false}
              onClick={handleOnClick}
            >
              Purchase
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="cart-empty">
          <img alt="Cart" src={require('../../media/images/cart.svg').default} />
          <p>Cart empty...</p>
        </div>
        <div className="purchase-container">
          <p>Total price: {Math.round(totalPrice * 100) / 100}$</p>
          <button
            disabled={cart === null ? true : false}
            onClick={handleOnClick}
          >
            Purchase
          </button>
        </div>
      </>
    );
  }
}

export default function Cart() {
  if (!LocalStorageService.get('username')) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <main>
        <Link
          style={{ marginLeft: '20px' }}
          to="/books"
          className="navigate-link"
        >
          ← Back to books
        </Link>

        <CartContent />
      </main>
    );
  }
}
