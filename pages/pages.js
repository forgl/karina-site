(function () {
  const reasons = [
    'за твой голос, который я узнаю сразу', 'за глаза, в которых иногда живёт настоящее ребячество', 'за смех, который невозможно не подхватить', 'за улыбку, после которой день становится легче', 'за случайные милые звуки', 'за боевой характер', 'за нежность, которую ты не всегда выставляешь напоказ', 'за то, как ты умеешь быть лёгкой', 'за твои объятия', 'за носочки, на которые ты встаёшь рядом со мной',
    'за то, как ты радуешься маленьким вещам', 'за то, что рядом с тобой можно говорить ни о чём', 'за домашние свидания', 'за спонтанные прогулки', 'за поцелуи без повода', 'за умение сделать обычный вечер нашим', 'за любовь к чёрному', 'за бордовый, который теперь всегда немного про тебя', 'за ромашки', 'за хризантемы',
    'за лис, которые всегда будут напоминать мне о Лисе', 'за котиков и нашу будущую маленькую наглость дома', 'за то, что Лололошка стал частью наших разговоров', 'за JDH как странную, но понятную нам отсылку', 'за Love Kills, которая звучит немного иначе, когда я думаю о тебе', 'за «с тебя шоколадка»', 'за Сиськи — самое смешное важное место на карте', 'за пять утра, которые до сих пор светятся внутри', 'за ёжика и вызов демона с фонариками', 'за море',
    'за мазут, который умудрился стать воспоминанием', 'за наш столик', 'за ДайВинчик и обычный лайк, который оказался совсем не обычным', 'за первую историю, которая случилась с нами', 'за то, что наша история знала паузу', 'за то, что она не оборвалась на этой паузе', 'за встречу снова там, где всё началось', 'за то, что мы не пытались мгновенно всё исправить', 'за постепенное сближение', 'за привычку снова быть рядом',
    'за разговоры до утра', 'за прогулки, которым не нужна цель', 'за твоё «Киса»', 'за «Кися», которое каждый раз звучит по-особенному', 'за «Кир», когда нужно серьёзно', 'за то, что ты — Кариша', 'за то, что ты — Лись', 'за то, что ты — Лися', 'за то, что ты — Лисёнок', 'за то, что иногда ты Лисёночек',
    'за то, как ты смотришь, когда тебе хорошо', 'за то, что рядом с тобой можно быть неидеальным', 'за смелость быть собой', 'за твою мягкость после характера', 'за характер после мягкости', 'за честные эмоции', 'за моменты, когда тебе смешно с ерунды', 'за то, как ты оживляешь комнату', 'за спокойствие, которое дают твои объятия', 'за страсть, в которой есть мы',
    'за хорошее безумие', 'за пожар, который не хочется тушить', 'за то, что ты помнишь важное', 'за то, что рядом с тобой хочется запоминать всё', 'за простые прогулки', 'за совместную готовку', 'за умение делать дом из любого места', 'за то, что иногда достаточно просто молчать рядом', 'за все «давай ещё немного побудем»', 'за то, что с тобой не хочется торопиться домой — потому что ты и есть дом',
    'за то, что после разлуки мы всё-таки нашли друг друга', 'за нынешнее «снова вместе»', 'за выбор, который мы делаем не один раз', 'за то, что ты умеешь быть моей радостью', 'за то, что можно скучать по тебе даже через час', 'за запах малины без объяснений', 'за закатный свет, который теперь всегда напоминает о тебе', 'за твой взгляд на маленькие сюрпризы', 'за то, что ты остаёшься собой', 'за то, что твоя нежность не слабость',
    'за мечту о двух кружках на кухне', 'за будущий дом, в котором нас ждут', 'за котёнка, которого мы ещё не выбрали', 'за возможность однажды сказать «я дома»', 'за мечты о дороге и любимых машинах', 'за маленькую мечту о Hellcat', 'за мысль о путешествиях', 'за возможную Японию или другой наш город', 'за мальчика и девочку, которым будет очень много любви', 'за будущее, которое не страшно представлять',
    'за то, что я хочу с тобой обычные дни', 'за дождь за окном, который когда-нибудь будет нашим', 'за утро, которое захочется начинать рядом', 'за вечер, в который хочется возвращаться', 'за всё, что мы ещё не прожили', 'за всё, что уже стало нашим', 'за то, что история всё ещё пишется', 'за то, что мне каждый раз хочется выбирать тебя', 'за то, что ты просто ты'
  ];

  function setupReveal() {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  }

  function renderReasons() {
    const grid = document.querySelector('#reason-grid');
    if (!grid) return;
    reasons.forEach((reason, index) => {
      const card = document.createElement('article');
      card.className = 'reason-card reveal';
      card.tabIndex = 0;
      card.innerHTML = `<span class="reason-card__number">${String(index + 1).padStart(2, '0')}</span><p>Потому что ${reason}.</p>`;
      grid.append(card);
    });
    const finalCard = document.createElement('article');
    const isUnlocked = KarinaState.get().reason100Unlocked;
    finalCard.className = `reason-card ${isUnlocked ? 'reason-card--special' : 'reason-card--locked'} reveal`;
    finalCard.innerHTML = isUnlocked
      ? '<span class="reason-card__number">100</span><p>Потому что ты сказала «да».</p>'
      : '<span class="reason-card__number">100</span><p>Эта причина пока ждёт своего момента.</p>';
    grid.append(finalCard);
    setupReveal();
  }

  function setupStory() {
    const proposal = document.querySelector('#proposal');
    const yesButton = document.querySelector('#proposal-yes');
    const thinkButton = document.querySelector('#proposal-think');
    document.querySelectorAll('[data-memory]').forEach((button) => button.addEventListener('click', () => {
      const answer = document.querySelector(`#${button.dataset.memory}`);
      if (answer) answer.hidden = !answer.hidden;
    }));
    if (!proposal) return;
    if (KarinaState.get().proposalAnswered) proposal.classList.add('is-answered');
    yesButton.addEventListener('click', () => {
      // A proposal answer is private; only the admin panel controls card №100.
      KarinaState.set({ proposalAnswered: true, reason100Unlocked: false });
      proposal.classList.add('is-answered');
    });
    let moveCount = 0;
    thinkButton.addEventListener('pointerenter', () => {
      if (moveCount >= 3 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      moveCount += 1;
      thinkButton.style.transform = `translate(${moveCount % 2 ? 18 : -18}px, ${moveCount === 3 ? 8 : 0}px)`;
    });
    thinkButton.addEventListener('click', () => {
      thinkButton.textContent = 'Я подожду, Лися';
      thinkButton.style.transform = 'none';
    });
  }

  function setupGarden() {
    const note = document.querySelector('#garden-note');
    document.querySelectorAll('.garden-object').forEach((object) => object.addEventListener('click', () => {
      note.innerHTML = `<strong>${object.dataset.title}</strong><p>${object.dataset.memory}</p>`;
    }));
  }

  renderReasons(); setupStory(); setupGarden(); setupReveal();
}());
