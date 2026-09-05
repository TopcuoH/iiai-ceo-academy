const CATALOG_REVIEW_DATE_20260905='2026-09-05';

function applyVerifiedCatalogUpdates20260905(){
  if(!places.some(p=>p.id==='perm-monkey-grinder-lenina-58'||(p.name.includes('Monkey Grinder')&&p.address==='улица Ленина, 58'))){
    places.push({
      id:'perm-monkey-grinder-lenina-58',
      name:'Monkey Grinder · Ленина, 58',
      category:'cafe',
      district:'Ленинский',
      address:'улица Ленина, 58',
      phone:'',
      phoneLabel:'',
      priceType:'coffee',
      price:'за заказ в кофейне; чек около 400 ₽ по 2ГИС',
      priceValue:400,
      wifi:'yes',
      power:'maybe',
      stay:'medium',
      score:85,
      evidence:'high',
      featured:false,
      hours:'пн–пт 09:00–00:00; сб–вс 10:00–00:00',
      source:'https://2gis.ru/perm/firm/2252329095109103/tab/info',
      checkedAt:CATALOG_REVIEW_DATE_20260905,
      desc:'Филиал Monkey Grinder в гостинице «Урал». Официальный сайт сети подтверждает точку на Ленина, 58, а 2ГИС для этого филиала прямо указывает возможность работать с ноутбуком, бесплатный Wi‑Fi и до 20 мест. Подходит для короткой и средней рабочей сессии; наличие розеток у конкретных столов требует уточнения.'
    });
  }
}

applyVerifiedCatalogUpdates20260905();
