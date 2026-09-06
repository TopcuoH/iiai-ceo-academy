const CATALOG_REVIEW_DATE_20260906='2026-09-06';

function applyVerifiedCatalogUpdates20260906(){
  const pey=places.find(p=>p.name==='Пей & Печатай');
  if(pey){
    pey.checkedAt=CATALOG_REVIEW_DATE_20260906;
    pey.phone='+79125928106';
    pey.phoneLabel='+7 (912) 592-81-06';
    pey.source='https://yandex.com/maps/org/pey_pechatay/99670619815/';
  }

  const morion=places.find(p=>p.name==='Morion Digital · «Горизонт событий»');
  if(morion){
    morion.checkedAt=CATALOG_REVIEW_DATE_20260906;
    morion.address='шоссе Космонавтов, 111Д, корпус 10';
    morion.phone='+73422072030';
    morion.phoneLabel='+7 (342) 207-20-30';
    morion.hours='пн–пт 09:00–18:00; доступ по тарифу может быть шире';
    morion.source='https://morion.digital/';
  }
}

applyVerifiedCatalogUpdates20260906();
