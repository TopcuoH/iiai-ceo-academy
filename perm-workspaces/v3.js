const PROFILE_KEY='permWorkProfileV3';
const OWNER_DRAFTS_KEY='permWorkOwnerDrafts';
const v3State={
  profile:JSON.parse(localStorage.getItem(PROFILE_KEY)||'null'),
  ownerDrafts:JSON.parse(localStorage.getItem(OWNER_DRAFTS_KEY)||'{}')
};

function clampScore(v){return Math.max(0,Math.min(100,Math.round(v)))}
function numericPrice(p){
  if(Number.isFinite(p.priceValue))return p.priceValue;
  if(p.priceType==='free')return 0;
  const nums=String(p.price||'').match(/\d+/g)?.map(Number)||[];
  return nums.length?Math.min(...nums):9999;
}
function freshnessDays(p){
  const d=new Date((p.checkedAt||V2_DEFAULT_CHECKED)+'T00:00:00+05:00');
  return Math.max(0,Math.floor((Date.now()-d.getTime())/86400000));
}
function workScoreDetails(p){
  const d={internet:0,power:0,cost:0,confidence:0,comfort:0,freshness:0,extras:0};
  d.internet=p.wifi==='yes'?18:(p.wifi==='likely'||p.wifi==='unstable'?10:3);
  d.power=p.power==='yes'?16:(p.power==='likely'?9:3);
  d.cost=p.priceType==='free'?14:p.priceType==='coffee'?11:p.priceType==='conditions'?9:(numericPrice(p)<=300?9:numericPrice(p)<=600?6:3);
  d.confidence=p.evidence==='high'?18:p.evidence==='medium'?11:5;
  d.comfort=p.stay==='day'?14:p.stay==='medium'?9:5;
  const days=freshnessDays(p);d.freshness=days<=7?10:days<=30?7:days<=60?4:2;
  if(p.hours)d.extras+=3;
  if(p.photo||(p.gallery&&p.gallery.length))d.extras+=3;
  const check=v2State.checkins?.[p.id];if(check){d.extras+=check.wifi?1:0;d.extras+=check.power?1:0;}
  const reviews=v2State.reviews?.[p.id]||[];if(reviews.length){const avg=reviews.reduce((s,r)=>s+(+r.rating||0),0)/reviews.length;d.extras+=Math.max(0,Math.min(3,(avg-2)));}
  return {...d,total:clampScore(Object.values(d).reduce((a,b)=>a+b,0))};
}
function workScore(p){return workScoreDetails(p).total}
function profileActive(){return !!(v3State.profile&&v3State.profile.enabled!==false)}
function personalScore(p){
  let s=workScore(p);const pr=v3State.profile;if(!pr||pr.enabled===false)return s;
  if(pr.mustWifi)s+=p.wifi==='yes'?7:(p.wifi==='likely'?1:-18);
  if(pr.mustPower)s+=p.power==='yes'?7:(p.power==='likely'?1:-18);
  if(pr.allDay)s+=p.stay==='day'?8:p.stay==='medium'?1:-8;
  const max=+pr.budget||0;if(max>0)s+=numericPrice(p)<=max?7:-12;
  if(pr.district&&pr.district!=='all')s+=p.district===pr.district?7:-1;
  switch(pr.mode){
    case 'focus': s+=p.category==='library'?9:p.category==='coworking'?6:p.category==='cafe'?-2:1;break;
    case 'calls': s+=p.category==='coworking'?8:p.category==='public'?5:p.category==='library'?-10:1;break;
    case 'meetings': s+=['coworking','networking','cafe'].includes(p.category)?7:-3;break;
    case 'cheap': s+=p.priceType==='free'?11:p.priceType==='coffee'?6:numericPrice(p)<=300?3:-6;break;
    case 'networking': s+=p.category==='networking'?13:p.category==='coworking'?5:-2;break;
    case 'day': s+=p.stay==='day'?10:p.stay==='medium'?2:-7;break;
  }
  return clampScore(s);
}
function scoreLabel(score){return score>=88?'Отлично':score>=76?'Очень хорошо':score>=64?'Хорошо':score>=50?'Нормально':'С оговорками'}
function scoreClass(score){return score>=80?'scoreHigh':score>=60?'scoreMid':'scoreLow'}

const v3PreviousSortItems=sortItems;
sortItems=function(items){
  if(state.sort==='score')return [...items].sort((a,b)=>workScore(b)-workScore(a)||a.name.localeCompare(b.name,'ru'));
  if(state.sort==='personal')return [...items].sort((a,b)=>personalScore(b)-personalScore(a)||workScore(b)-workScore(a));
  return v3PreviousSortItems(items);
};
const v3PreviousRender=render;
render=function(){v3PreviousRender();enhanceV3Cards();updateProfileButton();};

