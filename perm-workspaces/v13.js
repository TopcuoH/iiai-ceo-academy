const CATALOG_REVIEW_DATE_20260912='2026-09-12';

function applyVerifiedCatalogUpdates20260912(){
  const psychea=places.find(p=>p.name==='Психея');
  if(psychea){
    psychea.checkedAt=CATALOG_REVIEW_DATE_20260912;
    psychea.district='Мотовилихинский';
    psychea.address='бульвар Гагарина, 70Б, 3 этаж, офис 302';
    psychea.phone='+79080406498';
    psychea.phoneLabel='+7 (908) 040-64-98';
    psychea.evidence='high';
    psychea.priceType='paid';
    psychea.price='400–550 ₽/час; 3 000–5 000 ₽/день в зависимости от кабинета';
    psychea.priceValue=400;
    psychea.wifi='maybe';
    psychea.power='likely';
    psychea.stay='day';
    psychea.hours='ежедневно 08:00–23:00';
    psychea.payment='наличные / перевод с карты';
    psychea.source='https://www.kabinetperm.ru/';
    psychea.desc='Центр практик с четырьмя кабинетами для психологов, коучей, репетиторов, логопедов, блогеров и других специалистов. Официальный сайт подтверждает почасовую и дневную аренду, вместимость кабинетов от 3 до 30 человек, зону отдыха, кухню, отсутствие пропускной системы и бесплатную парковку. Wi‑Fi отдельно не подтверждён, поэтому этот параметр оставлен на уточнение.';
  }
}

applyVerifiedCatalogUpdates20260912();
