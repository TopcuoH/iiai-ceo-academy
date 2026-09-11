const CATALOG_REVIEW_DATE_20260911='2026-09-11';

function applyVerifiedCatalogUpdates20260911(){
  const les=places.find(p=>p.name==='Антикафе «Лес»');
  if(les){
    les.checkedAt=CATALOG_REVIEW_DATE_20260911;
    les.district='Ленинский';
    les.address='Советская улица, 51А/1';
    les.phone='+79027920213';
    les.phoneLabel='+7 (902) 792-02-13';
    les.evidence='high';
    les.wifi='yes';
    les.power='maybe';
    les.hours='ежедневно 13:00–23:00';
    les.priceType='paid';
    les.price='Тариф за время и аренду уточнить у пространства';
    les.priceValue=9999;
    les.stay='medium';
    les.source='https://permlive.ru/menu/places/forest_anticafe/';
    les.desc='Антикафе и коворкинг для индивидуальной работы, встреч и небольших команд. В 2026 году «Лес» переехал с улицы Газеты Звезда на Советскую, 51А/1. Новый адрес, телефон, Wi‑Fi и режим 13:00–23:00 подтверждаются свежей карточкой места и актуальными публикациями пространства; тариф перед визитом лучше уточнить.';
  }

  const random=places.find(p=>p.name==='Антикафе «Рандом»');
  if(random){
    random.checkedAt=CATALOG_REVIEW_DATE_20260911;
    random.address='улица Луначарского, 3А';
    random.phone='+79223779055';
    random.phoneLabel='+7 (922) 377-90-55';
    random.evidence='high';
    random.wifi='yes';
    random.power='maybe';
    random.hours='пн–чт, вс 12:00–23:00; пт–сб закрытие позднее — точное время уточнить';
    random.priceType='paid';
    random.price='минимум около 140 ₽; безлимит около 500 ₽ — актуальный тариф уточнить';
    random.priceValue=140;
    random.source='https://anticafe-random.orgs.biz/';
    random.desc='Действующее антикафе и пространство для работы на Луначарского, 3А. Актуальные источники подтверждают Wi‑Fi, возможность работать с ноутбуком, дневной формат и два контактных номера; вечерний режим пятницы и субботы в справочниках расходится, поэтому время закрытия лучше уточнить перед визитом.';
  }
}

applyVerifiedCatalogUpdates20260911();
