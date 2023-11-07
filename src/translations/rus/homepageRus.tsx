const homepageRus = {

  helloBlock:
    <div className="homepage__block homepage__block_first">
      <h1 className="homepage__heading">Привет,</h1>
      <p className="homepage__paragraph">И добро пожаловать в <span className="homepage__bold">Oops!plorer</span> &#128522;</p>
      <p className="homepage__paragraph">Это скромное приложение создано для того, чтобы мониторить блокчейны, построенные на <a className="homepage__link" href="https://v1.cosmos.network/sdk" target="_blank">Cosmos SDK</a>; кроме того, это мой пет-проект, собранный при помощи TypeScript, React, Redux Toolkit, React Router, SCSS и некоторых других технологий, которые я изучаю, так что, пожалуйста, не будьте к нему слишком строги.</p>
      <p className="homepage__paragraph">Чтобы начать, просто <span className="homepage__bold">выберите сеть в правом верхнем углу экрана</span>.</p>
    </div>,

  mainBlock:
    <div className="homepage__block">
      <p className="homepage__paragraph">Теперь немного информации об этом приложении:</p>
      <ul className="homepage__list">
        <li className="homepage__list-element">Во-первых, <span className="homepage__bold">вы можете переключаться между английской и русской версией сайта, а также выбрать светлую или тёмную тему на ваш вкус</span> — соответствующие кнопки расположены в верхней части данной страницы (вы всегда можете вернуться сюда, кликнув по логотипу в шапке приложения).</li>
        <li className="homepage__list-element">После выбора сети вам будут доступны три вкладки: Статистика, Валидаторы и Предложения (последняя находится в процессе разработки).</li>
        <li className="homepage__list-element">На вкладке статистики отображается основная информация о сети, такая как количество застейканных токенов, текущая высота блока (обновляется каждые несколько секунд) или уровень инфляции — все эти данные получены из блокчейна с помощью API. Также, на этой странице вы увидите актуальную стоимость токена в долларах, предоставленную <a className="homepage__link" href="https://www.coingecko.com/" target="_blank">CoinGecko</a> (спасибо их собственному API, второму в данном проекте).</li>
        <li className="homepage__list-element">Если какая-то информация недоступна, вы можете сменить провайдера: большинство сетей имеют несколько опций, так что используйте кнопку в верхней части экрана статистики, если хотите выбрать следующий источник данных.</li>
        <li className="homepage__list-element">Вкладка валидаторов содержит таблицу с (внезапно) валидаторами: вы можете переключаться между активным сетом и неактивным, сортировать данные по столбцам, искать конкретного валидатора по имени и быстро скроллить страницу вверх и вниз, используя кнопки навигации. Аватары валидаторов взяты из <a className="homepage__link" href="https://github.com/cosmostation/cosmostation_token_resource/tree/master/moniker" target="_blank">репозитория Cosmostation</a> с помощью <a className="homepage__link" href="https://github.com/octokit/octokit.js" target="_blank">octokit.js</a> — официального REST API клиента GitHub, третьего и последнего в <span className="homepage__bold">Oops!plorer</span> на данный момент. </li>
        <li className="homepage__list-element">Также, вы можете кликнуть по любому валидатору, чтобы посмотреть более подробную информацию о нём: например, адрес его оператора, вебсайт, дополнительные данные для связи и прочие детали — при условии, конечно, что валидатор их предоставил.</li>
        <li className="homepage__list-element">Вкладка с предложениями на данный момент разрабатывается: в ней содержится таблица, схожая с валидаторами, и по каждой строке также можно кликнуть для вывода модального окна с дополнительной информацией.</li>
        <li className="homepage__list-element">Сайт спроектирован в парадигме "desktop first". По возможности я старался сделать его адаптивным, но поскольку дизайн и вёрстка не являются моей главной целью в данном проекте, при просмотре с мобильных устройств некоторые элементы могут выглядеть не идеально — прошу за это прощения.</li>
      </ul>
    </div>,

  byeBlock:
    <div className="homepage__block">
      <p className="homepage__paragraph">Если найдёте какие-то ошибки, не стесняйтесь писать мне на почту: <a className="homepage__link" href="mailto: virtualxself@gmail.com">virtualxself@gmail.com</a>.</p>
      <p className="homepage__paragraph"><span className="homepage__bold">Спасибо за чтение такой большой простыни, и хорошего дня!</span></p>
    </div>,
};

export default homepageRus;