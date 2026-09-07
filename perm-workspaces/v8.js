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

const CATALOG_REVIEW_DATE_20260907='2026-09-07';

function applyVerifiedCatalogUpdates20260907(){
  const gorky=places.find(p=>p.name==='Пермская краевая библиотека им. А. М. Горького');
  if(gorky){
    gorky.checkedAt=CATALOG_REVIEW_DATE_20260907;
    gorky.phone='+73422362085';
    gorky.phoneLabel='+7 (342) 236-20-85';
    gorky.hours='пн–чт 10:00–21:00; пт–вс 10:00–17:00; последний четверг месяца — санитарный день';
    gorky.evidence='high';
    gorky.source='https://www.gorkilib.ru/';
    gorky.desc='Крупная краевая библиотека с читальными пространствами, подходящими для спокойной длительной работы. Официальный сайт подтверждает актуальный адрес, телефон и расширенный режим до 21:00 по будням; гостевой Wi‑Fi и наличие свободной розетки у конкретного места лучше уточнить на месте.';
  }

  const library30=places.find(p=>p.name==='Библиотека №30');
  if(library30){
    library30.checkedAt=CATALOG_REVIEW_DATE_20260907;
    library30.evidence='high';
    library30.source='https://2gis.ru/perm/firm/2252328094664239/tab/info';
    library30.desc='Обновлённая модельная «Зелёная библиотека» на Докучаева, 28/1. После модернизации в 2026 году здесь появились современные зоны для чтения, учёбы и общения, коворкинг и медиастудия; актуальная карточка 2ГИС подтверждает, что библиотека действует по этому адресу. Wi‑Fi и розетки у конкретного рабочего места лучше уточнить перед длительной сессией.';
  }
}

applyVerifiedCatalogUpdates20260907();
