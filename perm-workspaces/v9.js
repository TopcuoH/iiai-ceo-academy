const CATALOG_REVIEW_DATE_20260908='2026-09-08';

function applyVerifiedCatalogUpdates20260908(){
  const pey=places.find(p=>p.name==='Пей & Печатай');
  if(pey){
    pey.checkedAt=CATALOG_REVIEW_DATE_20260908;
    pey.phone='+79125928106';
    pey.phoneLabel='+7 (912) 592-81-06';
    pey.evidence='high';
    pey.source='https://yandex.com/maps/org/pey_pechatay/99670619815/';
    pey.desc='Кофейня-коворкинг на Петропавловской, 37, ориентированная на удалённую работу. Актуальная карточка Яндекс Карт подтверждает действующую точку, Wi‑Fi, формат коворкинга и возможность работать в спокойной обстановке; розетки ранее подтверждены для рабочего формата пространства.';
  }

  const morion=places.find(p=>p.name==='Morion Digital · «Горизонт событий»');
  if(morion){
    morion.checkedAt=CATALOG_REVIEW_DATE_20260908;
    morion.address='шоссе Космонавтов, 111Д, корпус 10';
    morion.phone='+73422072030';
    morion.phoneLabel='+7 (342) 207-20-30';
    morion.hours='пн–пт 09:00–18:00; доступ по договору аренды может отличаться';
    morion.priceType='paid';
    morion.price='7 598,70 ₽/мес за рабочее место; переговорная 206,03 ₽/час';
    morion.priceValue=7599;
    morion.evidence='high';
    morion.source='https://morion.digital/service/coworking/';
    morion.desc='Полноценный технологический коворкинг в 10-м корпусе Morion Digital: оборудованное рабочее место в среде ИТ-компаний, переговорная и офисная инфраструктура. Официальный тариф действует с 1 июня 2026 года; ранее указанную в каталоге неподтверждённую дневную цену 500 ₽ убрали.';
  }

  const psu=places.find(p=>p.name==='Точка кипения ПГНИУ');
  if(psu){
    psu.checkedAt=CATALOG_REVIEW_DATE_20260908;
    psu.phone='+73422980647';
    psu.phoneLabel='+7 (342) 298-06-47';
    psu.hours='пн–пт 09:00–18:00; вс выходной';
    psu.evidence='high';
    psu.source='https://leader-id.ru/places/6932';
    psu.desc='Университетская «Точка кипения» для работы, встреч и мероприятий. Leader‑ID подтверждает адрес, телефон и режим; для посещения нужны регистрация в Leader‑ID, документ, удостоверяющий личность, и сменная обувь. Wi‑Fi и доступность розетки у конкретного рабочего места лучше уточнить на площадке.';
  }
}

applyVerifiedCatalogUpdates20260908();
