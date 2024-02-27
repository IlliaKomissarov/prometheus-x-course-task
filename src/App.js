import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import SpecificBook from './components/SpecificBook/SpecificBook';
import Signin from './components/Signin/Signin';
import BookList from './components/BookList/BookList';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorPage from './components/ErrorPage/ErrorPage';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Signin />} />
        <Route path="books" element={<BookList />} />
        <Route path="specific-book/:bookId" element={<SpecificBook />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
