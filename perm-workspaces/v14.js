const CATALOG_REVIEW_DATE_20260913='2026-09-13';

function applyVerifiedCatalogUpdates20260913(){
  const boilingPerm=places.find(p=>p.name==='Точка кипения — Пермь');
  if(boilingPerm){
    boilingPerm.checkedAt=CATALOG_REVIEW_DATE_20260913;
    boilingPerm.address='Советская улица, 1Б';
    boilingPerm.phone='+79082548355';
    boilingPerm.phoneLabel='+7 (908) 254-83-55';
    boilingPerm.hours='пн–пт 10:00–19:00; сб–вс выходной';
    boilingPerm.evidence='high';
    boilingPerm.source='https://leader-id.ru/places/1201';
  }

  const les=places.find(p=>p.name==='Антикафе «Лес»');
  if(les){
    les.checkedAt=CATALOG_REVIEW_DATE_20260913;
    les.address='Советская улица, 51А/1';
    les.phone='+79027920213';
    les.phoneLabel='+7 (902) 792-02-13';
    les.hours='ежедневно 13:00–23:00';
    les.wifi='yes';
    les.evidence='high';
    les.payment='наличные / банковская карта / QR-код';
    les.source='https://permlive.ru/menu/places/forest_anticafe/';
    les.desc='Антикафе и коворкинг для индивидуальной работы, встреч и небольших команд. Актуальные публикации пространства и подтверждённая владельцем карточка Яндекс Карт указывают адрес Советская, 51А/1, телефон, Wi‑Fi и режим 13:00–23:00. Оплата доступна наличными, банковской картой и по QR-коду; текущий тариф за время перед визитом лучше уточнить.';
  }
}

applyVerifiedCatalogUpdates20260913();
