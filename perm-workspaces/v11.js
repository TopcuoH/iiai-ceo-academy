const CATALOG_REVIEW_DATE_20260910='2026-09-10';

function applyVerifiedCatalogUpdates20260910(){
  const technopark=places.find(p=>p.name==='Технопарк Пермь');
  if(technopark){
    technopark.checkedAt=CATALOG_REVIEW_DATE_20260910;
    technopark.evidence='low';
    technopark.score=Math.min(technopark.score||50,35);
    technopark.featured=false;
    technopark.priceType='conditions';
    technopark.price='Требует уточнения — публичный коворкинг по этому адресу не подтверждён';
    technopark.priceValue=9999;
    technopark.wifi='maybe';
    technopark.power='maybe';
    technopark.stay='medium';
    technopark.hours='Статус и режим требуют повторного подтверждения';
    technopark.source='https://perm.rbc.ru/perm/freenews/63bfe5b99a7947fb25bc5e8b';
    technopark.desc='Статус требует уточнения. РБК сообщал об окончательном прекращении работы прежнего технопарка на Стахановской, 54П ещё в 2023 году; в 2026 году юридический адрес ООО «Технопарк Пермь» изменён, а официальный сайт недоступен. При этом отдельные справочники всё ещё показывают старую площадку как действующую. Поэтому публичный коворкинг, тарифы, Wi‑Fi и режим не выдаются за подтверждённые; перед поездкой нужна дополнительная проверка.';
  }
}

applyVerifiedCatalogUpdates20260910();
