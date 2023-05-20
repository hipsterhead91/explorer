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
    "https://api.omniflix.nodestake.top",
    "https://omniflixhub-api.skynetvalidators.com"
  ],
  description: "A network specifically designed for creators and communities, powered by NFTs.",
  logo: "/logos/omniflix.png"
}

export default omniflixMainnet;