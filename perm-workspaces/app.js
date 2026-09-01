const CATEGORY={
  coworking:{label:'Коворкинг',icon:'▦'},
  networking:{label:'Нетворкинг',icon:'◎'},
  cafe:{label:'Кафе / за кофе',icon:'☕'},
  library:{label:'Библиотека',icon:'▤'},
  public:{label:'Другой формат',icon:'◇'}
};
const PRICE={
  free:{label:'Бесплатно',className:'freeBadge'},
  coffee:{label:'За кофе',className:'coffeeBadge'},
  paid:{label:'Платно',className:'paidBadge'},
  conditions:{label:'По условиям',className:'conditionsBadge'}
};
const DISTRICT_ORDER=['Ленинский','Свердловский','Мотовилихинский','Индустриальный','Дзержинский','Кировский','Орджоникидзевский','Новые Ляды'];
const EVIDENCE={high:['Проверено','high'],medium:['Частично подтверждено','medium'],low:['Нужно уточнить','low']};
const WIFI={yes:['Wi‑Fi подтверждён','yes'],likely:['Wi‑Fi вероятно есть','likely'],unstable:['Wi‑Fi есть · возможны сбои','likely'],maybe:['Wi‑Fi уточнить','maybe']};
const POWER={yes:['Розетки подтверждены','yes'],likely:['Розетки вероятно есть','likely'],maybe:['Розетки уточнить','maybe']};
const STAY={day:'На рабочий день',medium:'На 2–5 часов',short:'На 1–3 часа'};

const state={category:'all',district:'all',price:'all',toggles:new Set(),query:'',sort:'recommended'};

