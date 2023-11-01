const validatorsEng = {
  active: "Active",
  inactive: "Inactive",
  clear: "Clear",
  inputPlaceholder: "search by moniker",

  noValidatorsPlaceholder:
    <div className="validators__placeholder">
      <p className="validators__placeholder-text-top">Validators are loading or unavailable now.</p>
      <p className="validators__placeholder-text-bottom">If it lasts too long, you may try to refresh this page (<span>press F5</span>).</p>
    </div>,

  nothingFoundPlaceholder: <div className="validators__placeholder">
    <p className="validators__placeholder-text-top"><span>Oops!</span> Nothing found.</p>
    <p className="validators__placeholder-text-bottom">No validator in selected set contains these symbols in its moniker. You may switch between active/inactive sets and try again.</p>
  </div>
}

export default validatorsEng;