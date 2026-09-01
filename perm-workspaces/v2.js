const V2_DEFAULT_CHECKED='2026-09-01';
const v2State={
  view:'list',openNow:false,userPos:null,geoBusy:false,map:null,mapLayer:null,userMarker:null,
  coords:new Map(Object.entries(JSON.parse(localStorage.getItem('permWorkCoords')||'{}'))),
  favorites:new Set(JSON.parse(localStorage.getItem('permWorkFavorites')||'[]')),
  compare:new Set(JSON.parse(localStorage.getItem('permWorkCompare')||'[]')),
  reviews:JSON.parse(localStorage.getItem('permWorkReviews')||'{}'),
  checkins:JSON.parse(localStorage.getItem('permWorkCheckins')||'{}'),
  installPrompt:null
};
const legacyMatches=matches;
matches=function(p){return legacyMatches(p)&&(!v2State.openNow||openStatus(p).open===true)};
const legacySortItems=sortItems;
sortItems=function(items){
  if(state.sort==='distance'&&v2State.userPos){
    return [...items].sort((a,b)=>distanceFor(a)-distanceFor(b)||(b.score||0)-(a.score||0));
  }
  return legacySortItems(items);
};
const legacyRender=render;
render=function(){legacyRender();enhanceCards();updateV2Status();if(v2State.view==='map')refreshMap();};

