// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentLanguage } from "../store/reducers/currentLanguageSlice";



function Footer() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);

  // ЛОКАЛИЗАЦИЯ
  let avatarsText, oopsplorerText, pricesText;
  if (currentLanguage == "eng") {
    avatarsText = "avatars provided by ";
    oopsplorerText = "Oops!plorer made by ";
    pricesText = "prices provided by ";
  } else if (currentLanguage == "rus") {
    avatarsText = "аватары от ";
    oopsplorerText = "Oops!plorer сделал ";
    pricesText = "цены от ";
  }

  return (
    <footer className="footer">
      <div className="footer__container section-limiter">
        <span className="footer__info">{avatarsText}<a href="https://github.com/cosmostation/cosmostation_token_resource/tree/master/moniker" target="_blank">Cosmostation</a></span>
        <span className="footer__info">{oopsplorerText}<a href="https://github.com/hipsterhead91" target="_blank">hipsterhead_91</a></span>
        <span className="footer__info">{pricesText}<a href="https://www.coingecko.com/" target="_blank">CoinGecko API</a></span>
      </div>
    </footer>
  );
}

export default Footer;