function scoreBreakdownHtml(p){
  const x=workScoreDetails(p),rows=[
    ['Wi‑Fi',x.internet,18],['Розетки',x.power,16],['Цена',x.cost,14],['Достоверность',x.confidence,18],['Рабочая сессия',x.comfort,14],['Свежесть',x.freshness,10],['Дополнительно',x.extras,10]
  ];
  return `<div class="scoreHero"><div class="scoreBig ${scoreClass(x.total)}">${x.total}</div><div><b>Perm Work Score</b><span>${scoreLabel(x.total)}</span></div></div><div class="scoreRows">${rows.map(([n,v,m])=>`<div class="scoreRow"><span>${n}</span><div><i style="width:${Math.min(100,v/m*100)}%"></i></div><b>${Math.round(v)}/${m}</b></div>`).join('')}</div>${profileActive()?`<div class="personalExplain"><b>Для вас: ${personalScore(p)}/100</b><span>Учитывает настройки локального профиля на этом устройстве.</span></div>`:''}`;
}
function showScore(p){openModal(`Оценка · ${p.name}`,scoreBreakdownHtml(p))}
function enhanceV3Cards(){
  document.querySelectorAll('.card').forEach(el=>{
    const p=placeById(el.id);if(!p||el.dataset.v3==='1')return;el.dataset.v3='1';
    const meta=el.querySelector('.cardMeta');if(meta){
      const box=document.createElement('button');const base=workScore(p),personal=personalScore(p);box.type='button';box.className=`scoreBadge ${scoreClass(profileActive()?personal:base)}`;box.dataset.place=p.id;box.innerHTML=`<strong>${profileActive()?personal:base}</strong><span>${profileActive()?'для вас':'Perm Work'}</span>`;box.addEventListener('click',()=>showScore(p));meta.appendChild(box);
    }
    const row=el.querySelector('.communityRow');if(row&&!row.querySelector('.ownerBtn')){
      const btn=document.createElement('button');btn.type='button';btn.className='miniAction ownerBtn';btn.dataset.place=p.id;btn.textContent='◆ Я владелец';btn.addEventListener('click',()=>showOwnerMode(p));row.appendChild(btn);
    }
  });
}

function profileSummary(pr){
  if(!pr)return 'Профиль не настроен';
  const modes={focus:'Тишина и фокус',calls:'Звонки / Zoom',meetings:'Встречи с клиентами',cheap:'Минимум расходов',networking:'Нетворкинг',day:'Рабочий день'};
  return `${modes[pr.mode]||'Универсально'} · ${pr.budget?`до ${pr.budget} ₽`:'любой бюджет'}${pr.district&&pr.district!=='all'?` · ${pr.district}`:''}`;
}
function updateProfileButton(){
  const b=document.getElementById('profileBtn');if(!b)return;
  b.innerHTML=profileActive()?`◎ <span>Мой профиль</span><small>${safeText(profileSummary(v3State.profile))}</small>`:'◎ <span>Настроить профиль</span>';
}
function showProfile(){
  const pr=v3State.profile||{enabled:true,mode:'focus',budget:300,district:'all',mustWifi:true,mustPower:true,allDay:false};
  const districts=['all',...new Set(places.map(p=>p.district))];
  openModal('Мой рабочий профиль',`<p class="profileLead">Настройки хранятся только на этом устройстве. Они влияют на оценку «Для вас» и персональную сортировку.</p><div class="formGrid">
    <div class="field"><label>Главная задача</label><select id="pfMode"><option value="focus">Тишина и фокус</option><option value="calls">Звонки / Zoom</option><option value="meetings">Встречи с клиентами</option><option value="cheap">Минимум расходов</option><option value="networking">Нетворкинг</option><option value="day">Рабочий день 6–8 часов</option></select></div>
    <div class="field"><label>Бюджет на визит</label><select id="pfBudget"><option value="0">Не ограничивать</option><option value="200">До 200 ₽</option><option value="300">До 300 ₽</option><option value="500">До 500 ₽</option><option value="1000">До 1000 ₽</option></select></div>
    <div class="field"><label>Предпочтительный район</label><select id="pfDistrict">${districts.map(d=>`<option value="${safeText(d)}">${d==='all'?'Любой район':safeText(d)}</option>`).join('')}</select></div>
    <div class="field full"><label>Обязательные условия</label><div class="formChecks"><label class="checkPill"><input id="pfWifi" type="checkbox"> Wi‑Fi</label><label class="checkPill"><input id="pfPower" type="checkbox"> Розетка</label><label class="checkPill"><input id="pfDay" type="checkbox"> 6–8 часов</label></div></div>
  </div><div class="modalActions"><button class="subtle" id="clearProfile">Сбросить профиль</button><button class="submit" id="saveProfile">Сохранить профиль</button></div>`);
  pfMode.value=pr.mode||'focus';pfBudget.value=String(pr.budget||0);pfDistrict.value=pr.district||'all';pfWifi.checked=!!pr.mustWifi;pfPower.checked=!!pr.mustPower;pfDay.checked=!!pr.allDay;
  document.getElementById('saveProfile').onclick=()=>{v3State.profile={enabled:true,mode:pfMode.value,budget:+pfBudget.value,district:pfDistrict.value,mustWifi:pfWifi.checked,mustPower:pfPower.checked,allDay:pfDay.checked};localStorage.setItem(PROFILE_KEY,JSON.stringify(v3State.profile));ensurePersonalSortOption();document.getElementById('sort').value='personal';state.sort='personal';closeModal();render();};
  document.getElementById('clearProfile').onclick=()=>{v3State.profile=null;localStorage.removeItem(PROFILE_KEY);if(state.sort==='personal'){state.sort='recommended';document.getElementById('sort').value='recommended'}closeModal();render();};
}
function ensurePersonalSortOption(){
  const sort=document.getElementById('sort');if(!sort)return;
  if(!sort.querySelector('option[value="score"]'))sort.insertAdjacentHTML('beforeend','<option value="score">По Perm Work Score</option>');
  if(!sort.querySelector('option[value="personal"]'))sort.insertAdjacentHTML('beforeend','<option value="personal">Лучшее для меня</option>');
}

