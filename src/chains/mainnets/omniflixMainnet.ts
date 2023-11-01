import IChain from "../../models/IChain";

const omniflixMainnet: IChain = {
  name: "Omniflix",
  chainId: "omniflixhub-1",
  coinGeckoId: "",
  cosmostationId: "omniflix",
  isMainnet: true,
  symbol: "FLIX",
  denom: "uflix",
  decimals: 6,
  api: [
    { provider: "Nodestake", address: "https://api.omniflix.nodestake.top" },
    { provider: "Skynet", address: "https://omniflixhub-api.skynetvalidators.com" },
  ],
  descriptionEng: "A network specifically designed for creators and communities, powered by NFTs.",
  descriptionRus: "Сеть, основанная на NFT и специально разработанная для создателей и сообществ.",
  logo: "/logos/omniflix.png",
  links: {
    website: 'https://www.omniflix.network/',
    github: 'https://github.com/OmniFlix',
    twitter: 'https://twitter.com/OmniFlixNetwork',
  },
}

export default omniflixMainnet;