const homepageEng = {

  "helloBlock":
    <div className="homepage__block">
      <h1 className="homepage__heading">Hello,</h1>
      <p className="homepage__paragraph">And welcome to <span className="homepage__bold">Oops!plorer</span> &#128522;</p>
      <p className="homepage__paragraph">This humble app is designed to browse blockchains built on <a className="homepage__link" href="https://v1.cosmos.network/sdk" target="_blank">Cosmos SDK</a>; also, it's a pet project where I'm training to JavaScript, TypeScript, React (with it's Router), Redux ToolKit and some other technologies, so please don't be too hard on it.</p>
      <p className="homepage__paragraph">To start exploring, just <span className="homepage__bold">select a chain in the top right corner of your screen</span>.</p>
    </div>,

  "mainBlock":
    <div className="homepage__block">
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
    </div>,

  "byeBlock":
    <div className="homepage__block">
      <p className="homepage__paragraph">If you find some issues, feel free to send me an email: <a className="homepage__link" href="mailto: virtualxself@gmail.com">virtualxself@gmail.com</a>.</p>
      <p className="homepage__paragraph"><span className="homepage__bold">Thank you for reading this and have a good day!</span></p>
    </div>,
};

export default homepageEng;