// Типизация
import IChain from "../models/IChain";
import IValidator from "../models/IValidator";
import ICosmostationData from "../models/ICosmostationData";



// ОБРЕЗАТЬ КОПЕЙКИ
export function cutDecimals(tokens: string, decimals: number): string {
  return (tokens.length > decimals)
    ? tokens.slice(0, -decimals)
    : "0"
}

// ОБРЕЗАТЬ ЛИШНИЕ СИМВОЛЫ
export function cutExtra(tokens: string, extraSymbols: number): string {
  return tokens.slice(0, -extraSymbols);
}

// ОТФОРМАТИРОВАТЬ СТЕЙК
export function tweakTokens(tokens: string, chain: IChain): string {
  return Number(cutDecimals(tokens, chain.decimals)).toLocaleString('en');
}

// ОТФОРМАТИРОВАТЬ ВЕС ГОЛОСА
export function tweakVotingPower(votingPower: string, chain: IChain): string {
  return (Number(cutDecimals(votingPower, chain.decimals + 1)) / 100).toLocaleString('en');
}

// ОТФОРМАТИРОВАТЬ ЦЕНУ
export function tweakPrice(price: number): string {
  if (price < 0.00000001) return price.toFixed(10)
  if (price < 0.0000001) return price.toFixed(9)
  if (price < 0.000001) return price.toFixed(8)
  if (price < 0.00001) return price.toFixed(7)
  if (price < 0.0001) return price.toFixed(6)
  if (price < 0.001) return price.toFixed(5)
  if (price < 0.01) return price.toFixed(4)
  if (price < 0.1) return price.toFixed(3)
  else return price.toFixed(2)
}

// УПОРЯДОЧИТЬ ВАЛИДАТОРОВ ПО СТЕЙКУ
export function sortByTokens(validators: Array<IValidator>): Array<IValidator> {
  validators.sort((x, y) => Number(x.tokens) - Number(y.tokens));
  validators.reverse();
  return validators;
}

// ДОБАВИТЬ РЕЙТИНГ
/* Принимаемый массив валидаторов уже должен быть упорядочен по стейку! Хотя по идее, можно просто в самое начало вставить sortByTokens() и не париться - попробую позже, если не забуду. */
export function addRanks(validators: Array<IValidator>): Array<IValidator> {
  return validators.map((validator) => ({
    ...validator,
    rank: validators.indexOf(validator) + 1
  }));
}

// ДОБАВИТЬ АВАТАРЫ
/* Аватар является ссылкой, и сейчас проходит простейшую валидацию (ссылка должна содержать валопер и иметь формат PNG). В будущем валидацию можно прописать глубже - вероятно, существуют и готовые решения.*/
export function addAvatars(validators: Array<IValidator>, avatarsData: Array<ICosmostationData>): Array<IValidator> {
  validators.forEach(validator => {
    const valoper = validator.operator_address;
    const match = avatarsData.find(object => {
      return (object.download_url.includes(valoper)) && (object.download_url.includes(".png"))
    })
    match ? validator.avatar = match.download_url : validator.avatar = "";
  });
  return validators;
}

// ДОБАВИТЬ ВЕС ГОЛОСА
export function addVotingPower(validators: Array<IValidator>, bondedTotal: string): Array<IValidator> {
  validators.forEach(validator => {
    const votingPower = (Number(validator.tokens) * 100 / Number(bondedTotal)).toFixed(2);
    validator.voting_power = votingPower;
  });
  return validators;
}

// ОТФИЛЬТРОВАТЬ АКТИВНЫХ
export function filterActive(validators: Array<IValidator>): Array<IValidator> {
  const active = validators.filter(validator => validator.status === "BOND_STATUS_BONDED");
  return active;
}

// ОТФИЛЬТРОВАТЬ НЕАКТИВНЫХ
export function filterInactive(validators: Array<IValidator>): Array<IValidator> | [] {
  const inactive = validators.filter(validator => validator.status !== "BOND_STATUS_BONDED");
  return inactive;
}

// ОТФОРМАТИРОВАТЬ КОМИССИЮ
export function tweakCommission(commission: string): string {
  return (Number(commission) * 100).toFixed(2)
}

// ОТФОРМАТИРОВАТЬ ТИП ПРОПОЗАЛА
export function tweakProposalType(type: string): string {
  const arr1 = type.split(".");
  const i = arr1.length - 1;
  type = arr1[i];
  type = type.replace(/([a-z])([A-Z])/g, "$1 $2");
  const arr2 = type.split(" ");
  const arr3 = arr2.slice(0, arr2.length - 1);
  const result = arr3.join(" ");
  return result;
}

// ОТФОРМАТИРОВАТЬ СТАТУС ПРОПОЗАЛА
export function tweakProposalStatus(status: string): string {
  if (status === "PROPOSAL_STATUS_DEPOSIT_PERIOD") { return "Deposit Period" }
  else if (status === "PROPOSAL_STATUS_VOTING_PERIOD") { return "Voting Period" }
  else if (status === "PROPOSAL_STATUS_PASSED") { return "Passed" }
  else if (status === "PROPOSAL_STATUS_REJECTED") { return "Rejected" }
  else if (status === "PROPOSAL_STATUS_FAILED") { return "Failed" }
  else return "Unspecified";
}

// ОТФОРМАТИРОВАТЬ ДАТУ ПРОПОЗАЛА
export function tweakProposalPeriod(period: string): string {
  const date = period.split("T")[0];
  const time = period.split("T")[1].split(".")[0];
  return date + ", " + time;
}

// ОТФОРМАТИРОВАТЬ ИНФЛЯЦИЮ
export function tweakInflation(inflation: string): string {
  return (Number(inflation) * 100).toFixed(2);
}

// ОТФОРМАТИРОВАТЬ ПУЛ СООБЩЕСТВА
/* 19 символов это точка и 18 цифр после неё - хардкод, но здесь работает */
export function tweakCommunityPool(communityPool: string, decimals: number): string {
  const cutted = cutExtra(communityPool, 19);
  const cuttedAgain = cutDecimals(cutted, decimals);
  return cuttedAgain;
}

// ОТФОРМАТИРОВАТЬ СРОК АНБОНДА
export function tweakUnbondingTime(unbondingTime: string): string {
  const seconds = unbondingTime.slice(0, -1);
  const minutes = Number(seconds) / 60;
  const hours = minutes / 60;
  const days = hours / 24 + '';
  return days;
}