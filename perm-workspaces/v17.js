const CATALOG_REVIEW_DATE_20260918='2026-09-18';

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

function updateCatalogRevisionStamp20260918(){
  const footer=document.querySelector('footer');
  if(footer)footer.innerHTML=footer.innerHTML.replace(/Последняя базовая ревизия:\s*\d{1,2}\s+[а-яё]+\s+2026\s+г\./i,'Последняя базовая ревизия: 18 сентября 2026 г.');
}

applyVerifiedCatalogUpdates20260918();
deduplicatePermEvents20260918();
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{
    deduplicatePermEvents20260918();
    updateCatalogRevisionStamp20260918();
  },{once:true});
}else{
  updateCatalogRevisionStamp20260918();
}
setTimeout(deduplicatePermEvents20260918,800);
