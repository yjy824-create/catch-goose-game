export const registerServiceWorker = () => {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.info('Service worker registration skipped:', error);
    });
  });
};
