const labels={
  wifi:{yes:['📶 Wi‑Fi подтверждён','yes'],unstable:['📶 Wi‑Fi есть, возможны сбои','maybe'],maybe:['📶 Wi‑Fi — уточнить','maybe']},
  power:{yes:['🔌 Розетка подтверждена','yes'],maybe:['🔌 Розетка — уточнить','maybe']}
};
const ORIGIN='Пермь, улица Яблочкова, 3';
function mapUrl(address){return 'https://yandex.ru/maps/?text='+encodeURIComponent('Пермь, '+address)}
function routeUrl(address){return 'https://yandex.ru/maps/?rtext='+encodeURIComponent(ORIGIN)+'~'+encodeURIComponent('Пермь, '+address)+'&rtt=auto'}
function safeText(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function card(p,i){
  const w=labels.wifi[p.wifi]||labels.wifi.maybe, pw=labels.power[p.power]||labels.power.maybe;
  const photo=p.photo?`<img loading="lazy" referrerpolicy="no-referrer" src="${p.photo}" alt="${safeText(p.name)} — фото пространства" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="placeholder" style="display:none"><div class="cam">⌁</div><b>Фото не загрузилось</b><small>Открой актуальные фотографии места в Яндекс Картах</small></div>`:`<div class="placeholder"><div class="cam">⌁</div><b>Фото места</b><small>Открой Яндекс Карты — там можно посмотреть фасад, вход и интерьер</small></div>`;
  return `<article class="card" data-confirmed="${p.wifi==='yes'&&p.power==='yes'}" data-budget="${p.budget}" data-free="${p.free}" data-uncertain="${p.uncertain||p.wifi==='maybe'||p.power==='maybe'}" data-search="${safeText((p.name+' '+p.address).toLowerCase())}">
    <div class="visual">${photo}<div class="distance">${p.distance.toFixed(1)} км</div><a class="photoLink" href="${mapUrl(p.address)}" target="_blank" rel="noopener">Фото и карта ↗</a></div>
    <div class="content">
      <div class="topline"><div><div class="rank">${String(i+1).padStart(2,'0')} · ПО УДАЛЁННОСТИ</div><h2 class="name">${safeText(p.name)}</h2><div class="type">${safeText(p.type)}</div></div>${p.best?'<div class="best">★ ВЫБОР</div>':''}</div>
      <div class="badges"><span class="badge ${w[1]}">${w[0]}</span><span class="badge ${pw[1]}">${pw[0]}</span><span class="badge ${p.budget?'yes':'no'}">💳 ${p.budget?'до 300 ₽ возможно':'выше 300 ₽'}</span>${p.free?'<span class="badge yes">🆓 0 ₽ / условно</span>':''}</div>
      <p class="desc">${safeText(p.desc)}</p>
      <div class="facts"><div class="fact"><span>Стоимость</span><b>${safeText(p.price)}</b></div><div class="fact"><span>Сколько удобно работать</span><b>${safeText(p.stay)}</b></div></div>
      <div class="placeAddress"><span class="placeIcon">⌖</span><div><small>Адрес</small><a target="_blank" rel="noopener" href="${mapUrl(p.address)}">${safeText(p.address)}</a></div></div>
      <div class="links">
        <a class="action primary" target="_blank" rel="noopener" href="${routeUrl(p.address)}"><span>➜</span> Маршрут от Яблочкова, 3</a>
        <a class="action mapAction" target="_blank" rel="noopener" href="${mapUrl(p.address)}"><span>⌖</span> Яндекс Карты</a>
        <a class="action phoneAction" href="tel:${p.phone}"><span>☎</span> ${safeText(p.phoneLabel)}</a>
      </div>
      <div class="source">Источник/проверка: <a target="_blank" rel="noopener" href="${p.source}">открыть ↗</a>${p.photoCredit?' · '+safeText(p.photoCredit):''}</div>
    </div>
  </article>`;
}
const list=document.getElementById('list'), empty=document.getElementById('empty'), search=document.getElementById('search');
list.innerHTML=places.map(card).join('');
document.getElementById('activeCount').textContent=places.length;
document.getElementById('confirmedCount').textContent=places.filter(p=>p.wifi==='yes'&&p.power==='yes').length;
document.getElementById('budgetCount').textContent=places.filter(p=>p.budget).length;
let current='all';
function apply(){
  const q=search.value.trim().toLowerCase(); let shown=0;
  document.querySelectorAll('.card').forEach(c=>{
    let ok=current==='all'||c.dataset[current]==='true';
    if(q&&!c.dataset.search.includes(q))ok=false;
    c.style.display=ok?'grid':'none';
    if(ok)shown++;
  });
  empty.style.display=shown?'none':'block';
}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');current=b.dataset.filter;apply();
}));
search.addEventListener('input',apply);
