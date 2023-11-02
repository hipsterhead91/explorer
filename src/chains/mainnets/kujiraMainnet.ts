import IChain from "../../models/IChain";

const kujiraMainnet: IChain = {
  name: "Kujira",
  chainId: "kaiyo-1",
  coinGeckoId: "kujira",
  cosmostationId: "kujira",
  isMainnet: true,
  symbol: "KUJI",
  denom: "ukuji",
  decimals: 6,
  api: [
    { provider: "Polkachu", address: "https://kujira-api.polkachu.com" },
    { provider: "Kjnodes", address: "https://kujira.api.kjnodes.com" },
    { provider: "Allnodes", address: "https://kujira-rest.publicnode.com" },
    { provider: "Setten", address: "https://lcd.kaiyo.kujira.setten.io" },
    { provider: "Nodeist", address: "https://api-kujira.nodeist.net" },
    { provider: "Golden Ratio Staking", address: "https://rest-kujira.goldenratiostaking.net" },
  ],
  descriptionEng: "Kujira is committed to levelling the playing field in decentralized finance by building dApps for regular crypto users.",
  descriptionRus: "Kujira стремится выровнять условия игры в децентрализованных финансах, создавая приложения для обычных криптопользователей.",
  logo: "/logos/kujira.png",
  links: {
    website: 'https://kujira.network/',
    github: 'https://github.com/Team-Kujira/',
    twitter: 'https://twitter.com/TeamKujira',
  },
}

export default kujiraMainnet;