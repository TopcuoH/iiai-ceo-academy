const CATALOG_REVIEW_DATE_20260918='2026-09-18';
const CATALOG_REVIEW_DATE_20260921='2026-09-21';

function applyVerifiedCatalogUpdates20260918(){
  const boilingPerm=places.find(p=>p.name==='Точка кипения — Пермь');
  if(!boilingPerm)return;
  boilingPerm.checkedAt=CATALOG_REVIEW_DATE_20260918;
  boilingPerm.address='Советская улица, 1Б';
  boilingPerm.phone='+79082548355';
  boilingPerm.phoneLabel='+7 (908) 254-83-55';
  boilingPerm.hours='пн–пт 10:00–19:00, сб–вс выходной';
  boilingPerm.evidence='high';
  boilingPerm.source='https://leader-id.ru/places/1201';
}

function applyVerifiedCatalogUpdates20260921(){
  const morion=places.find(p=>p.name==='Morion Digital · «Горизонт событий»');
  if(!morion)return;
  morion.checkedAt=CATALOG_REVIEW_DATE_20260921;
  morion.address='шоссе Космонавтов, 111Д, корпус 10, 2 этаж, подъезд 3';
  morion.phone='+73422072030';
  morion.phoneLabel='+7 (342) 207-20-30';
  morion.priceType='paid';
  morion.price='7 598,70 ₽/мес за рабочее место; переговорная 206,03 ₽/час; лекторий 579,20 ₽/час; офисы 19 925,48–48 631,68 ₽/мес';
  morion.priceValue=7599;
  morion.hours='пн–пт 09:00–18:00; фактический доступ резидентов по договору может отличаться';
  morion.evidence='high';
  morion.source='https://morion.digital/service/coworking/';
  morion.desc='Коворкинг Пермского бизнес-инкубатора в Morion Digital: оборудованные рабочие места, офисы, переговорная, лекторий, индивидуальное хранение, принтер/сканер, кухонная зона и зона отдыха. Официальные тарифы действуют с 1 июня 2026 года; для резидентов бизнес-инкубатора предусмотрена поэтапная льготная ставка 40% / 60% / 80% от рыночной по годам размещения. Наличие свободных мест и режим доступа лучше подтвердить перед визитом.';
}

function deduplicatePermEvents20260918(){
  if(typeof permEvents==='undefined')return;
  const seen=new Set();
  const unique=permEvents.filter(event=>{
    const key=`${event.date||''}|${String(event.title||'').trim().toLowerCase()}`;
    if(seen.has(key))return false;
    seen.add(key);
    return true;
  });
  permEvents.splice(0,permEvents.length,...unique);
}

function updateCatalogRevisionStamp20260921(){
  const footer=document.querySelector('footer');
  if(footer)footer.innerHTML=footer.innerHTML.replace(/Последняя базовая ревизия:\s*\d{1,2}\s+[а-яё]+\s+2026\s+г\./i,'Последняя базовая ревизия: 21 сентября 2026 г.');
}

applyVerifiedCatalogUpdates20260918();
applyVerifiedCatalogUpdates20260921();
deduplicatePermEvents20260918();
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{
    deduplicatePermEvents20260918();
    updateCatalogRevisionStamp20260921();
  },{once:true});
}else{
  updateCatalogRevisionStamp20260921();
}
setTimeout(deduplicatePermEvents20260918,800);
