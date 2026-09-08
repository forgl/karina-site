/* Shared browser state. It works locally and on GitHub Pages without a server. */
(function () {
  const storageKey = 'karina-site-state';
  const defaultState = {
    reason100Unlocked: false,
    proposalAnswered: false,
    musicEnabled: false
  };

  function get() {
    try {
      return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || '{}') };
    } catch (error) {
      return { ...defaultState };
    }
  }

  function set(changes) {
    const nextState = { ...get(), ...changes };
    localStorage.setItem(storageKey, JSON.stringify(nextState));
    window.dispatchEvent(new CustomEvent('karina-state-change', { detail: nextState }));
    return nextState;
  }

  window.KarinaState = { get, set, storageKey };
}());