function showOwnerMode(p){
  const draft=v3State.ownerDrafts[p.id]||{};
  openModal(`Для владельца · ${p.name}`,`<div class="ownerIntro"><b>Подтвердить карточку места</b><p>Без отдельной регистрации: данные сохранятся локально, а запрос на подтверждение уйдёт в GitHub на ручную проверку. После проверки карточку можно обновить в общей базе.</p></div><div class="formGrid">
    <div class="field"><label>Ваше имя / роль</label><input id="owName" value="${safeText(draft.name||'')}" placeholder="Иван, управляющий"></div>
    <div class="field"><label>Контакт для проверки</label><input id="owContact" value="${safeText(draft.contact||'')}" placeholder="телефон, email или ссылка"></div>
    <div class="field full"><label>Официальный сайт / соцсеть</label><input id="owSite" value="${safeText(draft.site||'')}" placeholder="https://..."></div>
    <div class="field full"><label>Что нужно изменить в карточке</label><textarea id="owText" placeholder="Тарифы, график, Wi‑Fi, розетки, фото, условия работы…">${safeText(draft.text||'')}</textarea></div>
  </div><div class="modalActions"><button class="subtle" id="saveOwnerDraft">Сохранить черновик</button><button class="submit" id="sendOwnerClaim">Отправить на подтверждение</button></div>`);
  const collect=()=>({name:owName.value.trim(),contact:owContact.value.trim(),site:owSite.value.trim(),text:owText.value.trim(),date:new Date().toISOString()});
  document.getElementById('saveOwnerDraft').onclick=()=>{v3State.ownerDrafts[p.id]=collect();localStorage.setItem(OWNER_DRAFTS_KEY,JSON.stringify(v3State.ownerDrafts));closeModal()};
  document.getElementById('sendOwnerClaim').onclick=()=>{const x=collect();v3State.ownerDrafts[p.id]=x;localStorage.setItem(OWNER_DRAFTS_KEY,JSON.stringify(v3State.ownerDrafts));const body=`Место: ${p.name}\nАдрес: ${p.address}\nПредставитель: ${x.name||'—'}\nКонтакт: ${x.contact||'—'}\nОфициальная ссылка: ${x.site||'—'}\nИзменения: ${x.text||'Прошу подтвердить карточку владельца'}\n\nПросьба проверить связь представителя с площадкой независимым способом перед изменением общей базы.`;window.open(issueUrl(`Владелец места: ${p.name}`,body),'_blank');closeModal()};
}

function installV3Ui(){
  ensurePersonalSortOption();
  const brandbar=document.querySelector('.brandbar');if(brandbar&&!document.getElementById('profileBtn')){
    const btn=document.createElement('button');btn.id='profileBtn';btn.type='button';btn.className='profileBtn';btn.addEventListener('click',showProfile);const meta=brandbar.querySelector('.brandMeta');brandbar.insertBefore(btn,meta||null);
  }
  updateProfileButton();
  const method=document.querySelector('.methodology');if(method&&!document.getElementById('scoreMethod')){
    const card=document.createElement('div');card.id='scoreMethod';card.className='methodCard';card.innerHTML='<b>◉ Perm Work Score</b><p>Оценка 0–100 учитывает интернет, розетки, стоимость, достоверность, длительность рабочей сессии и свежесть данных. Нажми на балл в карточке, чтобы увидеть расчёт.</p>';method.appendChild(card);
  }
}

document.addEventListener('DOMContentLoaded',()=>{installV3Ui();enhanceV3Cards();});
