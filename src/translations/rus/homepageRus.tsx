const homepageRus = {

  "helloBlock":
    <div className="homepage__block">
      <h1 className="homepage__heading">Привет,</h1>
      <p className="homepage__paragraph">И добро пожаловать в <span className="homepage__bold">Oops!plorer</span> &#128522;</p>
      <p className="homepage__paragraph">Это скромное приложение создано для того, чтобы мониторить блокчейны, построенные на <a className="homepage__link" href="https://v1.cosmos.network/sdk" target="_blank">Cosmos SDK</a>; кроме того, это пет-проект, на котором я тренирую свой JavaScript, TypeScript, React (с его роутером), Redux ToolKit и некоторые другие технологии, так что, пожалуйста, не будьте к нему слишком строги.</p>
      <p className="homepage__paragraph">Чтобы начать, просто <span className="homepage__bold">выберите сеть в правом верхнем углу экрана</span>.</p>
    </div>,

  "mainBlock":
    <div className="homepage__block">
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
    </div>,

  "byeBlock":
    <div className="homepage__block">
      <p className="homepage__paragraph">Если найдёте какие-то проблемы, не стесняйтесь писать мне на почту: <a className="homepage__link" href="mailto: virtualxself@gmail.com">virtualxself@gmail.com</a>.</p>
      <p className="homepage__paragraph"><span className="homepage__bold">Спасибо за чтение такой большой простыни, и хорошего дня!</span></p>
    </div>,
};

export default homepageRus;