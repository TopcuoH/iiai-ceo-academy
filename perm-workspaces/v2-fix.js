// Small compatibility and robustness layer for Perm Work v2.
(function(){
  // Load Leaflet CSS without SRI as a fallback for browsers/CDNs with integrity mismatch.
  if(!document.getElementById('leaflet-css-fallback')){
    const link=document.createElement('link');link.id='leaflet-css-fallback';link.rel='stylesheet';link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(link);
  }

  // Make the new "open now" condition participate in district counters too.
  if(typeof matchesWithoutDistrict==='function'&&typeof openStatus==='function'){
    const baseMatchesWithoutDistrict=matchesWithoutDistrict;
    matchesWithoutDistrict=function(p){
      return baseMatchesWithoutDistrict(p)&&(!v2State.openNow||openStatus(p).open===true);
    };
  }

  // Use explicit DOM lookups rather than relying on legacy id-to-window globals.
  if(typeof showCheckin==='function'){
    showCheckin=function(p){
      openModal(`Я здесь · ${p.name}`,`<p class="desc">Подтверди состояние места прямо сейчас. После сохранения откроется готовая заявка для общей базы.</p><div class="formChecks">
        <label class="checkPill"><input id="ciOpen" type="checkbox" checked> Место открыто</label>
        <label class="checkPill"><input id="ciWifi" type="checkbox"> Wi‑Fi работает</label>
        <label class="checkPill"><input id="ciPower" type="checkbox"> Розетка доступна</label>
      </div><div class="field full" style="margin-top:12px"><label>Комментарий</label><textarea id="ciText" placeholder="Свободные места, шум, скорость Wi‑Fi, где розетки…"></textarea></div><div class="modalActions"><button class="submit" id="saveCheckin">Подтвердить</button></div>`);
      document.getElementById('saveCheckin').onclick=()=>{
        const c={
          open:document.getElementById('ciOpen').checked,
          wifi:document.getElementById('ciWifi').checked,
          power:document.getElementById('ciPower').checked,
          text:document.getElementById('ciText').value.trim(),
          date:new Date().toISOString()
        };
        v2State.checkins[p.id]=c;saveLocal();
        const body=`Место: ${p.name}\nАдрес: ${p.address}\nОткрыто: ${c.open?'да':'нет'}\nWi‑Fi работает: ${c.wifi?'да':'не подтверждаю'}\nРозетка доступна: ${c.power?'да':'не подтверждаю'}\nКомментарий: ${c.text||'—'}\nПроверено пользователем: ${new Date().toLocaleString('ru-RU')}`;
        window.open(issueUrl(`Полевое подтверждение: ${p.name}`,body),'_blank');closeModal();
      };
    };
  }
  if(typeof showReport==='function'){
    showReport=function(p){
      openModal(`Сообщить об изменении · ${p.name}`,`<div class="formGrid"><div class="field"><label>Что изменилось</label><select id="reportType"><option>Закрылось</option><option>Новый тариф</option><option>Wi‑Fi не работает</option><option>Нет розеток</option><option>Другой режим</option><option>Новый телефон</option><option>Добавить фото</option><option>Другое</option></select></div><div class="field full"><label>Подробности</label><textarea id="reportText" placeholder="Что именно нужно исправить? Можно вставить ссылку на источник."></textarea></div></div><div class="modalActions"><button class="submit" id="sendReport">Отправить исправление</button></div>`);
      document.getElementById('sendReport').onclick=()=>{
        const type=document.getElementById('reportType').value,text=document.getElementById('reportText').value.trim();
        window.open(issueUrl(`Исправление Perm Work: ${p.name}`,`Место: ${p.name}\nАдрес: ${p.address}\nТип изменения: ${type}\nПодробности: ${text||'—'}\nДата: ${new Date().toLocaleDateString('ru-RU')}`),'_blank');closeModal();
      };
    };
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const install=document.getElementById('installBtn');
    if(install&&!window.matchMedia('(display-mode: standalone)').matches)install.classList.remove('hidden');
  });
})();
