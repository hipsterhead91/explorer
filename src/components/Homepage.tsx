// Redux
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCurrentLanguage, setCurrentLanguage } from "../store/reducers/currentLanguageSlice";
import { selectCurrentTheme, setCurrentTheme } from "../store/reducers/currentThemeSlice";

// Локализации
import homepageEng from "../translations/eng/homepageEng";
import homepageRus from "../translations/rus/homepageRus";


function Homepage() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const currentTheme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  // ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА
  const switchLanguage = (language: "eng" | "rus") => {
    dispatch(setCurrentLanguage(language));
    localStorage.setItem("lang", language);
  };

  // ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
  const switchTheme = (theme: "light" | "dark") => {
    dispatch(setCurrentTheme(theme));
    localStorage.setItem("theme", theme);
  };

  const englishButtonStyle = (currentLanguage == "eng")
    ? "homepage__switcher-button homepage__switcher-button_selected"
    : "homepage__switcher-button"

  const russianButtonStyle = (currentLanguage == "rus")
    ? "homepage__switcher-button homepage__switcher-button_selected"
    : "homepage__switcher-button"

  const lightButtonStyle = (currentTheme == "light")
    ? "homepage__switcher-button homepage__switcher-button_selected"
    : "homepage__switcher-button"

  const darkButtonStyle = (currentTheme == "dark")
    ? "homepage__switcher-button homepage__switcher-button_selected"
    : "homepage__switcher-button"

  // ЛОКАЛИЗАЦИЯ
  let translatedContent = homepageEng;
  if (currentLanguage == "eng") translatedContent = homepageEng;
  if (currentLanguage == "rus") translatedContent = homepageRus;

  return (
    <section className="homepage">
      <div className="homepage__container section-limiter">
        <div className="homepage__switchers-alignment">
          <div className="homepage__switchers">
            <div className="homepage__switcher">
              <button className={englishButtonStyle} onClick={() => { switchLanguage("eng") }}>
                <div className="homepage__language homepage__language_eng"></div>
              </button>
              <button className={russianButtonStyle} onClick={() => { switchLanguage("rus") }}>
                <div className="homepage__language homepage__language_rus"></div>
              </button>
            </div>
            <div className="homepage__switcher">
              <button className={lightButtonStyle} onClick={() => { switchTheme("light") }}>
                <div className="homepage__theme homepage__theme_light"></div>
              </button>
              <button className={darkButtonStyle} onClick={() => { switchTheme("dark") }}>
                <div className="homepage__theme homepage__theme_dark"></div>
              </button>
            </div>
          </div>
        </div>


        {/* <div className="homepage__language-switcher">
          <button className={activeButtonStyle} onClick={() => { switchLanguage("eng") }}>
            <div className="homepage__flag homepage__flag_uk"></div>
            <span className="homepage__language">English</span>
          </button>
          <button className={inactiveButtonStyle} onClick={() => { switchLanguage("rus") }}>
            <span className="homepage__language">Русский</span>
            <div className="homepage__flag homepage__flag_rus"></div>
          </button>
        </div> */}
        {translatedContent.helloBlock}
        {translatedContent.mainBlock}
        {translatedContent.byeBlock}
      </div>
    </section>
  );
}

export default Homepage;