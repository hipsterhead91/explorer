import IChain from "../../models/IChain";

const chihuahuaMainnet: IChain = {
  name: "Chihuahua",
  chainId: "chihuahua-1",
  coinGeckoId: "chihuahua-token",
  cosmostationId: "chihuahua",
  isMainnet: true,
  symbol: "HUAHUA",
  denom: "uhuahua",
  decimals: 6,
  api: [
    "https://chihuahua-api.polkachu.com",
    "https://api.chihuahua.wtf",
    "https://chihuahua-api.mercury-nodes.net"
  ],
  description: "The first meme coin on Cosmos ecosystem.",
  logo: "/logos/chihuahua.png",
  links: {
    website: 'https://www.chihuahua.wtf/',
    github: 'https://github.com/ChihuahuaChain/chihuahua',
    twitter: 'https://twitter.com/ChihuahuaChain',
  },
}

export default chihuahuaMainnet;