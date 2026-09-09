const CATALOG_REVIEW_DATE_20260909='2026-09-09';

function applyVerifiedCatalogUpdates20260909(){
  const boilingPerm=places.find(p=>p.name==='Точка кипения — Пермь');
  if(boilingPerm){
    boilingPerm.checkedAt=CATALOG_REVIEW_DATE_20260909;
    boilingPerm.address='Советская улица, 1Б';
    boilingPerm.phone='+79082548355';
    boilingPerm.phoneLabel='+7 (908) 254-83-55';
    boilingPerm.hours='пн–пт 10:00–19:00; сб–вс выходной';
    boilingPerm.priceType='free';
    boilingPerm.price='0 ₽; доступ и конкретный формат визита лучше проверить/зарегистрировать через Leader‑ID';
    boilingPerm.evidence='high';
    boilingPerm.source='https://leader-id.ru/places/1201';
    boilingPerm.desc='Городская «Точка кипения» с коворкингом, переговорной и залами для командной работы, встреч и предпринимательских событий. Leader‑ID подтверждает адрес, телефон и режим: пн–пт 10:00–19:00, выходные закрыто. Условия самостоятельного визита и доступность конкретного рабочего места лучше проверить перед поездкой.';
  }
}

applyVerifiedCatalogUpdates20260909();
