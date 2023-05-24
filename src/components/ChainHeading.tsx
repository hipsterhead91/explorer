// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";



function ChainHeading() {

  const currentChain = useAppSelector(selectCurrentChain);

  const heading = currentChain?.name;
  const subheading = (currentChain?.isMainnet)
    ? `mainnet · ${currentChain?.chainId}`
    : `testnet · ${currentChain?.chainId}`
  const logoPath = currentChain?.logo;

  return (
    <div className="chain-heading">
      <div className="chain-heading__container">
        <div className="chain-heading__logo" style={{ backgroundImage: `url(${logoPath})` }}></div>
        <div className="chain-heading__main-info">
          <h1 className="chain-heading__heading">{heading}</h1>
          <span className="chain-heading__subheading">{subheading}</span>
        </div>
      </div>
    </div>
  )
}

export default ChainHeading;