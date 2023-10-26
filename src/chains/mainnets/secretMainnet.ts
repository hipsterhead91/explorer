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
    "https://secret-4.api.trivium.network:1317",
    "https://secretnetwork-lcd.stakely.io",
    "https://secret.api.consensus.one",
  ],
  descriptionEng: "Decentralized, permissionless, public blockchain for privacy-preserving applications.",
  descriptionRus: "Децентрализованный, не имеющий разрешений, общедоступный блокчейн для приложений, сохраняющих конфиденциальность.",
  logo: "/logos/secret.png",
  links: {
    website: 'https://scrt.network/',
    github: 'https://github.com/SecretFoundation',
    twitter: 'https://twitter.com/SecretNetwork',
  },
}

export default secretMainnet;