import IChain from "../models/IChain";
import cosmosMainnet from "./mainnets/cosmosMainnet";
import evmosMainnet from "./mainnets/evmosMainnet";
import osmosisMainnet from "./mainnets/osmosisMainnet";
import junoMainnet from "./mainnets/junoMainnet";
import kavaMainnet from "./mainnets/kavaMainnet";
import bandMainnet from "./mainnets/bandMainnet";
import akashMainnet from "./mainnets/akashMainnet";
import crescentMainnet from "./mainnets/crescentMainnet";
import chihuahuaMainnet from "./mainnets/chihuahuaMainnet";
import axelarMainnet from "./mainnets/axelarMainnet";
import kichainMainnet from "./mainnets/kichainMainnet";
import secretMainnet from "./mainnets/secretMainnet";

export const chains: Array<IChain> = [
  akashMainnet,
  axelarMainnet,
  bandMainnet,
  chihuahuaMainnet,
  cosmosMainnet,
  crescentMainnet,
  evmosMainnet,
  junoMainnet,
  kavaMainnet,
  kichainMainnet,
  osmosisMainnet,
  secretMainnet,
];

const getCoinGeckoIds = (): string => {
  const idList: Array<string> = [];
  chains.forEach(chain => {
    if (chain.coinGeckoId) idList.push(chain.coinGeckoId)
  });
  return idList.join("%2C%20");
}

export const coinGeckoIds = getCoinGeckoIds();