const CATALOG_REVIEW_DATE_20260904='2026-09-04';

function applyVerifiedCatalogUpdates20260904(){
  if(!places.some(p=>p.name==='Mitten Coffee')){
    places.push({
      id:'perm-mitten-coffee-sovarmy-7',
      name:'Mitten Coffee',
      category:'cafe',
      district:'Индустриальный',
      address:'улица Советской Армии, 7',
      phone:'+79223084555',
      phoneLabel:'+7 (922) 308-45-55',
      priceType:'coffee',
      price:'за заказ в кофейне; средний чек около 250 ₽ по актуальным справочникам',
      priceValue:250,
      wifi:'yes',
      power:'maybe',
      stay:'medium',
      score:84,
      evidence:'high',
      featured:false,
      hours:'режим требует уточнения: справочники расходятся по часам работы в выходные',
      source:'https://yandex.com/maps/org/mitten/206152596083/',
      checkedAt:CATALOG_REVIEW_DATE_20260904,
      desc:'Камерная кофейня на Советской Армии, 7. Актуальные справочники подтверждают Wi‑Fi и возможность работать с ноутбуком; у точки около 12 мест. Яндекс Карты также отмечают возможность зарядить устройство. Наличие розеток у конкретного стола и точный график выходных лучше уточнить перед длительной рабочей сессией.'
    });
  }
}

applyVerifiedCatalogUpdates20260904();
