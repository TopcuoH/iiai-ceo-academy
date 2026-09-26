function permWorkLoadBaseEvents(){
  const xhr=new XMLHttpRequest();
  xhr.open('GET','events-base.js',false);
  xhr.send(null);
  if(xhr.status<200||xhr.status>=300)throw new Error('Perm Work events load failed: '+xhr.status);
  return Function(xhr.responseText+';return {permEvents,selfEmployedResources};')();
}
const __permWorkBase=permWorkLoadBaseEvents();
const __expiredPermEventIds=new Set([
  'ptpp-44fz-108h-2026-09-14',
  'metalworking-metallurgy-expo-2026-09-22',
  'ptpp-lin-championship-2026-09-22',
  'ptpp-speed-networking-2026-09-25',
  'ptpp-lean-business-system-2026-09-25',
  'mybusiness-business-control-2026-09-25'
]);
const permEvents=__permWorkBase.permEvents.filter(event=>!__expiredPermEventIds.has(event.id));
permEvents.push(
  {
    id:'ptpp-speed-networking-2026-10-23',
    title:'Деловой завтрак «Экспресс-знакомства»',
    date:'2026-10-23',
    time:'09:30',
    venue:'Ресторан «Эсквайер» · VIP-зал',
    kind:'Нетворкинг / деловой завтрак',
    price:'Обязательна регистрация; для неучастников клуба доступно одно пробное мероприятие',
    desc:'Короткие деловые знакомства, самопрезентации, обмен контактами и поиск новых партнёров.',
    url:'https://www.permtpp.ru/info/articles/delovoy_zavtrak_-ekspress-znakomstva_oct26/'
  },
  {
    id:'ptpp-management-systems-audit-2026-10-26',
    title:'Требования стандартов к системам менеджмента. Внутренний аудит систем менеджмента',
    date:'2026-10-26',
    endDate:'2026-10-30',
    time:'26–30 октября · 09:00–17:00; программы 16/24/32/40 ак. ч.',
    venue:'Пермская ТПП · очное обучение',
    kind:'Бизнес-обучение / системы менеджмента / внутренний аудит',
    price:'15 000–25 000 ₽; для членов Пермской ТПП 13 500–22 500 ₽',
    desc:'Очные программы по ISO 9001, ISO 14001, ISO 45001 и внутреннему аудиту с учётом ISO 19011:2026.',
    url:'https://www.permtpp.ru/info/articles/trebovaniya_standartov_k_sistemam_menedzhmenta-_vnutrenniy_audit_sistem_menedzhmenta1020262630/'
  }
);
const selfEmployedResources=__permWorkBase.selfEmployedResources;
