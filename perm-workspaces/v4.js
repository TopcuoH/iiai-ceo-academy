const NAV_PLATFORM={
  android:/Android/i.test(navigator.userAgent),
  ios:/iPhone|iPad|iPod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)
};

function navPlaceFromAnchor(anchor){
  const card=anchor.closest('.card');
  if(!card)return null;
  return typeof placeById==='function'?placeById(card.id):null;
}
function navCoord(p){
  if(typeof coordFor==='function')return coordFor(p);
  return null;
}
function navAddress(p){return `Пермь, ${p.address}`}
function systemGeoUrl(p){
  const c=navCoord(p);
  if(c)return `geo:${c.lat},${c.lon}?q=${encodeURIComponent(`${c.lat},${c.lon} (${p.name})`)}`;
  return `geo:0,0?q=${encodeURIComponent(navAddress(p))}`;
}
function yandexNaviUrl(p){
  const c=navCoord(p);
  if(c)return `yandexnavi://build_route_on_map?lat_to=${encodeURIComponent(c.lat)}&lon_to=${encodeURIComponent(c.lon)}`;
  return `yandexnavi://map_search?text=${encodeURIComponent(`${p.name}, ${navAddress(p)}`)}`;
}
function yandexMapsUrl(p){
  const c=navCoord(p);
  if(c)return `yandexmaps://maps.yandex.ru/?ll=${encodeURIComponent(`${c.lon},${c.lat}`)}&z=17`;
  return `yandexmaps://maps.yandex.ru/?text=${encodeURIComponent(`${p.name}, ${navAddress(p)}`)}`;
}
function appleMapsUrl(p){
  const c=navCoord(p);
  const destination=c?`${c.lat},${c.lon}`:navAddress(p);
  return `maps://?daddr=${encodeURIComponent(destination)}&dirflg=d`;
}
function googleMapsUrl(p){
  const c=navCoord(p);
  const destination=c?`${c.lat},${c.lon}`:navAddress(p);
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
}
function wazeUrl(p){
  const c=navCoord(p);
  if(c)return `https://waze.com/ul?ll=${encodeURIComponent(`${c.lat},${c.lon}`)}&navigate=yes`;
  return `https://waze.com/ul?q=${encodeURIComponent(navAddress(p))}&navigate=yes`;
}
function launchDeepLink(url){window.location.href=url}
function navButton(label,sub,action,primary=false){
  return `<button class="navChoice ${primary?'primary':''}" type="button" data-nav-action="${action}"><span class="navChoiceIcon">⌖</span><span><b>${safeText(label)}</b><small>${safeText(sub)}</small></span><em>›</em></button>`;
}
function showNavigatorChooser(p){
  const androidGeneric=NAV_PLATFORM.android?navButton('Выбрать установленный навигатор','Android предложит подходящее приложение','system',true):'';
  const iosSystem=NAV_PLATFORM.ios?navButton('Apple Карты','Маршрут от текущего местоположения','apple',false):'';
  openModal(`Как открыть · ${p.name}`,`
    <div class="navSheetIntro"><b>${safeText(p.address)}</b><span>Выбери приложение. Сайт не будет отправлять адрес в веб‑версию Яндекс Карт.</span></div>
    <div class="navChoices">
      ${androidGeneric}
      ${navButton('Яндекс Навигатор','Построить маршрут / найти адрес','yandex-navi',!NAV_PLATFORM.android)}
      ${navButton('Яндекс Карты','Открыть точку в установленном приложении','yandex-maps')}
      ${iosSystem}
      ${navButton('Google Maps','Маршрут в Google Maps','google')}
      ${navButton('Waze','Маршрут в Waze','waze')}
    </div>
    <div class="navSheetFoot">На Android кнопка адреса использует системный <code>geo:</code>‑intent: если установлено несколько приложений, телефон может предложить выбрать навигатор или использовать назначенный по умолчанию.</div>`);
  const modal=document.getElementById('v2Overlay');
  modal.querySelectorAll('[data-nav-action]').forEach(btn=>btn.addEventListener('click',()=>{
    const action=btn.dataset.navAction;
    if(action==='system'){window.location.href=systemGeoUrl(p);return}
    if(action==='yandex-navi'){launchDeepLink(yandexNaviUrl(p));return}
    if(action==='yandex-maps'){launchDeepLink(yandexMapsUrl(p));return}
    if(action==='apple'){window.location.href=appleMapsUrl(p);return}
    if(action==='google'){window.location.href=googleMapsUrl(p);return}
    if(action==='waze'){window.location.href=wazeUrl(p);return}
  }));
}
function openBestNavigator(p){
  if(NAV_PLATFORM.android){window.location.href=systemGeoUrl(p);return}
  showNavigatorChooser(p);
}
function patchAddressLabels(root=document){
  root.querySelectorAll?.('.placeAddress').forEach(a=>{
    const small=a.querySelector('small');
    if(small)small.textContent='Адрес · открыть в навигаторе';
    a.setAttribute('aria-label','Открыть адрес в установленном навигаторе');
  });
}

document.addEventListener('click',e=>{
  const address=e.target.closest('.placeAddress');
  if(address){
    const p=navPlaceFromAnchor(address);
    if(!p)return;
    e.preventDefault();e.stopPropagation();
    openBestNavigator(p);
    return;
  }
  const mapPopup=e.target.closest('[data-open-navigator]');
  if(mapPopup){
    const p=typeof placeById==='function'?placeById(mapPopup.dataset.openNavigator):null;
    if(p){e.preventDefault();openBestNavigator(p)}
  }
},true);

const navObserver=new MutationObserver(mutations=>mutations.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)patchAddressLabels(n)})));
document.addEventListener('DOMContentLoaded',()=>{
  patchAddressLabels();
  const list=document.getElementById('list');if(list)navObserver.observe(list,{childList:true,subtree:true});
});