function saveLocal(){
  localStorage.setItem('permWorkCoords',JSON.stringify(Object.fromEntries(v2State.coords)));
  localStorage.setItem('permWorkFavorites',JSON.stringify([...v2State.favorites]));
  localStorage.setItem('permWorkCompare',JSON.stringify([...v2State.compare]));
  localStorage.setItem('permWorkReviews',JSON.stringify(v2State.reviews));
  localStorage.setItem('permWorkCheckins',JSON.stringify(v2State.checkins));
}
function placeById(id){return places.find(p=>p.id===id)}
function fmtDate(d){return new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short'}).format(d)}
function permNow(){
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Yekaterinburg',weekday:'short',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
  return {weekday:parts.weekday,hour:+parts.hour,minute:+parts.minute,date:`${parts.year}-${parts.month}-${parts.day}`};
}
function openStatus(p){
  const raw=String(p.hours||'').toLowerCase();
  if(!raw)return {known:false,label:'Режим не подтверждён'};
  if(raw.includes('круглосуточ'))return {known:true,open:true,label:'Открыто сейчас'};
  const now=permNow(),mins=now.hour*60+now.minute;
  const day=now.weekday;
  if(/пн\s*[–—-]\s*пт/.test(raw)&&['Sat','Sun'].includes(day))return {known:true,open:false,label:'Сейчас закрыто'};
  if(/пн\s*[–—-]\s*сб/.test(raw)&&day==='Sun')return {known:true,open:false,label:'Сейчас закрыто'};
  if(/сб\s*,?\s*вс\s*[:-]?\s*выход/.test(raw)&&['Sat','Sun'].includes(day))return {known:true,open:false,label:'Сейчас закрыто'};
  const ranges=[...raw.matchAll(/(\d{1,2})[:.]([0-5]\d)\s*[–—-]\s*(\d{1,2})[:.]([0-5]\d)/g)];
  if(!ranges.length)return {known:false,label:'Время уточнить'};
  const [m]=ranges;let start=(+m[1])*60+(+m[2]),end=(+m[3])*60+(+m[4]);if(end<start)end+=1440;let current=mins;if(current<start&&end>1440)current+=1440;
  const open=current>=start&&current<=end;return {known:true,open,label:open?'Открыто сейчас':'Сейчас закрыто'};
}
function freshness(p){
  const checked=new Date((p.checkedAt||V2_DEFAULT_CHECKED)+'T00:00:00+05:00');
  const days=Math.max(0,Math.floor((Date.now()-checked.getTime())/86400000));
  if(days<=7)return {className:'fresh',label:days===0?'Проверено сегодня':`Проверено ${days} дн. назад`};
  if(days<=45)return {className:'aging',label:`Проверено ${days} дн. назад`};
  return {className:'',label:`Данные старше ${days} дн.`};
}
function coordFor(p){return v2State.coords.get(p.id)||null}
function haversine(a,b){const R=6371,toRad=x=>x*Math.PI/180,dLat=toRad(b.lat-a.lat),dLon=toRad(b.lon-a.lon),la1=toRad(a.lat),la2=toRad(b.lat);const q=Math.sin(dLat/2)**2+Math.sin(dLon/2)**2*Math.cos(la1)*Math.cos(la2);return 2*R*Math.asin(Math.sqrt(q))}
function distanceFor(p){const c=coordFor(p);return c&&v2State.userPos?haversine(v2State.userPos,c):99999}
function reviewSummary(p){const arr=v2State.reviews[p.id]||[];if(!arr.length)return '';const avg=arr.reduce((s,r)=>s+(+r.rating||0),0)/arr.length;return `<div class="communityScore"><b>★ ${avg.toFixed(1)}</b><span>${arr.length} отзыв(а) на этом устройстве</span></div>`}
function enhanceCards(){
  document.querySelectorAll('.card').forEach(el=>{
    const p=placeById(el.id);if(!p||el.dataset.v2==='1')return;el.dataset.v2='1';
    const content=el.querySelector('.content');if(!content)return;
    const fr=freshness(p),os=openStatus(p),dist=distanceFor(p);
    const fresh=document.createElement('div');fresh.className=`freshness ${fr.className}`;fresh.innerHTML=`${safeText(fr.label)}${os.known?` · ${safeText(os.label)}`:''}${dist<9999?`<span class="distanceUser">${dist.toFixed(1)} км от вас</span>`:''}`;
    const meta=content.querySelector('.cardMeta');meta?.insertAdjacentElement('afterend',fresh);
    const galleryCount=(p.gallery?.length||0)+(p.photo?1:0);
    const row=document.createElement('div');row.className='communityRow';
    row.innerHTML=`
      <button class="miniAction favBtn ${v2State.favorites.has(p.id)?'active':''}" data-place="${safeText(p.id)}">${v2State.favorites.has(p.id)?'♥':'♡'} Избранное</button>
      <button class="miniAction compareBtn ${v2State.compare.has(p.id)?'active':''}" data-place="${safeText(p.id)}">⇄ Сравнить</button>
      <button class="miniAction galleryBtn" data-place="${safeText(p.id)}">▦ Галерея${galleryCount?` · ${galleryCount}`:''}</button>
      <button class="miniAction reviewBtn" data-place="${safeText(p.id)}">★ Отзыв</button>
      <button class="miniAction checkinBtn" data-place="${safeText(p.id)}">✓ Я здесь</button>
      <button class="miniAction reportBtn" data-place="${safeText(p.id)}">! Исправить</button>`;
    content.appendChild(row);content.insertAdjacentHTML('beforeend',reviewSummary(p));
  });
  updateCompareTray();
}
function filteredPlaces(){return sortItems(places.filter(matches))}
function updateV2Status(){
  const openBtn=document.getElementById('openNowBtn');if(openBtn){const count=places.filter(p=>legacyMatches(p)&&openStatus(p).open===true).length;openBtn.innerHTML=`● Открыто сейчас <span>${count}</span>`;openBtn.classList.toggle('active',v2State.openNow)}
  const status=document.getElementById('geoStatus');if(status&&v2State.userPos)status.innerHTML=`<strong>Геолокация включена.</strong> Точные расстояния появляются по мере загрузки координат.`;
}
function issueUrl(title,body){return `https://github.com/TopcuoH/iiai-ceo-academy/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`}
function openModal(title,body){const overlay=document.getElementById('v2Overlay');overlay.querySelector('.modalHead h3').textContent=title;overlay.querySelector('.modalBody').innerHTML=body;overlay.classList.add('active');document.body.style.overflow='hidden'}
function closeModal(){document.getElementById('v2Overlay')?.classList.remove('active');document.body.style.overflow=''}
function showGallery(p){
  const imgs=[...(p.gallery||[])];if(p.photo&&!imgs.includes(p.photo))imgs.unshift(p.photo);
  const content=imgs.length?`<div class="gallery">${imgs.map(src=>`<a class="galleryItem" target="_blank" rel="noopener" href="${src}"><img src="${src}" alt="${safeText(p.name)}" loading="lazy" onerror="this.parentElement.style.display='none'"></a>`).join('')}</div>`:`<div class="galleryFallback"><b>Прямых фото в базе пока нет</b><p>Открой Яндекс Карты — там доступны актуальные фотографии фасада, входа и интерьера.</p></div>`;
  openModal(`Галерея · ${p.name}`,`${content}<div class="modalActions"><a target="_blank" rel="noopener" href="${mapUrl(p.address,p.name)}">Все фото в Яндекс Картах ↗</a></div>`);
}
function showReview(p){
  openModal(`Отзыв · ${p.name}`,`<div class="formGrid">
    <div class="field"><label>Оценка</label><select id="reviewRating"><option value="5">5 — отлично</option><option value="4">4 — хорошо</option><option value="3">3 — нормально</option><option value="2">2 — плохо</option><option value="1">1 — очень плохо</option></select></div>
    <div class="field"><label>Сколько работали</label><select id="reviewStay"><option>1–2 часа</option><option>3–5 часов</option><option>6+ часов</option></select></div>
    <div class="field full"><label>Что важно другим</label><textarea id="reviewText" placeholder="Например: Zoom проходит нормально, розетки у окна, после 18:00 шумно…"></textarea></div>
  </div><div class="modalActions"><button class="submit" id="saveReview">Сохранить и отправить на модерацию</button></div>`);
  document.getElementById('saveReview').onclick=()=>{
    const r={rating:+document.getElementById('reviewRating').value,stay:document.getElementById('reviewStay').value,text:document.getElementById('reviewText').value.trim(),date:new Date().toISOString()};
    (v2State.reviews[p.id]||(v2State.reviews[p.id]=[])).push(r);saveLocal();
    const body=`Место: ${p.name}\nАдрес: ${p.address}\nОценка: ${r.rating}/5\nРаботал(а): ${r.stay}\nКомментарий: ${r.text||'—'}\nДата: ${new Date().toLocaleDateString('ru-RU')}`;
    window.open(issueUrl(`Отзыв Perm Work: ${p.name}`,body),'_blank');closeModal();render();
  };
}
function showCheckin(p){
  openModal(`Я здесь · ${p.name}`,`<p class="desc">Подтверди состояние места прямо сейчас. После сохранения откроется готовая заявка для общей базы.</p><div class="formChecks">
    <label class="checkPill"><input id="ciOpen" type="checkbox" checked> Место открыто</label>
    <label class="checkPill"><input id="ciWifi" type="checkbox"> Wi‑Fi работает</label>
    <label class="checkPill"><input id="ciPower" type="checkbox"> Розетка доступна</label>
  </div><div class="field full" style="margin-top:12px"><label>Комментарий</label><textarea id="ciText" placeholder="Свободные места, шум, скорость Wi‑Fi, где розетки…"></textarea></div><div class="modalActions"><button class="submit" id="saveCheckin">Подтвердить</button></div>`);
  document.getElementById('saveCheckin').onclick=()=>{
    const c={open:ciOpen.checked,wifi:ciWifi.checked,power:ciPower.checked,text:ciText.value.trim(),date:new Date().toISOString()};v2State.checkins[p.id]=c;saveLocal();
    const body=`Место: ${p.name}\nАдрес: ${p.address}\nОткрыто: ${c.open?'да':'нет'}\nWi‑Fi работает: ${c.wifi?'да':'не подтверждаю'}\nРозетка доступна: ${c.power?'да':'не подтверждаю'}\nКомментарий: ${c.text||'—'}\nПроверено пользователем: ${new Date().toLocaleString('ru-RU')}`;
    window.open(issueUrl(`Полевое подтверждение: ${p.name}`,body),'_blank');closeModal();
  };
}
function showReport(p){
  openModal(`Сообщить об изменении · ${p.name}`,`<div class="formGrid"><div class="field"><label>Что изменилось</label><select id="reportType"><option>Закрылось</option><option>Новый тариф</option><option>Wi‑Fi не работает</option><option>Нет розеток</option><option>Другой режим</option><option>Новый телефон</option><option>Добавить фото</option><option>Другое</option></select></div><div class="field full"><label>Подробности</label><textarea id="reportText" placeholder="Что именно нужно исправить? Можно вставить ссылку на источник."></textarea></div></div><div class="modalActions"><button class="submit" id="sendReport">Отправить исправление</button></div>`);
  document.getElementById('sendReport').onclick=()=>{const type=reportType.value,text=reportText.value.trim();window.open(issueUrl(`Исправление Perm Work: ${p.name}`,`Место: ${p.name}\nАдрес: ${p.address}\nТип изменения: ${type}\nПодробности: ${text||'—'}\nДата: ${new Date().toLocaleDateString('ru-RU')}`),'_blank');closeModal()};
}
function updateCompareTray(){const tray=document.getElementById('compareTray');if(!tray)return;const n=v2State.compare.size;tray.classList.toggle('active',n>0);tray.querySelector('b').textContent=n;}
function showCompare(){
  const selected=[...v2State.compare].map(placeById).filter(Boolean).slice(0,4);if(!selected.length)return;
  const rows=[['Формат',p=>CATEGORY[p.category]?.label||'—'],['Район',p=>p.district],['Цена',p=>p.price],['Wi‑Fi',p=>WIFI[p.wifi]?.[0]||'—'],['Розетки',p=>POWER[p.power]?.[0]||'—'],['Рабочая сессия',p=>STAY[p.stay]||p.stay],['Режим',p=>p.hours||'уточнить'],['Проверка',p=>freshness(p).label],['Карта',p=>`<a target="_blank" href="${mapUrl(p.address,p.name)}">Открыть ↗</a>`]];
  const html=`<div style="overflow:auto"><table class="compareTable"><thead><tr><th>Параметр</th>${selected.map(p=>`<th>${safeText(p.name)}</th>`).join('')}</tr></thead><tbody>${rows.map(([label,fn])=>`<tr><td>${label}</td>${selected.map(p=>`<td>${fn(p)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  openModal('Сравнение мест',html);
}
function toggleFavorite(id){v2State.favorites.has(id)?v2State.favorites.delete(id):v2State.favorites.add(id);saveLocal();render()}
function toggleCompare(id){if(v2State.compare.has(id))v2State.compare.delete(id);else if(v2State.compare.size<4)v2State.compare.add(id);else {openModal('Сравнение',`<p>Можно сравнивать до 4 мест одновременно. Убери одно место из сравнения и добавь новое.</p>`);return}saveLocal();render()}

async function geocodePlace(p){
  if(coordFor(p))return coordFor(p);
  const q=encodeURIComponent(`Пермь, ${p.address}`);
  try{const res=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ru&accept-language=ru&q=${q}`);const data=await res.json();if(data?.[0]){const c={lat:+data[0].lat,lon:+data[0].lon};v2State.coords.set(p.id,c);saveLocal();return c}}catch(e){}
  return null;
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function geocodeBatch(items,limit=24){
  if(v2State.geoBusy)return;v2State.geoBusy=true;const loading=document.getElementById('mapLoading');loading?.classList.remove('hidden');
  const need=items.filter(p=>!coordFor(p)).slice(0,limit);let done=0;
  for(const p of need){await geocodePlace(p);done++;if(loading)loading.textContent=`Загружаю точки ${done}/${need.length}…`;if(v2State.view==='map')drawMapMarkers();if(v2State.userPos)render();await sleep(1050)}
  v2State.geoBusy=false;if(loading)loading.classList.add('hidden');drawMapMarkers();render();
}
function initMap(){
  if(v2State.map||!window.L)return;v2State.map=L.map('workMap',{zoomControl:true}).setView([58.0105,56.2502],12);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(v2State.map);v2State.mapLayer=L.layerGroup().addTo(v2State.map);
}
function markerColor(p){return p.priceType==='free'?'#15855d':p.priceType==='coffee'?'#9a620e':p.priceType==='paid'?'#6558f5':'#77758b'}
function drawMapMarkers(){
  if(!v2State.map)return;v2State.mapLayer.clearLayers();const items=filteredPlaces();let count=0;
  items.forEach(p=>{const c=coordFor(p);if(!c)return;count++;const m=L.circleMarker([c.lat,c.lon],{radius:8,color:'#fff',weight:2,fillColor:markerColor(p),fillOpacity:.95});m.bindPopup(`<div class="mapPopup"><b>${safeText(p.name)}</b><small>${safeText(p.address)} · ${safeText(p.price)}</small><a target="_blank" rel="noopener" href="${mapUrl(p.address,p.name)}">Яндекс Карты ↗</a></div>`);m.addTo(v2State.mapLayer)});
  const mapCount=document.getElementById('mapCount');if(mapCount)mapCount.textContent=`${count} точек на карте из ${items.length}`;
  if(v2State.userPos){if(v2State.userMarker)v2State.userMarker.remove();v2State.userMarker=L.circleMarker([v2State.userPos.lat,v2State.userPos.lon],{radius:9,color:'#6558f5',weight:3,fillColor:'#fff',fillOpacity:1}).bindPopup('Вы здесь').addTo(v2State.map)}
}
function refreshMap(){initMap();setTimeout(()=>v2State.map?.invalidateSize(),50);drawMapMarkers();geocodeBatch(filteredPlaces(),30)}
function setViewMode(mode){v2State.view=mode;document.querySelectorAll('.viewBtn').forEach(b=>b.classList.toggle('active',b.dataset.view===mode));document.getElementById('list').style.display=mode==='list'?'grid':'none';document.getElementById('empty').style.display=mode==='list'?document.getElementById('empty').style.display:'none';document.getElementById('mapPanel').classList.toggle('active',mode==='map');if(mode==='map')refreshMap()}
function locateUser(){
  const btn=document.getElementById('nearBtn'),status=document.getElementById('geoStatus');if(!navigator.geolocation){status.textContent='Геолокация не поддерживается этим браузером.';return}
  status.textContent='Определяю местоположение…';navigator.geolocation.getCurrentPosition(pos=>{v2State.userPos={lat:pos.coords.latitude,lon:pos.coords.longitude};btn.classList.add('active');state.sort='distance';const sel=document.getElementById('sort');if(sel)sel.value='distance';status.innerHTML='<strong>Местоположение найдено.</strong> Загружаю координаты ближайших рабочих мест…';render();geocodeBatch(filteredPlaces(),30);if(v2State.view==='map'){initMap();v2State.map.setView([v2State.userPos.lat,v2State.userPos.lon],13);drawMapMarkers()}},err=>{status.textContent=err.code===1?'Доступ к геолокации запрещён. Разреши его в настройках браузера.':'Не удалось определить местоположение.'},{enableHighAccuracy:true,timeout:12000,maximumAge:300000});
}
function renderEvents(){
  const root=document.getElementById('eventsGrid');if(!root||typeof permEvents==='undefined')return;const today=permNow().date;const upcoming=permEvents.filter(e=>e.date>=today).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,12);
  if(!upcoming.length){root.innerHTML='<div class="eventsEmpty">На ближайшие даты подтверждённых событий в базе нет.</div>';return}
  const months=['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];root.innerHTML=upcoming.map(e=>{const d=new Date(e.date+'T12:00:00+05:00');return `<article class="eventCard ${e.date===today?'today':''}"><div class="eventDate"><b>${d.getDate()}</b><span>${months[d.getMonth()]}</span></div><div class="eventInfo"><div class="eventMeta">${safeText(e.kind)} · ${safeText(e.time)} · ${safeText(e.price)}</div><h3>${safeText(e.title)}</h3><p>${safeText(e.desc)}</p><div class="eventMeta">${safeText(e.venue)}${e.address?` · ${safeText(e.address)}`:''}</div><a target="_blank" rel="noopener" href="${e.url}">Подробнее / регистрация ↗</a></div></article>`}).join('');
}
function renderResources(){const root=document.getElementById('resourcesGrid');if(!root||typeof selfEmployedResources==='undefined')return;root.innerHTML=selfEmployedResources.map(r=>`<a class="resourceCard" target="_blank" rel="noopener" href="${r.url}"><span class="resourceTag">${safeText(r.tag)}</span><h3>${safeText(r.title)}</h3><p>${safeText(r.desc)}</p><small>${safeText(r.address)}</small><em>Открыть ↗</em></a>`).join('')}
function initInstall(){
  const btn=document.getElementById('installBtn');window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();v2State.installPrompt=e;btn?.classList.remove('hidden')});
  btn?.addEventListener('click',async()=>{if(v2State.installPrompt){v2State.installPrompt.prompt();await v2State.installPrompt.userChoice;v2State.installPrompt=null;btn.classList.add('hidden')}else{document.getElementById('pwaHint')?.classList.add('active')}});
  if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
}

