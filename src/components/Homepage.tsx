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
  const switchLanguage = (language: "english" | "russian") => {
    dispatch(setCurrentLanguage(language));
    localStorage.setItem("language", language);
  };

  // ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
  const switchTheme = (theme: "light-theme" | "dark-theme") => {
    dispatch(setCurrentTheme(theme));
    localStorage.setItem("theme", theme);
  };

  const englishButtonStyle =
    (currentLanguage == "english")
      ? "homepage__switcher-button homepage__switcher-button_selected"
      : "homepage__switcher-button"

  const russianButtonStyle =
    (currentLanguage == "russian")
      ? "homepage__switcher-button homepage__switcher-button_selected"
      : "homepage__switcher-button"

  const lightButtonStyle =
    (currentTheme == "light-theme")
      ? "homepage__switcher-button homepage__switcher-button_selected"
      : "homepage__switcher-button"

  const darkButtonStyle =
    (currentTheme == "dark-theme")
      ? "homepage__switcher-button homepage__switcher-button_selected"
      : "homepage__switcher-button"

  // ЛОКАЛИЗАЦИЯ
  let translatedContent = homepageEng;
  if (currentLanguage == "english") translatedContent = homepageEng;
  if (currentLanguage == "russian") translatedContent = homepageRus;

  return (
    <section className="homepage">
      <div className="homepage__container section-limiter">
        <div className="homepage__switchers-alignment">
          <div className="homepage__switchers">
            <div className="homepage__switcher">
              <button className={englishButtonStyle} onClick={() => { switchLanguage("english") }}>
                <div className="homepage__language homepage__language_eng"></div>
              </button>
              <button className={russianButtonStyle} onClick={() => { switchLanguage("russian") }}>
                <div className="homepage__language homepage__language_rus"></div>
              </button>
            </div>
            <div className="homepage__switcher">
              <button className={lightButtonStyle} onClick={() => { switchTheme("light-theme") }}>
                <div className="homepage__theme homepage__theme_light"></div>
              </button>
              <button className={darkButtonStyle} onClick={() => { switchTheme("dark-theme") }}>
                <div className="homepage__theme homepage__theme_dark"></div>
              </button>
            </div>
          </div>
        </div>
        {translatedContent.helloBlock}
        {translatedContent.mainBlock}
        {translatedContent.byeBlock}
      </div>
    </section>
  );
}

export default Homepage;