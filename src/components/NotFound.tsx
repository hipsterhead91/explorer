// Общее
import { Link } from "react-router-dom";

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализации
import notFoundEng from "../translations/eng/notFoundEng";
import notFoundRus from "../translations/rus/notFoundRus";



function NotFound() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);

  // ЛОКАЛИЗАЦИЯ
  let translatedContent = notFoundEng;
  if (currentLanguage == "english") translatedContent = notFoundEng;
  if (currentLanguage == "russian") translatedContent = notFoundRus;

  return (
    <section className="not-found">
      <div className="not-found__container">
        <div className="not-found__error">
          <h1 className="not-found__heading">404</h1>
          <p className="not-found__description">{translatedContent.error}</p>
          <Link to="/" className="not-found__link"><span>&#8249;</span>{translatedContent.link}</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;