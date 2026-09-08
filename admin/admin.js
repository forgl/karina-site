(function () {
  const passwordKey = 'karina-admin-password';
  const accessCard = document.querySelector('#access-card');
  const dashboard = document.querySelector('#dashboard');
  const accessForm = document.querySelector('#access-form');
  const passwordInput = document.querySelector('#admin-password');
  const accessText = document.querySelector('#access-text');
  const accessHint = document.querySelector('#access-hint');
  const dialog = document.querySelector('#confirm-dialog');

  function showDashboard() { accessCard.hidden = true; dashboard.hidden = false; updateDashboard(); }
  function updateDashboard() {
    const state = KarinaState.get();
    document.querySelector('#reasons-status').textContent = state.reason100Unlocked ? '100 причин открыто' : '99 + 1 скрыта';
    document.querySelector('#proposal-status').textContent = state.proposalAnswered ? '❤️ Ответ получен' : '🔒 Не активировано';
    document.querySelector('#music-status').textContent = state.musicEnabled ? 'Включена пользователем' : 'Интерфейс готов';
    document.querySelector('#reason-description').textContent = state.reason100Unlocked ? '⚡ Причина №100 открыта: «Потому что ты сказала “да”.»' : '🔒 Причина №100 скрыта до особого момента.';
    const unlockButton = document.querySelector('#unlock-button');
    const lockButton = document.querySelector('#lock-button');
    unlockButton.disabled = state.reason100Unlocked;
    unlockButton.textContent = state.reason100Unlocked ? 'Причина №100 уже открыта' : 'Открыть причину №100';
    lockButton.hidden = !state.reason100Unlocked;
  }

  if (!localStorage.getItem(passwordKey)) {
    accessText.textContent = 'Первый запуск: придумайте локальный пароль для этой панели.';
    accessHint.textContent = 'Пароль сохранится только в этом браузере. Статический GitHub Pages не может безопасно хранить общий пароль без сервиса авторизации.';
  }
  accessForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const savedPassword = localStorage.getItem(passwordKey);
    if (!savedPassword) { localStorage.setItem(passwordKey, passwordInput.value); sessionStorage.setItem('karina-admin-session', 'true'); showDashboard(); return; }
    if (passwordInput.value === savedPassword) { sessionStorage.setItem('karina-admin-session', 'true'); showDashboard(); }
    else { accessText.textContent = 'Пароль не подошёл. Попробуйте ещё раз.'; passwordInput.select(); }
  });
  if (sessionStorage.getItem('karina-admin-session') === 'true') showDashboard();
  document.querySelector('#unlock-button').addEventListener('click', () => dialog.showModal());
  document.querySelector('#lock-button').addEventListener('click', () => {
    KarinaState.set({ reason100Unlocked: false });
    updateDashboard();
  });
  dialog.addEventListener('close', () => { if (dialog.returnValue === 'confirm') { KarinaState.set({ reason100Unlocked: true }); updateDashboard(); } });
  document.querySelector('#refresh-button').addEventListener('click', updateDashboard);
  document.querySelector('#logout-button').addEventListener('click', () => { sessionStorage.removeItem('karina-admin-session'); dashboard.hidden = true; accessCard.hidden = false; passwordInput.value = ''; });
  window.addEventListener('karina-state-change', updateDashboard);
}());
