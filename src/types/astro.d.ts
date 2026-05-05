export {};

declare global {
  interface Window {
    __configBase__: string;
    openSheet: (id: string) => void;
    closeSheet: (id: string) => void;
    setTheme: (t: string) => void;
    setFontSize: (v: string) => void;
    setFont: (t: string) => void;
    setLineHeight: (v: string) => void;
    setParaSpacing: (v: string) => void;
    setTextAlign: (align: string) => void;
    toggleTTS: () => void;
    updateTTSIcon: () => void;
    updateTTSProgress: (pct: number) => void;
    setTTSRate: (v: string) => void;
    setTTSPitch: (v: string) => void;
    seekTTS: (val: string) => void;
  }
}