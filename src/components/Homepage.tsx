// Redux
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCurrentLanguage, setCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализации
import homepageEng from "../translations/eng/homepageEng";
import homepageRus from "../translations/rus/homepageRus";


function Homepage() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const dispatch = useAppDispatch();

  // ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА
  const switchLanguage = (language: "eng" | "rus") => {
    dispatch(setCurrentLanguage(language));
    localStorage.setItem("lang", language);
  };

  const activeButtonStyle = (currentLanguage == "eng")
    ? "homepage__language-button homepage__language-button_selected"
    : "homepage__language-button"

  const inactiveButtonStyle = (currentLanguage == "eng")
    ? "homepage__language-button"
    : "homepage__language-button homepage__language-button_selected"

  // ЛОКАЛИЗАЦИЯ
  let translatedContent = homepageEng;
  if (currentLanguage == "eng") translatedContent = homepageEng;
  if (currentLanguage == "rus") translatedContent = homepageRus;

  return (
    <section className="homepage">
      <div className="homepage__container section-limiter">
        <div className="homepage__language-switcher">
          <button className={activeButtonStyle} onClick={() => { switchLanguage("eng") }}>
            <div className="homepage__flag homepage__flag_uk"></div>
            <span className="homepage__language">English</span>
          </button>
          <button className={inactiveButtonStyle} onClick={() => { switchLanguage("rus") }}>
            <span className="homepage__language">Русский</span>
            <div className="homepage__flag homepage__flag_rus"></div>
          </button>
        </div>
        {translatedContent.helloBlock}
        {translatedContent.mainBlock}
        {translatedContent.byeBlock}
      </div>
    </section>
  );
}

export default Homepage;