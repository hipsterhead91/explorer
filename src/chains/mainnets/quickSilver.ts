import IChain from "../../models/IChain";

const quicksilverMainnet: IChain = {
  name: "Quicksilver",
  chainId: "quicksilver-2",
  coinGeckoId: "quicksilver",
  cosmostationId: "quicksilver",
  isMainnet: true,
  symbol: "QCK",
  denom: "uqck",
  decimals: 6,
  api: [
    { provider: "Polkachu", address: "https://quicksilver-api.polkachu.com" },
    { provider: "Nodeist", address: "https://api-quicksilver.nodeist.net" },
    { provider: "StakeTake", address: "https://api.quicksilver.stake-take.com" },
    { provider: "Allnodes", address: "https://quicksilver-rest.publicnode.com" },
  ],
  descriptionEng: "Quicksilver is the liquid staking zone custom built for Cosmos decentralization. Choose any validator, earn rewards, and vote with liquid staked assets.",
  descriptionRus: "Quicksilver - это ликвид стейкинг зона, специально созданная для децентрализации Cosmos. Выбирайте любого валидатора, получайте вознаграждения и голосуйте ликвидными активами.",
  logo: "/logos/quicksilver.png",
  links: {
    website: 'https://quicksilver.zone/',
    github: 'https://github.com/quicksilver-zone/quicksilver',
    twitter: 'https://twitter.com/quicksilverzone',
  },
}

export default quicksilverMainnet;