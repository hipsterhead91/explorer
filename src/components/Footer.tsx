// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";

// Локализации
import footerEng from "../translations/eng/footerEng";
import footerRus from "../translations/rus/footerRus";



function Footer() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);

  // ЛОКАЛИЗАЦИЯ
  let translatedContent = footerEng;
  if (currentLanguage == "eng") translatedContent = footerEng;
  if (currentLanguage == "rus") translatedContent = footerRus;

  return (
    <footer className="footer">
      <div className="footer__container section-limiter">
        <span className="footer__info">{translatedContent.avatars}<a href="https://github.com/cosmostation/cosmostation_token_resource/tree/master/moniker" target="_blank">Cosmostation</a></span>
        <span className="footer__info">{translatedContent.oopsplorer}<a href="https://github.com/hipsterhead91" target="_blank">hipsterhead_91</a></span>
        <span className="footer__info">{translatedContent.prices}<a href="https://www.coingecko.com/" target="_blank">CoinGecko API</a></span>
      </div>
    </footer>
  );
}

export default Footer;