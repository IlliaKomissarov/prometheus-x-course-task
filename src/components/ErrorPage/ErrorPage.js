import { Link } from "react-router-dom";
import '../ErrorPage/error-page.css';

export default function ErrorPage() {
  return (
    <main className="error-page-container">
      <h1>Oops, something went wrong...</h1>
      <p>404 error</p>
      <Link to="books">Return to Books page</Link>
    </main>
  );
}