function safeText(value=''){
  return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function mapUrl(address,name=''){
  return 'https://yandex.ru/maps/?text='+encodeURIComponent(`${name} Пермь ${address}`.trim());
}
function sourceUrl(p){return p.source||mapUrl(p.address,p.name)}
function telUrl(phone=''){return 'tel:'+String(phone).replace(/[^\d+]/g,'')}
function categoryEmoji(cat){return ({coworking:'⌘',networking:'◎',cafe:'☕',library:'▤',public:'◇'})[cat]||'⌁'}
function reliability(p){return EVIDENCE[p.evidence]||EVIDENCE.low}
function photoBlock(p){
  const fallback=`<div class="placeholder"><div class="placeholderIcon">${categoryEmoji(p.category)}</div><b>${safeText(CATEGORY[p.category]?.label||'Место')}</b><small>Реальные фотографии фасада и интерьера доступны в Яндекс Картах</small></div>`;
  const image=p.photo?`<img loading="lazy" referrerpolicy="no-referrer" src="${safeText(p.photo)}" alt="${safeText(p.name)} — фото" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="placeholder" style="display:none"><div class="placeholderIcon">${categoryEmoji(p.category)}</div><b>Фото не загрузилось</b><small>Открой актуальные фотографии этой точки в Яндекс Картах</small></div>`:fallback;
  return `<div class="visual">${image}<div class="visualTop"><span class="districtBadge">${safeText(p.district)}</span>${p.featured?'<span class="choiceBadge">★ выбор</span>':''}</div><a class="photoLink" href="${mapUrl(p.address,p.name)}" target="_blank" rel="noopener">Фото места ↗</a>${p.photoCredit?`<span class="photoCredit">${safeText(p.photoCredit)}</span>`:''}</div>`;
}
function statusBadge(label,status,icon){return `<span class="statusBadge ${status}">${icon}<span>${safeText(label)}</span></span>`}
function card(p){
  const cat=CATEGORY[p.category]||CATEGORY.public;
  const price=PRICE[p.priceType]||PRICE.conditions;
  const wi=WIFI[p.wifi]||WIFI.maybe;
  const po=POWER[p.power]||POWER.maybe;
  const ev=reliability(p);
  const phone=p.phone?`<a class="action phoneAction" href="${telUrl(p.phone)}">☎ ${safeText(p.phoneLabel||p.phone)}</a>`:`<a class="action subtleAction" target="_blank" rel="noopener" href="${mapUrl(p.address,p.name)}">☎ Телефон в карточке места</a>`;
  return `<article class="card" id="${safeText(p.id)}">
    ${photoBlock(p)}
    <div class="content">
      <div class="cardMeta"><span class="categoryTag">${cat.icon} ${cat.label}</span><span class="evidence ${ev[1]}"><i></i>${ev[0]}</span></div>
      <h2 class="name">${safeText(p.name)}</h2>
      <div class="badges">
        <span class="priceBadge ${price.className}">${price.label}</span>
        ${statusBadge(wi[0],wi[1],'📶')}
        ${statusBadge(po[0],po[1],'🔌')}
        <span class="statusBadge neutral">⌚ <span>${safeText(STAY[p.stay]||p.stay)}</span></span>
      </div>
      <p class="desc">${safeText(p.desc)}</p>
      <div class="facts">
        <div class="fact priceFact"><span>Стоимость</span><b>${safeText(p.price)}</b></div>
        <div class="fact"><span>Район</span><b>${safeText(p.district)}</b></div>
        ${p.hours?`<div class="fact"><span>Режим</span><b>${safeText(p.hours)}</b></div>`:''}
      </div>
      <a class="placeAddress" target="_blank" rel="noopener" href="${mapUrl(p.address,p.name)}"><span class="placeIcon">⌖</span><span><small>Адрес · открыть в Яндекс Картах</small><b>${safeText(p.address)}</b></span><em>↗</em></a>
      <div class="links">
        <a class="action primary" target="_blank" rel="noopener" href="${mapUrl(p.address,p.name)}">⌖ Яндекс Карты и фото</a>
        ${phone}
        <a class="action sourceAction" target="_blank" rel="noopener" href="${sourceUrl(p)}">Источник ↗</a>
      </div>
    </div>
  </article>`;
}

function counts(){
  document.getElementById('totalCount').textContent=places.length;
  document.getElementById('freeCount').textContent=places.filter(p=>p.priceType==='free'||p.priceType==='conditions').length;
  document.getElementById('coffeeCount').textContent=places.filter(p=>p.category==='cafe').length;
  document.getElementById('libraryCount').textContent=places.filter(p=>p.category==='library').length;
  document.getElementById('districtCount').textContent=new Set(places.map(p=>p.district)).size;
  ['all','coworking','networking','cafe','library','public'].forEach(c=>{
    const el=document.getElementById('tab-'+c); if(!el)return;
    el.textContent=c==='all'?places.length:places.filter(p=>p.category===c).length;
  });
}
function buildDistricts(){
  const root=document.getElementById('districtChips');
  const present=new Set(places.map(p=>p.district));
  const districts=DISTRICT_ORDER.filter(d=>present.has(d));
  root.innerHTML=`<button class="chip active" data-district="all">Все районы</button>`+districts.map(d=>`<button class="chip" data-district="${safeText(d)}">${safeText(d)} <span>${places.filter(p=>p.district===d).length}</span></button>`).join('');
  root.querySelectorAll('[data-district]').forEach(b=>b.addEventListener('click',()=>{
    root.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.district=b.dataset.district;render();
  }));
}
function matches(p){
  if(state.category!=='all'&&p.category!==state.category)return false;
  if(state.district!=='all'&&p.district!==state.district)return false;
  if(state.price!=='all'&&p.priceType!==state.price)return false;
  if(state.toggles.has('wifi')&&p.wifi!=='yes')return false;
  if(state.toggles.has('power')&&p.power!=='yes')return false;
  if(state.toggles.has('day')&&p.stay!=='day')return false;
  if(state.toggles.has('budget')&&!(p.priceValue<=300))return false;
  if(state.query){
    const hay=[p.name,p.address,p.district,p.desc,CATEGORY[p.category]?.label,p.price].join(' ').toLowerCase();
    if(!hay.includes(state.query))return false;
  }
  return true;
}
function sortItems(items){
  const copy=[...items];
  if(state.sort==='price')return copy.sort((a,b)=>(a.priceValue??9999)-(b.priceValue??9999)||(b.score||0)-(a.score||0));
  if(state.sort==='district')return copy.sort((a,b)=>DISTRICT_ORDER.indexOf(a.district)-DISTRICT_ORDER.indexOf(b.district)|| (b.score||0)-(a.score||0));
  if(state.sort==='name')return copy.sort((a,b)=>a.name.localeCompare(b.name,'ru'));
  return copy.sort((a,b)=>(b.score||0)-(a.score||0)||a.name.localeCompare(b.name,'ru'));
}
function render(){
  const list=document.getElementById('list');
  const empty=document.getElementById('empty');
  const items=sortItems(places.filter(matches));
  document.getElementById('shownCount').textContent=items.length;
  if(!items.length){list.innerHTML='';empty.style.display='flex';return}
  empty.style.display='none';
  if(state.sort==='district'){
    let last='';let html='';
    items.forEach(p=>{if(p.district!==last){last=p.district;html+=`<div class="districtGroup"><span>${safeText(last)}</span><b>${items.filter(x=>x.district===last).length} мест</b></div>`}html+=card(p)});
    list.innerHTML=html;
  }else list.innerHTML=items.map(card).join('');
}
function resetFilters(){
  state.category='all';state.district='all';state.price='all';state.toggles.clear();state.query='';state.sort='recommended';
  document.querySelectorAll('#categoryTabs .tab').forEach((b,i)=>b.classList.toggle('active',i===0));
  document.querySelectorAll('#districtChips .chip').forEach(b=>b.classList.toggle('active',b.dataset.district==='all'));
  document.querySelectorAll('#priceChips .chip').forEach(b=>b.classList.toggle('active',b.dataset.price==='all'));
  document.querySelectorAll('.chip.toggle').forEach(b=>b.classList.remove('active'));
  document.getElementById('search').value='';document.getElementById('sort').value='recommended';render();
}

document.addEventListener('DOMContentLoaded',()=>{
  counts();buildDistricts();
  document.querySelectorAll('#categoryTabs .tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#categoryTabs .tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.category=b.dataset.category;render()}));
  document.querySelectorAll('#priceChips .chip').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#priceChips .chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.price=b.dataset.price;render()}));
  document.querySelectorAll('.chip.toggle').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.toggle;b.classList.toggle('active');b.classList.contains('active')?state.toggles.add(key):state.toggles.delete(key);render()}));
  document.getElementById('search').addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();render()});
  document.getElementById('sort').addEventListener('change',e=>{state.sort=e.target.value;render()});
  document.getElementById('reset').addEventListener('click',resetFilters);
  render();
});