document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;const p=b.dataset.place?placeById(b.dataset.place):null;
  if(b.classList.contains('favBtn'))toggleFavorite(b.dataset.place);
  if(b.classList.contains('compareBtn'))toggleCompare(b.dataset.place);
  if(b.classList.contains('galleryBtn')&&p)showGallery(p);
  if(b.classList.contains('reviewBtn')&&p)showReview(p);
  if(b.classList.contains('checkinBtn')&&p)showCheckin(p);
  if(b.classList.contains('reportBtn')&&p)showReport(p);
});

document.addEventListener('DOMContentLoaded',()=>{
  const sort=document.getElementById('sort');if(sort&&!sort.querySelector('option[value="distance"]'))sort.insertAdjacentHTML('beforeend','<option value="distance">Ближе ко мне</option>');
  document.querySelectorAll('.viewBtn').forEach(b=>b.addEventListener('click',()=>setViewMode(b.dataset.view)));
  document.getElementById('nearBtn')?.addEventListener('click',locateUser);
  document.getElementById('openNowBtn')?.addEventListener('click',()=>{v2State.openNow=!v2State.openNow;render()});
  document.getElementById('compareOpen')?.addEventListener('click',showCompare);
  document.getElementById('compareClear')?.addEventListener('click',()=>{v2State.compare.clear();saveLocal();render()});
  document.getElementById('v2Overlay')?.addEventListener('click',e=>{if(e.target.id==='v2Overlay'||e.target.closest('.modalClose'))closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
  document.getElementById('pwaHintClose')?.addEventListener('click',()=>document.getElementById('pwaHint').classList.remove('active'));
  renderEvents();renderResources();initInstall();setViewMode('list');render();
});
