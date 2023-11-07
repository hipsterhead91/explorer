const homepageEng = {

  helloBlock:
    <div className="homepage__block homepage__block_first">
      <h1 className="homepage__heading">Hello,</h1>
      <p className="homepage__paragraph">And welcome to <span className="homepage__bold">Oops!plorer</span> &#128522;</p>
      <p className="homepage__paragraph">This humble app is designed to browse blockchains built on <a className="homepage__link" href="https://v1.cosmos.network/sdk" target="_blank">Cosmos SDK</a>; also, it's my pet project made with TypeScript, React, Redux Toolkit, React Router, SCSS and some other technologies that I'm learning now, so please don't be too hard on it.</p>
      <p className="homepage__paragraph">To start exploring, just <span className="homepage__bold">select a chain in the top right corner of your screen</span>.</p>
    </div>,

  mainBlock:
    <div className="homepage__block">
      <p className="homepage__paragraph">Now, a bit of information about this app:</p>
      <ul className="homepage__list">
        <li className="homepage__list-element">First, <span className="homepage__bold">you can switch between English and Russian versions, as well as between light and dark themes</span> — use appropriate buttons at the top of this page (click on logo at the header to return here at any time).</li>
        <li className="homepage__list-element">When you select a chain, you'll have three tabs: Dashboard, Validators and Proposals (work in progress).</li>
        <li className="homepage__list-element">Dashboard displays some common info about selected chain, such as bonded tokens, current block height (updates every few seconds) or inflation level, using an API. Also, you'll see actual token price in USD, which is provided by <a className="homepage__link" href="https://www.coingecko.com/" target="_blank">CoinGecko</a> (thanks to their own API — the second one in this project).</li>
        <li className="homepage__list-element">If some data is not available, you can try another provider: most of the chains have multiple options, so use the button at the top of the dashboard if you want to select the next source.</li>
        <li className="homepage__list-element">The Validators tab contains a list of validators: you can switch between active and inactive sets, sort the table by columns, search for a specific validator by its name and use navigation buttons to fast scroll up and down the list. Validators avatars are taken from <a className="homepage__link" href="https://github.com/cosmostation/cosmostation_token_resource/tree/master/moniker" target="_blank">Cosmostation repository</a> via <a className="homepage__link" href="https://github.com/octokit/octokit.js" target="_blank">octokit.js</a> — official GitHub REST API client, the third and the last one in <span className="homepage__bold">Oops!plorer</span> at this moment.</li>
        <li className="homepage__list-element">Also, you can click on any validator to see its additional information, such as operator address, website, security contact and other details, if they are provided by the validator itself.</li>
        <li className="homepage__list-element">The Proposals tab is work in progress now, but it shows another table similar to the previous one. Check it out.</li>
        <li className="homepage__list-element">This site is designed in "desktop first" paradigm; however, I tried to made it adaptive for mobile devices, but as long as that wasn't my first priority, you may find it imperfect in some points — sorry for this.</li>
      </ul>
    </div>,

  byeBlock:
    <div className="homepage__block">
      <p className="homepage__paragraph">If you find some issues, feel free to send me an email: <a className="homepage__link" href="mailto: virtualxself@gmail.com">virtualxself@gmail.com</a>.</p>
      <p className="homepage__paragraph"><span className="homepage__bold">Thank you for reading this and have a good day!</span></p>
    </div>,
};

export default homepageEng;