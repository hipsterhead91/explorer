const validatorsRus = {
  active: "Активные",
  inactive: "Неактивные",
  clear: "Сброс",
  inputPlaceholder: "искать по моникеру",

  noValidatorsPlaceholder:
    <div className="validators__placeholder">
      <p className="validators__placeholder-text-top">Валидаторы грузятся, либо недоступны в данный момент.</p>
      <p className="validators__placeholder-text-bottom">Если это длится слишком долго, попробуйте обновить страницу (<span>нажмите F5</span>).</p>
    </div>,

  nothingFoundPlaceholder: <div className="validators__placeholder">
    <p className="validators__placeholder-text-top"><span>Упс!</span> Ничего не нашлось.</p>
    <p className="validators__placeholder-text-bottom">Ни один валидатор в выбранном сете не содержит введённые вами символы в своём имени. Вы можете переключиться между активным/неактивным сетами и попробовать снова.</p>
  </div>
}

export default validatorsRus;