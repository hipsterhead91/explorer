import IChain from "../../models/IChain";

const secretMainnet: IChain = {
  name: "Secret Network",
  chainId: "secret-4",
  coinGeckoId: "secret",
  cosmostationId: "secret",
  isMainnet: true,
  symbol: "SCRT",
  denom: "uscrt",
  decimals: 6,
  api: [
    "https://secretnetwork-lcd.stakely.io",
    "https://secret.api.consensus.one",
    "https://secret-4.api.trivium.network:1317"
  ],
  description: "Decentralized, permissionless, public blockchain for privacy-preserving applications.",
  logo: "/logos/secret.png",
  links: {
    website: 'https://scrt.network/',
    github: 'https://github.com/SecretFoundation',
    twitter: 'https://twitter.com/SecretNetwork',
  },
}

export default secretMainnet;