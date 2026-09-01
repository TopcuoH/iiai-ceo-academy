const places = [
  {
    name:'Кофе Сити', type:'кофейня · потенциальный вариант', address:'Комсомольский проспект, 68', distance:3.1,
    phone:'+73422442991', phoneLabel:'+7 (342) 244-29-91', wifi:'maybe', power:'maybe', budget:true, free:false, uncertain:true,
    price:'По меню; бюджет до 300 ₽ нужно уточнить', stay:'Скорее 1–3 часа',
    desc:'Самый близкий из найденных потенциальных вариантов. Для строгого фильтра пока не хватает прямого подтверждения розетки и Wi‑Fi именно для работы с ноутбуком — лучше позвонить перед визитом.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Кофе Сити Пермь Комсомольский проспект 68')
  },
  {
    name:'Жизньмарт', type:'магазин-кафе · Мира, 41 стр. 2', address:'улица Мира, 41, стр. 2', distance:3.4,
    phone:'+79519549569', phoneLabel:'+7 (951) 954-95-69', wifi:'maybe', power:'maybe', budget:true, free:false, uncertain:true,
    price:'Напиток/перекус; обычно можно уложиться до 300 ₽', stay:'1–4 часа, если не загружено',
    desc:'Ближайшая активная точка сети из найденных. Филиал работает в большом формате, но Wi‑Fi и розетки именно здесь в открытых источниках отдельно не подтверждены — уточнить перед поездкой.',
    source:'https://t.me/lifemart_mira'
  },
  {
    name:'Жизньмарт', type:'магазин-кафе · Революции, 50', address:'улица Революции, 50', distance:3.7,
    phone:'+79223225950', phoneLabel:'+7 (922) 322-59-50', wifi:'maybe', power:'maybe', budget:true, free:false, uncertain:true,
    price:'Напиток/перекус; ориентир ≤300 ₽', stay:'1–4 часа',
    desc:'Близкая точка сети. Адрес и режим работы актуальны, однако наличие удобной розетки у посадочного места и Wi‑Fi для гостей лучше подтвердить звонком.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Жизньмарт Пермь Революции 50')
  },
  {
    name:'Парадокс', type:'антикафе · коворкинг', address:'улица Борчанинова, 15', distance:3.9,
    phone:'+79194855222', phoneLabel:'+7 (919) 485-52-22', wifi:'yes', power:'maybe', budget:true, free:false, uncertain:true,
    price:'Общий зал от 100 ₽; VIP от 150 ₽; безлимит дороже', stay:'Хорошо на 1–3 часа',
    desc:'Официально/в справочниках указан как антикафе и коворкинг, бесплатный Wi‑Fi подтверждён. Розетка рядом с конкретным местом публично не подтверждена — лучше спросить при звонке.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Парадокс Пермь Борчанинова 15')
  },
  {
    name:'RoastBerry', type:'кофейня · Революции, 24', address:'улица Революции, 24', distance:4.0,
    phone:'+79120691000', phoneLabel:'+7 (912) 069-10-00', wifi:'unstable', power:'yes', budget:true, free:false, uncertain:false,
    price:'Покупка напитка; ориентир 170–250 ₽', stay:'2–5 часов', best:false,
    desc:'Розетки подтверждены, Wi‑Fi есть, но в одном из отзывов отмечалась нестабильность публичной сети. Для спокойной работы лучше иметь мобильный интернет как запасной канал.',
    photo:'https://static.tildacdn.com/tild3836-3639-4761-b837-373139373831/8128e364-6abf-448e-a.png', photoCredit:'Фото: RoastBerry',
    source:'https://roastberry.coffee/'
  },
  {
    name:'Жизньмарт', type:'магазин-кафе · Луначарского, 99', address:'улица Луначарского, 99', distance:4.0,
    phone:'+79127899272', phoneLabel:'+7 (912) 789-92-72', wifi:'yes', power:'yes', budget:true, free:false, uncertain:false,
    price:'Кофе примерно от 170 ₽', stay:'2–5 часов, если есть свободное место', best:true,
    desc:'Один из самых сильных вариантов рядом: в свежих отзывах прямо упоминаются мягкие диваны, панорамные окна, Wi‑Fi и розетки для зарядки. Отдельной платы за стол нет; это всё же магазин-кафе, а не официальный коворкинг.',
    source:'https://2gis.ru/perm/firm/70000001083250328/tab/reviews'
  },
  {
    name:'Lemon Tree', type:'кофейня', address:'улица 25 Октября, 47', distance:4.2,
    phone:'+79323372228', phoneLabel:'+7 (932) 337-22-28', wifi:'yes', power:'maybe', budget:true, free:false, uncertain:true,
    price:'По меню; расход до 300 ₽ возможен, но не гарантирован', stay:'1–3 часа',
    desc:'Wi‑Fi для гостей подтверждается справочниками. Наличие розетки рядом со столом в открытых источниках не нашлось — этот пункт нужно уточнить.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Lemon Tree Пермь 25 Октября 47')
  },
  {
    name:'Фрай', type:'кафе · можно с ноутбуком', address:'Пермская улица, 161', distance:4.3,
    phone:'+79638753577', phoneLabel:'+7 (963) 875-35-77', wifi:'yes', power:'maybe', budget:false, free:false, uncertain:true,
    price:'Средний чек около 400 ₽ — выше заданного бюджета', stay:'1–3 часа',
    desc:'В карточке указаны бесплатный Wi‑Fi и возможность приходить с ноутбуком. Розетки не подтверждены. Оставлен как резервный вариант, потому что средний чек выше 300 ₽.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Фрай Пермь Пермская 161')
  },
  {
    name:'RoastBerry', type:'кофейня · Ленина, 68', address:'улица Ленина, 68', distance:4.4,
    phone:'+79097328519', phoneLabel:'+7 (909) 732-85-19', wifi:'yes', power:'yes', budget:true, free:false, uncertain:false,
    price:'Фильтр ≈170 ₽ · капучино ≈210 ₽', stay:'3–6 часов', best:true,
    desc:'В отзыве отдельно отмечены оборудованные места для ноутбука, розетки и быстрый Wi‑Fi. По соотношению «нормальная рабочая посадка / цена одного напитка» — один из лучших вариантов.',
    photo:'https://static.tildacdn.com/tild3836-3639-4761-b837-373139373831/8128e364-6abf-448e-a.png', photoCredit:'Фото: RoastBerry',
    source:'https://roastberry.coffee/'
  },
  {
    name:'Центр «Мой бизнес»', type:'официальный коворкинг для предпринимателей', address:'улица Ленина, 68', distance:4.4,
    phone:'+78003008090', phoneLabel:'8 800 300-80-90', wifi:'maybe', power:'yes', budget:true, free:true, uncertain:true,
    price:'0 ₽ при подходящих условиях поддержки', stay:'Подходит на рабочий день', best:true,
    desc:'Настоящий коворкинг: рабочие места, компьютеры, печать/сканирование и переговорные. Электропитание рабочих станций очевидно есть; Wi‑Fi и условия бесплатного доступа именно для твоего статуса лучше подтвердить по телефону.',
    photo:'https://pgf-perm.ru/upload/medialibrary/1d8/1d873f708b72e14dfc9e550d973ddae0.JPG', photoCredit:'Фото: Центр «Мой бизнес»',
    source:'https://msppk.ru/'
  },
  {
    name:'Жизньмарт', type:'магазин-кафе · Ленина, 60', address:'улица Ленина, 60', distance:4.4,
    phone:'+79519545201', phoneLabel:'+7 (951) 954-52-01', wifi:'maybe', power:'maybe', budget:true, free:false, uncertain:true,
    price:'Напиток/перекус; ориентир ≤300 ₽', stay:'1–4 часа',
    desc:'Активная точка сети. Для конкретного филиала Wi‑Fi и расположение розеток у посадочных мест не удалось подтвердить независимо — звонок перед поездкой обязателен.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Жизньмарт Пермь Ленина 60')
  },
  {
    name:'Жизньмарт', type:'магазин-кафе · Н. Островского, 52', address:'улица Николая Островского, 52', distance:4.5,
    phone:'+79223335952', phoneLabel:'+7 (922) 333-59-52', wifi:'maybe', power:'maybe', budget:true, free:false, uncertain:true,
    price:'Напиток/перекус; ориентир ≤300 ₽', stay:'1–4 часа',
    desc:'Действующий филиал. Формат сети подходит для короткой работы, но по этому адресу Wi‑Fi и розетки у стола в открытых источниках отдельно не подтверждены.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Жизньмарт Пермь Николая Островского 52')
  },
  {
    name:'Жизньмарт', type:'магазин-кафе · Луначарского, 34', address:'улица Луначарского, 34', distance:4.6,
    phone:'+73422046168', phoneLabel:'+7 (342) 204-61-68', wifi:'maybe', power:'maybe', budget:true, free:false, uncertain:true,
    price:'Напиток/перекус; ориентир ≤300 ₽', stay:'1–4 часа',
    desc:'Активный филиал, в актуальном рейтинге сети отмечался как один из сильных по сервису. Но именно Wi‑Fi и розетки у посадки по этому адресу нужно подтвердить отдельно.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Жизньмарт Пермь Луначарского 34')
  },
  {
    name:"Jeffrey's Coffee & Work", type:'коворкинг-кофейня', address:'Комсомольский проспект, 24', distance:4.7,
    phone:'+79058644444', phoneLabel:'+7 (905) 864-44-44', wifi:'yes', power:'yes', budget:true, free:false, uncertain:false,
    price:'180 ₽/час · в 300 ₽ помещается ~1 ч 40 мин', stay:'Лучше для 1–2 часов',
    desc:'Полноценный рабочий формат: бесплатный Wi‑Fi, доступ к электророзеткам, столы и напитки. Для целого дня бюджет 300 ₽ не подходит, но для короткой рабочей сессии — отличный вариант.',
    photo:'https://www.chitaitext.ru/upload/medialibrary/5ca/0502-13.jpg', photoCredit:'Фото: ИА «Текст»',
    source:'https://getdesk.com/ru-ru/perm/jeffreys-coffee-kovorking-kofeinia'
  },
  {
    name:'Пей & Печатай', type:'кофейня-коворкинг', address:'Петропавловская улица, 37', distance:4.9,
    phone:'+79125928106', phoneLabel:'+7 (912) 592-81-06', wifi:'yes', power:'yes', budget:true, free:true, uncertain:false,
    price:'Рабочее место 0 ₽ · кофе ≈150–200 ₽ по желанию', stay:'Лучший вариант на 3–8 часов', best:true,
    desc:'Главный фаворит: пространство изначально организовано для удалённой работы, есть места с ноутбуком, Wi‑Fi и розетки. В свежем отзыве 2026 года прямо отмечено, что можно работать, ничего не заказывая.',
    photo:'https://chitaitext.ru/upload/medialibrary/c6a/2b0btqzupe3c948e1dduoasmhr78fq8t/1403-15-1.jpg', photoCredit:'Фото: ИА «Текст»',
    source:'https://yandex.com/maps/org/pey_pechatay/99670619815/'
  },
  {
    name:'Дом Молодёжи', type:'общественное пространство · коворкинг', address:'Петропавловская улица, 185', distance:4.9,
    phone:'+73422151440', phoneLabel:'+7 (342) 215-14-40', wifi:'maybe', power:'maybe', budget:true, free:true, uncertain:true,
    price:'Вероятно 0 ₽, условия доступа уточнить', stay:'Потенциально на несколько часов',
    desc:'На официальном портале пространство отмечено как коворкинг и зона для деловых встреч и занятий. Но публичного подтверждения гостевого Wi‑Fi и свободных розеток не найдено — звонок перед визитом.',
    source:'https://dmp.perm.ru/contacts/'
  },
  {
    name:'Рандом', type:'антикафе · коворкинг', address:'улица Луначарского, 3А', distance:4.9,
    phone:'+79223779055', phoneLabel:'+7 (922) 377-90-55', wifi:'yes', power:'maybe', budget:true, free:false, uncertain:true,
    price:'Тариф актуально уточнить; несколько часов могут уложиться до 300 ₽', stay:'1–3 часа',
    desc:'Бесплатный Wi‑Fi подтверждён. Формат антикафе удобен для долгого сидения, но наличие розетки непосредственно у выбранного места и актуальный тариф лучше уточнить по телефону.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Рандом антикафе Пермь Луначарского 3А')
  },
  {
    name:'Точка кипения — Пермь', type:'коворкинг · деловое пространство', address:'Советская улица, 1Б', distance:5.6,
    phone:'+79082548355', phoneLabel:'+7 (908) 254-83-55', wifi:'maybe', power:'maybe', budget:true, free:true, uncertain:true,
    price:'0 ₽ для части форматов/мероприятий; режим свободного коворкинга уточнить', stay:'Потенциально на рабочий день',
    desc:'Официально заявлены коворкинг и переговорные. Это сильный кандидат на бесплатную работу, но правила свободного посещения, гостевой Wi‑Fi и питание ноутбука лучше подтвердить у администратора.',
    source:'https://leader-id.ru/places/1201'
  },
  {
    name:'Good Game', type:'компьютерный клуб · резервный вариант', address:'улица Лебедева, 25А', distance:6.3,
    phone:'+79959265300', phoneLabel:'+7 (995) 926-53-00', wifi:'yes', power:'yes', budget:true, free:false, uncertain:true,
    price:'По найденным пакетам ≈240–300 ₽ за несколько часов; перепроверить', stay:'3–5 часов',
    desc:'Wi‑Fi есть, электричество у компьютерных мест — по определению формата. Главный вопрос: разрешат ли занять стол именно со своим ноутбуком. Это обязательно уточнить до поездки.',
    source:'https://yandex.ru/maps/?text='+encodeURIComponent('Good Game Пермь Лебедева 25А')
  },
  {
    name:'Жизньмарт', type:'магазин-кафе · Сапфирная, 13', address:'Сапфирная улица, 13', distance:7.0,
    phone:'+78006000315', phoneLabel:'8 800 600-03-15', wifi:'maybe', power:'maybe', budget:true, free:false, uncertain:true,
    price:'Напиток/перекус; ориентир ≤300 ₽', stay:'1–3 часа',
    desc:'Действующий адрес сети, но заметно дальше остальных. Данные по Wi‑Fi и розеткам именно этой точки не подтверждены — оставлен в конце как запасной вариант.',
    source:'https://2gis.ru/perm/firm/70000001101553482/tab/info'
  }
];
