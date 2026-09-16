const CATALOG_REVIEW_DATE_20260915='2026-09-15';
const CATALOG_REVIEW_DATE_20260916='2026-09-16';

function applyVerifiedCatalogUpdates20260915(){
  if(!places.some(p=>p.id==='perm-business-incubator-creative-gorkogo-27'||(p.name.includes('Пермский бизнес-инкубатор')&&p.address==='улица Максима Горького, 27'))){
    places.push({
      id:'perm-business-incubator-creative-gorkogo-27',
      name:'Пермский бизнес-инкубатор · креативное направление',
      category:'coworking',
      district:'Ленинский',
      address:'улица Максима Горького, 27',
      phone:'+73422018500',
      phoneLabel:'+7 (342) 201-85-00',
      priceType:'conditions',
      price:'льготное бронирование для резидентов; актуальная стоимость рабочего места — по бронированию',
      priceValue:9999,
      wifi:'maybe',
      power:'maybe',
      stay:'day',
      score:90,
      evidence:'high',
      featured:false,
      hours:'доступ к рабочим местам — по бронированию; режим конкретного пространства уточнить',
      source:'https://incubatorperm.ru/capabilities/for-work/',
      checkedAt:CATALOG_REVIEW_DATE_20260915,
      desc:'Официальная площадка Пермского бизнес-инкубатора для креативных предпринимателей. На Горького, 27 подтверждены офисы и коворкинг, а также лекторий и зона мастер-классов; резидентам доступно льготное бронирование. Wi‑Fi, розетки и точная стоимость отдельного рабочего места в открытой карточке не опубликованы — эти параметры требуют уточнения.'
    });
  }

  if(!places.some(p=>p.id==='perm-teatrium-petropavlovskaya-18'||p.name==='Творческий инкубатор «ТеатриУм»')){
    places.push({
      id:'perm-teatrium-petropavlovskaya-18',
      name:'Творческий инкубатор «ТеатриУм»',
      category:'coworking',
      district:'Ленинский',
      address:'Петропавловская улица, 18',
      phone:'+73422123780',
      phoneLabel:'+7 (342) 212-37-80',
      priceType:'conditions',
      price:'доступ и условия — по заявке / для резидентов и участников программ',
      priceValue:9999,
      wifi:'maybe',
      power:'maybe',
      stay:'medium',
      score:86,
      evidence:'high',
      featured:false,
      hours:'режим самостоятельного доступа к коворкингу требует уточнения',
      source:'https://teatrium.pghu.ru/',
      checkedAt:CATALOG_REVIEW_DATE_20260915,
      desc:'Новый творческий инкубатор на базе Пермского хореографического училища для проектов на стыке искусства, технологий и бизнеса. Официально заявлены арт-пространство, коворкинг, лекции, мастер-классы, Open Call и поддержка креативных проектов. Условия свободного посещения, Wi‑Fi и розетки отдельно не опубликованы, поэтому отмечены как требующие уточнения.'
    });
  }
}

function applyVerifiedCatalogUpdates20260916(){
  const ozarenie=places.find(p=>p.name==='Дом практик «Озарение»');
  if(ozarenie){
    ozarenie.checkedAt=CATALOG_REVIEW_DATE_20260916;
    ozarenie.address='улица Елькина, 41А, 4 этаж';
    ozarenie.phone='+79097271890';
    ozarenie.phoneLabel='+7 (909) 727-18-90';
    ozarenie.evidence='high';
    ozarenie.priceType='paid';
    ozarenie.price='от 310 ₽/час; кабинеты и залы 390–800 ₽/час; комната медитаций 1 900 ₽/сутки';
    ozarenie.priceValue=310;
    ozarenie.wifi='maybe';
    ozarenie.power='maybe';
    ozarenie.stay='medium';
    ozarenie.hours='ежедневно 08:00–21:00';
    ozarenie.source='https://www.dom-ozarenie.ru/';
    ozarenie.desc='Подтверждённое профессиональное пространство для психологов, коучей, репетиторов, массажистов, инструкторов, ведущих мастер-классов и небольших групп. Официальный сайт подтверждает кабинеты и залы, почасовую и суточную аренду, зону отдыха, чай и воду, кухню и профессиональное сообщество. 2ГИС подтверждает адрес и режим работы. Wi‑Fi и наличие розеток как отдельная услуга в проверенных источниках не указаны — эти параметры требуют уточнения.';
  }

  const hereNow=places.find(p=>p.name==='Здесь и Сейчас');
  if(hereNow){
    hereNow.checkedAt=CATALOG_REVIEW_DATE_20260916;
    hereNow.evidence='low';
    hereNow.score=50;
    hereNow.priceType='conditions';
    hereNow.price='статус работы и актуальные тарифы требуют уточнения перед визитом';
    hereNow.priceValue=9999;
    hereNow.wifi='maybe';
    hereNow.power='maybe';
    hereNow.stay='medium';
    hereNow.hours='статус и режим требуют уточнения: справочники расходятся';
    hereNow.source='https://yandex.com/maps/org/zdes_i_seychas/211798575211/';
    hereNow.desc='Статус коворкинга сейчас противоречив: Яндекс Карты помечают точку на Комсомольском проспекте, 27 как закрытую, тогда как несколько профильных справочников и карт продолжают показывать рабочий график. До независимого подтверждения на месте карточка сохранена только как требующая уточнения; старые тарифы, Wi‑Fi и розетки больше не выдаются как актуальный факт.';
  }
}

function renderVerifiedPermEvents20260915(){
  const grid=document.getElementById('eventsGrid');
  if(!grid||typeof permEvents==='undefined')return;
  const events=[...permEvents].sort((a,b)=>String(a.date).localeCompare(String(b.date))||String(a.time).localeCompare(String(b.time),'ru'));
  grid.innerHTML='';
  const fmt=new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long'});
  events.forEach(event=>{
    const d=new Date(`${event.date}T12:00:00+05:00`);
    const card=document.createElement('article');
    card.className='eventCard';
    card.dataset.eventId=event.id;
    card.innerHTML=`<div class="eventTop"><span class="eventDate">${fmt.format(d)}</span><span class="eventKind">${safeText(event.kind||'Событие')}</span></div><h3>${safeText(event.title)}</h3><p>${safeText(event.desc||'')}</p><div class="eventMeta"><span>🕒 ${safeText(event.time||'Время у организатора')}</span><span>📍 ${safeText(event.venue||'Пермь')}</span><span>${safeText(event.address||'')}</span><span>💳 ${safeText(event.price||'Условия у организатора')}</span></div><a class="eventLink" target="_blank" rel="noopener" href="${safeText(event.url)}">Открыть событие ↗</a>`;
    grid.appendChild(card);
  });
}

function updateCatalogRevisionStamp20260916(){
  const footer=document.querySelector('footer');
  if(footer)footer.innerHTML=footer.innerHTML.replace('15 сентября 2026 г.','16 сентября 2026 г.');
}

applyVerifiedCatalogUpdates20260915();
applyVerifiedCatalogUpdates20260916();
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{
    renderVerifiedPermEvents20260915();
    updateCatalogRevisionStamp20260916();
  },{once:true});
}else{
  renderVerifiedPermEvents20260915();
  updateCatalogRevisionStamp20260916();
}
setTimeout(renderVerifiedPermEvents20260915,500);
