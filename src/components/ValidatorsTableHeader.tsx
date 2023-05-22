import { useRef } from "react";

function ValidatorsTableHeader() {

  // Если я всё правильно понял, при использовании хука useRef нужно указывать тип элемента,
  // который ему присваивается, и null как "стартовый" тип, поскольку ref инициализируется
  // ДО рендера, т.е. тогда, когда искомого элемента ещё нет. При этом, обращаясь к элементу
  // через element.current, мы будем получать ошибку, мол элемент возможно равен null -
  // чтобы этого избежать, используем оператор состояния ? после каждого current.
  const validatorSortIcon = useRef<HTMLDivElement | null>(null);
  const votingPowerSortIcon = useRef<HTMLDivElement | null>(null);
  const commissionSortIcon = useRef<HTMLDivElement | null>(null);


  const sortByMoniker = () => {

  }

  const sortByTokens = () => {
    
  }

  const sortByCommission = () => {
    
  }

  return (
    <div className="validators__table-header">

      {/* VALIDATOR */}
      <div id="th-validator" className="validators__table-header-cell">
        <div onClick={() => sortByMoniker()} id="srt-validator" className="validators__sort-button">
          <div ref={validatorSortIcon} className="validators__sort-icon">
            <span className="validators__sort-icon-asc"></span>
            <span className="validators__sort-icon-dsc"></span>
          </div>
          <span className="validators__table-column-name">Validator</span>
        </div>
      </div>

      {/* VOTING POWER */}
      <div id="th-power" className="validators__table-header-cell">
        <div onClick={() => sortByTokens()} id="srt-power" className="validators__sort-button">
          <div ref={votingPowerSortIcon} className="validators__sort-icon">
            <span className="validators__sort-icon-asc"></span>
            <span className="validators__sort-icon-dsc"></span>
          </div>
          <span className="validators__table-column-name">Voting Power</span>
        </div>
      </div>

      {/* COMMISSION */}
      <div id="th-commission" className="validators__table-header-cell">
        <div onClick={() => sortByCommission()} id="srt-commission" className="validators__sort-button">
          <div ref={commissionSortIcon} className="validators__sort-icon">
            <span className="validators__sort-icon-asc"></span>
            <span className="validators__sort-icon-dsc"></span>
          </div>
          <span className="validators__table-column-name">Commission</span>
        </div>
      </div>

    </div>
  )
}

export default ValidatorsTableHeader;