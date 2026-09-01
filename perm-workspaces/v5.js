const ROAD_ROUTER='https://router.project-osrm.org';
const roadState={
  originKey:null,
  routes:new Map(),
  busy:false,
  timer:null,
  lastErrorAt:0,
  geocodedSinceRoute:0
};

function roadOriginKey(){
  if(!v2State.userPos)return null;
  return `${v2State.userPos.lat.toFixed(4)},${v2State.userPos.lon.toFixed(4)}`;
}
function resetRoadRoutesIfNeeded(){
  const key=roadOriginKey();
  if(key!==roadState.originKey){
    roadState.originKey=key;
    roadState.routes.clear();
    roadState.lastErrorAt=0;
  }
}
function roadRouteFor(p){return roadState.routes.get(p.id)||null}
function roadDistanceFor(p){
  if(!v2State.userPos)return 99999;
  const route=roadRouteFor(p);
  return route&&Number.isFinite(route.km)?route.km:99999;
}

// В режиме «Рядом со мной» расстояние никогда не подменяется прямой дистанцией.
distanceFor=function(p){return roadDistanceFor(p)};

function roadCandidates(){
  const base=places.filter(matches);
  return base.filter(p=>coordFor(p));
}
function roadChunks(items,size=24){
  const out=[];
  for(let i=0;i<items.length;i+=size)out.push(items.slice(i,i+size));
  return out;
}
function roadUrl(batch){
  const origin=v2State.userPos;
  const coords=[`${origin.lon},${origin.lat}`,...batch.map(p=>{const c=coordFor(p);return `${c.lon},${c.lat}`})].join(';');
  const destinations=batch.map((_,i)=>i+1).join(';');
  return `${ROAD_ROUTER}/table/v1/driving/${coords}?sources=0&destinations=${destinations}&annotations=distance,duration`;
}
function roadStatusText(){
  if(!v2State.userPos)return 'Можно включить «Рядом со мной» — расстояние будет рассчитано по автомобильному маршруту.';
  if(roadState.busy)return `<strong>Считаю маршруты на машине…</strong> Уже рассчитано: ${roadState.routes.size}.`;
  if(roadState.routes.size)return `<strong>По дорогам рассчитано ${roadState.routes.size} мест.</strong> Сортировка идёт по автомобильному маршруту, не по прямой.`;
  if(roadState.lastErrorAt)return 'Не удалось получить дорожные маршруты. Прямое расстояние не используется; попробую ещё раз позже.';
  return '<strong>Местоположение найдено.</strong> Загружаю координаты и считаю автомобильные маршруты…';
}
function paintRoadStatus(){
  const status=document.getElementById('geoStatus');
  if(status)status.innerHTML=roadStatusText();
  const option=document.querySelector('#sort option[value="distance"]');
  if(option)option.textContent='По расстоянию на машине';
}
function patchRoadLabels(){
  document.querySelectorAll('.card').forEach(card=>{
    const p=placeById(card.id);if(!p)return;
    const route=roadRouteFor(p);if(!route)return;
    const fresh=card.querySelector('.freshness');if(!fresh)return;
    let span=fresh.querySelector('.distanceUser');
    if(!span){span=document.createElement('span');span.className='distanceUser';fresh.appendChild(span)}
    const mins=Math.max(1,Math.round(route.seconds/60));
    span.textContent=`${route.km.toFixed(1)} км на машине · ~${mins} мин`;
  });
}

const roadBaseEnhance=enhanceCards;
enhanceCards=function(){roadBaseEnhance();patchRoadLabels()};
const roadBaseUpdateStatus=updateV2Status;
updateV2Status=function(){roadBaseUpdateStatus();paintRoadStatus()};
const roadBaseRender=render;
render=function(){roadBaseRender();if(v2State.userPos)scheduleRoadRoutes(v2State.geoBusy?2200:180)};

function scheduleRoadRoutes(delay=200){
  if(!v2State.userPos)return;
  clearTimeout(roadState.timer);
  roadState.timer=setTimeout(()=>calculateRoadRoutes(),delay);
}
async function calculateRoadRoutes(){
  if(!v2State.userPos||roadState.busy)return;
  resetRoadRoutesIfNeeded();
  if(roadState.lastErrorAt&&Date.now()-roadState.lastErrorAt<12000)return;
  const need=roadCandidates().filter(p=>!roadState.routes.has(p.id));
  if(!need.length){paintRoadStatus();patchRoadLabels();return}
  roadState.busy=true;paintRoadStatus();
  try{
    for(const batch of roadChunks(need,24)){
      const response=await fetch(roadUrl(batch),{headers:{Accept:'application/json'}});
      if(!response.ok)throw new Error(`OSRM ${response.status}`);
      const data=await response.json();
      if(data.code!=='Ok'||!Array.isArray(data.distances)||!Array.isArray(data.durations))throw new Error('OSRM table error');
      const distances=data.distances[0]||[],durations=data.durations[0]||[];
      batch.forEach((p,i)=>{
        const meters=distances[i],seconds=durations[i];
        if(Number.isFinite(meters)&&Number.isFinite(seconds))roadState.routes.set(p.id,{km:meters/1000,seconds});
      });
      roadState.lastErrorAt=0;
      roadState.busy=false;
      render();
      roadState.busy=true;
    }
  }catch(e){
    roadState.lastErrorAt=Date.now();
    console.warn('Perm Work road routing failed',e);
  }finally{
    roadState.busy=false;paintRoadStatus();patchRoadLabels();
  }
}

// Во время постепенного геокодирования пересчитываем маршруты небольшими волнами.
const roadBaseGeocodePlace=geocodePlace;
geocodePlace=async function(p){
  const before=coordFor(p);
  const result=await roadBaseGeocodePlace(p);
  if(!before&&result&&v2State.userPos){
    roadState.geocodedSinceRoute++;
    if(roadState.geocodedSinceRoute>=5){roadState.geocodedSinceRoute=0;scheduleRoadRoutes(100)}
  }
  return result;
};

function waitForUserPosition(attempt=0){
  if(v2State.userPos){resetRoadRoutesIfNeeded();paintRoadStatus();scheduleRoadRoutes(50);return}
  if(attempt<48)setTimeout(()=>waitForUserPosition(attempt+1),250);
}
function initRoadRouting(){
  paintRoadStatus();
  document.getElementById('nearBtn')?.addEventListener('click',()=>waitForUserPosition());
  if(v2State.userPos)scheduleRoadRoutes(80);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initRoadRouting);
else initRoadRouting();
