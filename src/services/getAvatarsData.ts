/* Octokit - официальный клиент для GitHub API; среди прочего позволяет получить тот или иной репозиторий в виде объекта. Документация: https://octokit.github.io/rest.js/v19 */

// Пакеты
import { Octokit } from "@octokit/rest";

// Типизация
import IChain from "../models/IChain";



const octokit = new Octokit();

async function getAvatarsData(chain: IChain) {
  const repo = await octokit.repos.getContent({
    owner: 'cosmostation',
    repo: 'cosmostation_token_resource',
    path: `moniker/${chain.cosmostationId}`
  });
  return repo.data;
}

export default getAvatarsData;