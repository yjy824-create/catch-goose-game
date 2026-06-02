import { useEffect, useState } from 'react';
import { Download, Smartphone } from 'lucide-react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const isStandalone = () => {
  if (typeof window === 'undefined') return false;
  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia('(display-mode: standalone)').matches || Boolean(navigatorWithStandalone.standalone);
};

const isIosSafari = () => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(ua);
  const isSafari = /safari/.test(ua) && !/crios|fxios|edgios/.test(ua);
  return isIos && isSafari;
};

const PWAInstallPrompt = () => {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  if (installed) {
    return (
      <section className="install-card" aria-label="桌面安裝狀態">
        <Smartphone size={18} strokeWidth={2.7} />
        <span>已可從手機桌面開啟</span>
      </section>
    );
  }

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome !== 'dismissed') {
      setInstallEvent(null);
    }
  };

  return (
    <section className="install-card" aria-label="加入手機桌面提示">
      <Smartphone size={18} strokeWidth={2.7} />
      <span>{isIosSafari() ? 'Safari 分享 → 加入主畫面' : '可以把遊戲加入手機桌面'}</span>
      {installEvent && (
        <button type="button" onClick={handleInstall}>
          <Download size={16} strokeWidth={2.8} />
          <span>安裝到桌面</span>
        </button>
      )}
    </section>
  );
};

export default PWAInstallPrompt;
