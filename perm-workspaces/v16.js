const CATALOG_REVIEW_DATE_20260915='2026-09-15';

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

applyVerifiedCatalogUpdates20260915();
