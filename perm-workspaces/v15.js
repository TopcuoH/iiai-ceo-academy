(() => {
  const featuredEvent = {
    id: 'perm-presentation-public-speaking-2026-09-26',
    title: 'Разработка презентации, публичные выступления',
    date: '2026-09-26',
    time: '17:00–19:00',
    venue: 'Точка кипения — Пермь · лекторий',
    address: 'Советская улица, 1Б',
    kind: 'Бизнес-обучение / публичные выступления',
    price: 'По регистрации',
    desc: 'Практический мастер-класс по созданию презентаций, структуре публичного выступления и формату демо-дня. Спикер — Игорь Утьманов.',
    url: 'https://leader-id.ru/events/612365'
  };

  if (typeof permEvents !== 'undefined' && !permEvents.some(event => event.id === featuredEvent.id)) {
    permEvents.push(featuredEvent);
  }

  const STYLE_ID = 'perm-work-events-view-v17';
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .appModeTabs{position:sticky;top:0;z-index:70;display:flex;gap:7px;align-items:center;width:max-content;max-width:100%;margin:0 0 18px;padding:6px;background:rgba(255,255,255,.92);border:1px solid var(--line);border-radius:17px;box-shadow:0 10px 32px rgba(39,35,75,.08);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
      .appModeBtn{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;border:0;background:transparent;color:#666477;border-radius:12px;padding:11px 14px;font:inherit;font-size:12px;font-weight:900;cursor:pointer;transition:.16s}
      .appModeBtn:hover{background:var(--accentSoft);color:var(--accent)}
      .appModeBtn.active{background:linear-gradient(135deg,var(--accent),#7567ff);color:#fff;box-shadow:0 8px 22px rgba(101,88,245,.22)}
      .appModeBtn span{display:inline-grid;place-items:center;min-width:24px;height:22px;padding:0 6px;border-radius:8px;background:rgba(128,128,150,.12);font-size:10px}
      .appModeBtn.active span{background:rgba(255,255,255,.18)}
      body.mode-places .eventsSection{display:none!important}
      body.mode-events .hero,body.mode-events .guideIntro,body.mode-events .catalogShell,body.mode-events .resourcesSection,body.mode-events .methodology,body.mode-events .updateBox{display:none!important}
      body.mode-events .compareTray{display:none!important}
      body.mode-events .eventsSection{display:block!important;padding:8px 0 34px}
      body.mode-places #categoryTabs{top:62px}
      .eventsSection .sectionHead{display:grid;grid-template-columns:.9fr 1.1fr;gap:30px;align-items:end;padding:20px 8px 18px}
      .eventsSection .sectionHead h2{font-size:clamp(34px,5vw,52px);letter-spacing:-.05em;margin:8px 0 0;line-height:1}
      .eventsSection .sectionHead p{margin:0;color:var(--muted);font-size:14px;line-height:1.7;max-width:680px}
      .eventsToolbar{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center;margin:0 0 22px;padding:16px;background:rgba(255,255,255,.86);border:1px solid var(--line);border-radius:22px;box-shadow:var(--shadowSoft)}
      .eventStats{display:flex;gap:8px}
      .eventStat{min-width:112px;padding:12px 14px;background:var(--surface2);border:1px solid #efedf6;border-radius:14px}
      .eventStat b{display:block;font-size:22px;letter-spacing:-.04em}
      .eventStat span{display:block;margin-top:2px;color:var(--muted);font-size:9px;font-weight:850;text-transform:uppercase;letter-spacing:.06em}
      .eventControls{display:grid;gap:10px;min-width:0}
      .eventFilters{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;padding-bottom:1px}
      .eventFilters::-webkit-scrollbar{display:none}
      .eventFilter{white-space:nowrap;border:1px solid var(--line);background:#fff;color:#626174;border-radius:11px;padding:9px 11px;font:inherit;font-size:10px;font-weight:850;cursor:pointer}
      .eventFilter:hover{border-color:#cbc5ff;color:var(--accent)}
      .eventFilter.active{background:#252438;border-color:#252438;color:#fff}
      .eventSearchBox{display:flex;align-items:center;gap:8px;border:1px solid var(--line);background:#fff;border-radius:13px;padding:0 12px}
      .eventSearchBox:focus-within{border-color:#bcb5ff;box-shadow:0 0 0 4px rgba(101,88,245,.08)}
      .eventSearchBox span{color:#9d9bad;font-size:17px}
      .eventSearch{width:100%;min-width:0;border:0;outline:0;background:transparent;padding:11px 0;font:inherit;font-size:12px;color:var(--text)}
      .eventsGrid{display:block!important}
      .eventDateGroup{margin:0 0 28px}
      .eventDateHeading{display:flex;align-items:center;gap:13px;margin:0 4px 11px;padding-top:4px}
      .eventDateBadge{display:flex;align-items:baseline;gap:7px;padding:8px 12px;border-radius:13px;background:var(--accentSoft);color:var(--accent)}
      .eventDateBadge strong{font-size:24px;letter-spacing:-.04em}
      .eventDateBadge span{font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.05em}
      .eventDateMeta b{display:block;font-size:13px;text-transform:capitalize}
      .eventDateMeta span{display:block;margin-top:2px;color:var(--muted);font-size:10px}
      .eventDayList{display:grid;gap:12px}
      .eventItem{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(300px,.75fr);gap:22px;padding:22px 23px;background:#fff;border:1px solid var(--line);border-radius:20px;box-shadow:var(--shadowSoft);transition:.18s}
      .eventItem:hover{transform:translateY(-1px);border-color:#ddd8ff;box-shadow:var(--shadow)}
      .eventTagRow{display:flex;gap:7px;flex-wrap:wrap;align-items:center;margin-bottom:11px}
      .eventTypePill,.eventPricePill,.eventStatePill{display:inline-flex;align-items:center;padding:7px 9px;border-radius:9px;font-size:9px;font-weight:900;line-height:1.2}
      .eventTypePill{background:#f1efff;color:#5d51ce}
      .eventPricePill{background:#f4f4f8;color:#676577}
      .eventPricePill.free{background:var(--okSoft);color:var(--ok)}
      .eventStatePill{background:var(--warnSoft);color:var(--warn)}
      .eventStatePill.today{background:var(--accent);color:#fff}
      .eventMain h3{margin:0;font-size:22px;line-height:1.12;letter-spacing:-.035em}
      .eventMain p{margin:11px 0 0;color:#5c5b6c;font-size:12px;line-height:1.65}
      .eventDetails{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-content:start}
      .eventDetail{min-width:0;padding:10px 11px;background:var(--surface2);border:1px solid #efedf6;border-radius:12px}
      .eventDetail span{display:block;color:#9a98aa;font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:.065em;margin-bottom:4px}
      .eventDetail b{display:block;font-size:11px;line-height:1.4;overflow-wrap:anywhere}
      .eventDetail.wide{grid-column:1/-1}
      .eventCta{grid-column:1/-1;display:flex;align-items:center;justify-content:center;min-height:42px;margin-top:2px;text-decoration:none;border-radius:12px;background:linear-gradient(135deg,var(--accent),#7466fb);color:#fff;font-size:10px;font-weight:900;box-shadow:0 8px 21px rgba(101,88,245,.18)}
      .eventsEmpty{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:7px;text-align:center;padding:55px 20px;background:#fff;border:1px solid var(--line);border-radius:20px;color:var(--muted)}
      .eventsEmpty b{color:var(--text);font-size:18px}
      @media(max-width:850px){
        .appModeTabs{width:100%;overflow-x:auto;border-radius:15px}.appModeBtn{flex:1;justify-content:center}
        body.mode-places #categoryTabs{top:61px}
        .eventsSection .sectionHead{grid-template-columns:1fr;gap:10px;padding-top:10px}
        .eventsToolbar{grid-template-columns:1fr}.eventStats{display:grid;grid-template-columns:1fr 1fr}
        .eventStat{min-width:0}.eventItem{grid-template-columns:1fr;gap:15px}.eventDetails{grid-template-columns:1fr 1fr}
      }
      @media(max-width:560px){
        .appModeTabs{margin-bottom:12px;padding:5px}.appModeBtn{padding:10px 11px;font-size:11px}.appModeBtn span{min-width:22px;height:20px}
        .eventsSection .sectionHead h2{font-size:36px}.eventsToolbar{padding:12px;border-radius:18px}.eventStats{gap:6px}.eventStat{padding:10px 11px}
        .eventItem{padding:17px;border-radius:17px}.eventMain h3{font-size:19px}.eventDetails{grid-template-columns:1fr}.eventDetail.wide,.eventCta{grid-column:auto}
        .eventDateHeading{position:sticky;top:59px;z-index:12;margin-left:0;margin-right:0;padding:7px 2px;background:linear-gradient(180deg,var(--bg) 78%,rgba(247,248,252,0))}
      }
    `;
    document.head.appendChild(style);
  }

  const eventViewState = { filter: 'all', query: '' };

  function text(value = '') {
    return String(value).toLowerCase().replace(/ё/g, 'е');
  }

  function isFreeEvent(event) {
    return /(^|\D)0\s*₽|бесплат/.test(text(event.price));
  }

  function eventMatchesFilter(event) {
    const haystack = text([event.title, event.kind, event.desc, event.venue, event.address, event.price].join(' '));
    if (eventViewState.query && !haystack.includes(eventViewState.query)) return false;
    if (eventViewState.filter === 'free') return isFreeEvent(event);
    if (eventViewState.filter === 'networking') return /b2b|нетворк|переговор|партнер|делов.*завтрак|бизнес-разбор|встреч/.test(haystack);
    if (eventViewState.filter === 'learning') return /курс|обуч|мастер-класс|семинар|лекц|форум|конференц|кругл.*стол|интенсив/.test(haystack);
    if (eventViewState.filter === 'tech') return /\bit\b|технолог|цифров|программ|разработ|свар|металл|инновац/.test(haystack);
    return true;
  }

  function permTodayKey() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Yekaterinburg', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const map = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return `${map.year}-${map.month}-${map.day}`;
  }

  function dateInfo(dateString) {
    const date = new Date(`${dateString}T12:00:00+05:00`);
    const day = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', timeZone: 'Asia/Yekaterinburg' }).format(date);
    const month = new Intl.DateTimeFormat('ru-RU', { month: 'long', timeZone: 'Asia/Yekaterinburg' }).format(date);
    const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', timeZone: 'Asia/Yekaterinburg' }).format(date);
    return { date, day, month, weekday };
  }

  function dateState(dateString) {
    const today = permTodayKey();
    if (dateString === today) return ['Сегодня', 'today'];
    const delta = Math.round((Date.parse(`${dateString}T12:00:00+05:00`) - Date.parse(`${today}T12:00:00+05:00`)) / 86400000);
    if (delta === 1) return ['Завтра', ''];
    if (delta < 0) return ['Уже началось', ''];
    return ['', ''];
  }

  function eventCard(event) {
    const state = dateState(event.date);
    const url = /^https?:\/\//i.test(event.url || '') ? event.url : '#';
    const priceClass = isFreeEvent(event) ? ' free' : '';
    return `<article class="eventItem" data-event-id="${safeText(event.id || '')}">
      <div class="eventMain">
        <div class="eventTagRow">
          <span class="eventTypePill">${safeText(event.kind || 'Событие')}</span>
          <span class="eventPricePill${priceClass}">${safeText(event.price || 'Условия у организатора')}</span>
          ${state[0] ? `<span class="eventStatePill ${state[1]}">${state[0]}</span>` : ''}
        </div>
        <h3>${safeText(event.title || 'Событие')}</h3>
        <p>${safeText(event.desc || '')}</p>
      </div>
      <div class="eventDetails">
        <div class="eventDetail"><span>Время</span><b>${safeText(event.time || 'У организатора')}</b></div>
        <div class="eventDetail"><span>Площадка</span><b>${safeText(event.venue || 'Пермь')}</b></div>
        <div class="eventDetail wide"><span>Адрес</span><b>${safeText(event.address || 'Уточняется при регистрации')}</b></div>
        <div class="eventDetail wide"><span>Участие</span><b>${safeText(event.price || 'Условия у организатора')}</b></div>
        <a class="eventCta" target="_blank" rel="noopener" href="${safeText(url)}">Регистрация / источник ↗</a>
      </div>
    </article>`;
  }

  function renderStructuredEvents() {
    const grid = document.getElementById('eventsGrid');
    if (!grid || typeof permEvents === 'undefined') return;

    const events = [...permEvents]
      .filter(eventMatchesFilter)
      .sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.time).localeCompare(String(b.time), 'ru'));

    const shown = document.getElementById('eventsShown');
    if (shown) shown.textContent = events.length;
    const nearest = document.getElementById('eventsNearest');
    if (nearest) {
      const next = events.find(event => event.date >= permTodayKey()) || events[0];
      nearest.textContent = next ? `${dateInfo(next.date).day} ${dateInfo(next.date).month}` : '—';
    }

    if (!events.length) {
      grid.innerHTML = '<div class="eventsEmpty"><b>Ничего не найдено</b><span>Сбрось фильтр или измени запрос.</span></div>';
      return;
    }

    const groups = new Map();
    events.forEach(event => {
      if (!groups.has(event.date)) groups.set(event.date, []);
      groups.get(event.date).push(event);
    });

    grid.innerHTML = [...groups.entries()].map(([dateString, dayEvents]) => {
      const info = dateInfo(dateString);
      return `<section class="eventDateGroup">
        <div class="eventDateHeading">
          <div class="eventDateBadge"><strong>${info.day}</strong><span>${safeText(info.month)}</span></div>
          <div class="eventDateMeta"><b>${safeText(info.weekday)}</b><span>${dayEvents.length} событий</span></div>
        </div>
        <div class="eventDayList">${dayEvents.map(eventCard).join('')}</div>
      </section>`;
    }).join('');
  }

  function buildEventsToolbar(section) {
    if (section.querySelector('.eventsToolbar')) return;
    const head = section.querySelector('.sectionHead');
    if (head) {
      const eyebrow = head.querySelector('.eyebrow');
      const title = head.querySelector('h2');
      const copy = head.querySelector('p');
      if (eyebrow) eyebrow.textContent = 'Деловой календарь Перми';
      if (title) title.textContent = 'Мероприятия и нетворкинг';
      if (copy) copy.textContent = 'Отдельный календарь подтверждённых деловых событий: сразу видно дату, время, площадку, адрес, стоимость и ссылку на регистрацию.';
    }

    const toolbar = document.createElement('div');
    toolbar.className = 'eventsToolbar';
    toolbar.innerHTML = `<div class="eventStats">
      <div class="eventStat"><b id="eventsShown">0</b><span>показано событий</span></div>
      <div class="eventStat"><b id="eventsNearest">—</b><span>ближайшая дата</span></div>
    </div>
    <div class="eventControls">
      <div class="eventFilters" aria-label="Фильтры мероприятий">
        <button class="eventFilter active" data-event-filter="all" type="button">Все</button>
        <button class="eventFilter" data-event-filter="free" type="button">Бесплатно</button>
        <button class="eventFilter" data-event-filter="networking" type="button">B2B и нетворкинг</button>
        <button class="eventFilter" data-event-filter="learning" type="button">Обучение</button>
        <button class="eventFilter" data-event-filter="tech" type="button">IT и технологии</button>
      </div>
      <label class="eventSearchBox"><span>⌕</span><input class="eventSearch" id="eventSearch" type="search" placeholder="Поиск по названию, площадке, теме…" /></label>
    </div>`;
    if (head) head.insertAdjacentElement('afterend', toolbar);
    else section.prepend(toolbar);

    toolbar.querySelectorAll('[data-event-filter]').forEach(button => {
      button.addEventListener('click', () => {
        toolbar.querySelectorAll('[data-event-filter]').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        eventViewState.filter = button.dataset.eventFilter;
        renderStructuredEvents();
      });
    });
    toolbar.querySelector('#eventSearch')?.addEventListener('input', event => {
      eventViewState.query = text(event.target.value.trim());
      renderStructuredEvents();
    });
  }

  function setMode(mode, { updateUrl = true, scroll = true } = {}) {
    const isEvents = mode === 'events';
    document.body.classList.toggle('mode-events', isEvents);
    document.body.classList.toggle('mode-places', !isEvents);
    document.querySelectorAll('.appModeBtn').forEach(button => {
      const active = button.dataset.mode === mode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.title = isEvents ? 'Мероприятия в Перми — Perm Work' : 'Где работать в Перми — карта для самозанятых';
    if (updateUrl) history.pushState({ permWorkMode: mode }, '', isEvents ? '#events' : '#catalog');
    if (isEvents) renderStructuredEvents();
    if (scroll) requestAnimationFrame(() => document.querySelector('.appModeTabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function mountViews() {
    if (document.querySelector('.appModeTabs')) {
      renderStructuredEvents();
      return;
    }
    const brandbar = document.querySelector('.brandbar');
    const eventsSection = document.getElementById('events');
    if (!brandbar || !eventsSection) return;

    buildEventsToolbar(eventsSection);

    const nav = document.createElement('nav');
    nav.className = 'appModeTabs';
    nav.setAttribute('aria-label', 'Разделы Perm Work');
    nav.innerHTML = `<button class="appModeBtn active" type="button" role="tab" aria-selected="true" data-mode="places">⌖ Рабочие места <span>${typeof places !== 'undefined' ? places.length : ''}</span></button>
      <button class="appModeBtn" type="button" role="tab" aria-selected="false" data-mode="events">▦ Мероприятия <span>${typeof permEvents !== 'undefined' ? permEvents.length : ''}</span></button>`;
    brandbar.insertAdjacentElement('afterend', nav);

    nav.querySelectorAll('.appModeBtn').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));
    window.addEventListener('hashchange', () => setMode(location.hash === '#events' ? 'events' : 'places', { updateUrl: false, scroll: false }));
    window.addEventListener('popstate', () => setMode(location.hash === '#events' ? 'events' : 'places', { updateUrl: false, scroll: false }));

    setMode(location.hash === '#events' ? 'events' : 'places', { updateUrl: false, scroll: false });
    renderStructuredEvents();
  }

  if (document.body) document.body.classList.add(location.hash === '#events' ? 'mode-events' : 'mode-places');
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountViews, { once: true });
  else mountViews();

  setTimeout(() => {
    mountViews();
    renderStructuredEvents();
  }, 700);
})();
