// Пакеты
import { Link } from "react-router-dom";



function NotFound() {

  return (
    <section className="not-found">
      <div className="not-found__container">
        <div className="not-found__error">
          <h1 className="not-found__heading">404</h1>
          <p className="not-found__description">Oops! Seems like URL you are trying to reach is incorrect.</p>
          <Link to="/" className="not-found__link"><span>&#8249;</span> Return to Homepage</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;