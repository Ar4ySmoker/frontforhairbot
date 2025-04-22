interface TelegramWebApp {
    initData: string;
    initDataUnsafe: any;
    expand(): void;
    close(): void;
    sendData(data: string): void;
    onEvent(eventType: string, callback: () => void): void;
    offEvent(eventType: string, callback: () => void): void;
    MainButton: {
      text: string;
      color?: string;
      textColor?: string;
      isVisible: boolean;
      isActive: boolean;
      show(): void;
      hide(): void;
      enable(): void;
      disable(): void;
      onClick(callback: () => void): void;
    };
  }
  
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
  