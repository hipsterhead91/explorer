// Redux
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCurrentLanguage, setCurrentLanguage } from "../store/reducers/currentLanguageSlice";



function Homepage() {

  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const dispatch = useAppDispatch();

  const switchLanguage = (language: "eng" | "rus") => {
    dispatch(setCurrentLanguage(language));
  };

  const activeButtonStyle = (currentLanguage == "eng")
    ? "homepage__language-button homepage__language-button_selected"
    : "homepage__language-button"

  const inactiveButtonStyle = (currentLanguage == "eng")
    ? "homepage__language-button"
    : "homepage__language-button homepage__language-button_selected"

  let helloBlock, mainBlock, byeBlock;
  if (currentLanguage == "eng") {

    helloBlock = <div className="homepage__block">
      <h1 className="homepage__heading">Hello,</h1>
      <p className="homepage__paragraph">And welcome to <span className="homepage__bold">Oops!plorer</span> &#128522;</p>
      <p className="homepage__paragraph">This humble app is designed to browse blockchains built on <a className="homepage__link" href="https://v1.cosmos.network/sdk" target="_blank">Cosmos SDK</a>; also, it's a pet project where I'm training to JavaScript, TypeScript, React (with it's Router), Redux ToolKit and some other technologies, so please don't be too hard on it.</p>
      <p className="homepage__paragraph">To start exploring, just <span className="homepage__bold">select a chain in the top right corner of your screen</span>.</p>
    </div>

    mainBlock = <div className="homepage__block">
      <p className="homepage__paragraph">Now, a bit of information about this app:</p>
      <ul className="homepage__list">
        <li className="homepage__list-element">When you select a chain, it fetches an API (using unique URL for each chain) and shows you a dashboard with some statistics, such as inflation level, days to unbond, current block height (updating every few seconds), number of all bonded tokens, etc. Please note that some of this data may not be available for some specific chains — in this case you'll see "no data" plate.</li>
        <li className="homepage__list-element">Also, it shows information about token price in USD taken from <a className="homepage__link" href="https://www.coingecko.com/" target="_blank">CoinGecko</a> via their own API (the second one in this project). Again, sometimes CoinGecko may be unavailable, so "no data" plate will be shown in this case.</li>
        <li className="homepage__list-element">Besides common chain info, <span className="homepage__bold">Oops!plorer</span> includes validators section presented as a table. You can switch between active and inactive sets, sort table columns, filter validators by their monikers and, for quickness, fast scroll up and down using navigation buttons.</li>
        <li className="homepage__list-element">You can click to any validator to see additional information about it, such as operator address, website, security contact and other details, if it's provided by the validator itself.</li>
        <li className="homepage__list-element">Validator avatars are taken from <a className="homepage__link" href="https://github.com/cosmostation/cosmostation_token_resource/tree/master/moniker" target="_blank">Cosmostation repository</a> via <a className="homepage__link" href="https://github.com/octokit/octokit.js" target="_blank">octokit.js</a> — official GitHub REST API client, the third and the last one in <span className="homepage__bold">Oops!plorer</span> at this moment. Also, blockchain descriptions are from Cosmostation too, and to be honest, some logics and design elements of their <a className="homepage__link" href="https://www.mintscan.io/evmos/validators" target="_blank">Mintscan</a> were the things that inspired me to make my own explorer. I hope Cosmostation is not offended.</li>
        <li className="homepage__list-element">Another section contains proposals and it's similar to validators: you also can click any of them and check out the details. But please, note that this section is work in progress and some elements may look not so good </li>
        <li className="homepage__list-element">Also, remember that you always can switch between English and Russian versions of the app — buttons are at the top of this page.</li>
        <li className="homepage__list-element">This site is designed in "desktop first" paradigm; however, I tried to made it adaptive for mobile devices, but as long as that wasn't my first priority, you may find it imperfect in some points — sorry for this.</li>
      </ul>
    </div>

    byeBlock = <div className="homepage__block">
      <p className="homepage__paragraph">If you find some issues, feel free to send me an email: <a className="homepage__link" href="mailto: virtualxself@gmail.com">virtualxself@gmail.com</a>.</p>
      <p className="homepage__paragraph"><span className="homepage__bold">Thank you for reading this and have a good day!</span></p>
    </div>

  } else if (currentLanguage == "rus") {

    helloBlock = <div className="homepage__block">
      <h1 className="homepage__heading">Привет,</h1>
      <p className="homepage__paragraph">И добро пожаловать в <span className="homepage__bold">Oops!plorer</span> &#128522;</p>
      <p className="homepage__paragraph">Это скромное приложение создано для того, чтобы мониторить блокчейны, построенные на <a className="homepage__link" href="https://v1.cosmos.network/sdk" target="_blank">Cosmos SDK</a>; кроме того, это пет-проект, на котором я тренирую свой JavaScript, TypeScript, React (с его роутером), Redux ToolKit и некоторые другие технологии, так что, пожалуйста, не будьте к нему слишком строги.</p>
      <p className="homepage__paragraph">Чтобы начать, просто <span className="homepage__bold">выберите сеть в правом верхнем углу экрана</span>.</p>
    </div>

    mainBlock = <div className="homepage__block">
      <p className="homepage__paragraph">Теперь немного информации об этом приложении:</p>
      <ul className="homepage__list">
        <li className="homepage__list-element">Когда вы выбираете сеть, оно соединяется с блокчейном посредством API (используя уникальный базовый URL для каждой сети) и перенаправляет вас на страницу со статистикой, такой как, например, уровень инфляции, сроки анбонда, текущая высота блока (которая обновляется каждые несколько секунд) или общее количество токенов в стейке. Пожалуйста, учтите, что временами некоторые из этих данных могут быть недоступны для той или иной сети — в этом случае вы увидите соответствующую плашку.</li>
        <li className="homepage__list-element">Также, приложение показывает информацию о цене токена в USD, взятую с <a className="homepage__link" href="https://www.coingecko.com/" target="_blank">CoinGecko</a> через их собственное API (второе в этом проекте). Опять же, иногда CoinGecko может быть недоступен, и тогда вместо цены вы увидите заглушку.</li>
        <li className="homepage__list-element">Помимо базовой информации о сети, <span className="homepage__bold">Oops!plorer</span> содержит вкладку с валидаторами, представленными в виде таблицы. Вы можете переключаться между активным и неактивным сетом, сортировать таблицу по столбцам, фильтровать валидаторов по их моникеру (имени) и, для удобства, быстро скроллить таблицу вверх и вниз кликом на соответствующие кнопки.</li>
        <li className="homepage__list-element">Вы также можете щёлкнуть по любому валидатору, чтобы посмотреть более подробную информацию о нём, например его адрес оператора, вебсайт, дополнительные данные для связи и прочие детали — при условии, конечно, что он их предоставил.</li>
        <li className="homepage__list-element">Аватары валидаторов взяты из <a className="homepage__link" href="https://github.com/cosmostation/cosmostation_token_resource/tree/master/moniker" target="_blank">репозитория Cosmostation</a> посредством  <a className="homepage__link" href="https://github.com/octokit/octokit.js" target="_blank">octokit.js</a> — официального REST API клиента GitHub, третьего и последнего в <span className="homepage__bold">Oops!plorer</span> на данный момент. Кроме того, описания блокчейнов в дашборде также взяты у Cosmostation, и если быть честным, я довольно сильно вдохновлялся их эксплорером <a className="homepage__link" href="https://www.mintscan.io/evmos/validators" target="_blank">Mintscan</a>, когда придумывал логику и дизайн своего собственного. Надеюсь, Cosmostation не в обиде на меня.</li>
        <li className="homepage__list-element">Ещё одна секция содержит предложения (пропозалы) сети, и она схожа с разделом валидаторов: вы тоже можете кликнуть по любому из элементов таблицы, чтобы посмотреть детали. Но пожалуйста, имейте ввиду, что эта секция находится в работе, и некоторые элементы могут выглядеть незаконченно и плохо.</li>
        <li className="homepage__list-element">Также, не забывайте о возможности переключаться между английской и русской версией приложения — кнопки расположены в самом начале этой страницы.</li>
        <li className="homepage__list-element">Сайт спроектирован в парадигме "desktop first". Я старался по возможности сделать его адаптивным, но поскольку дизайн и вёрстка не являются моей главной целью в данном проекте, вы можете обнаружить, что в некоторых местах получилось не идеально — прошу за это прощения.</li>
      </ul>
    </div>

    byeBlock = <div className="homepage__block">
      <p className="homepage__paragraph">Если найдёте какие-то проблемы, не стесняйтесь писать мне на почту: <a className="homepage__link" href="mailto: virtualxself@gmail.com">virtualxself@gmail.com</a>.</p>
      <p className="homepage__paragraph"><span className="homepage__bold">Спасибо за чтение такой большой простыни, и хорошего дня!</span></p>
    </div>
  }


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

        {helloBlock}
        {mainBlock}
        {byeBlock}

      </div>
    </section>
  );
}

export default Homepage;