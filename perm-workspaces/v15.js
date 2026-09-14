(() => {
  const event = {
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
  const render = () => {
    const grid = document.getElementById('eventsGrid');
    if (!grid || grid.querySelector(`[data-event-id="${event.id}"]`)) return;
    const card = document.createElement('article');
    card.className = 'eventCard';
    card.dataset.eventId = event.id;
    card.innerHTML = `<div class="eventTop"><span class="eventDate">26 сентября</span><span class="eventKind">${event.kind}</span></div><h3>${event.title}</h3><p>${event.desc}</p><div class="eventMeta"><span>🕒 ${event.time}</span><span>📍 ${event.venue}</span><span>${event.address}</span><span>💳 ${event.price}</span></div><a class="eventLink" target="_blank" rel="noopener" href="${event.url}">Открыть событие ↗</a>`;
    grid.appendChild(card);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();
  setTimeout(render, 500);
})();
