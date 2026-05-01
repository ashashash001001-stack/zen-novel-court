// src/components/reader/ReaderSettings.tsx
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getPreferences, setPreferences, applyPreferences, type ReaderPreferences } from '../../scripts/reader-settings';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FONTS = [
  { value: 'Noto Sans TC', label: '思源黑體' },
  { value: 'Noto Serif TC', label: '思源宋體' },
  { value: 'system-ui', label: '系統預設' },
  { value: 'PingFang TC', label: '蘋方體' },
  { value: 'Microsoft JhengHei', label: '微軟正黑體' }
];

const THEMES = [
  { value: 'light', label: '紙張白', color: '#FDFBF7' },
  { value: 'sepia', label: '羊皮紙', color: '#F5F0E8' },
  { value: 'green', label: '護眼綠', color: '#E8F0E8' },
  { value: 'dark', label: '夜間模式', color: '#1E1E1C' },
  { value: 'high-contrast', label: '高對比', color: '#000000' }
];

export default function ReaderSettings({ isOpen, onClose }: Props) {
  const [prefs, setPrefs] = useState<ReaderPreferences>(getPreferences());

  useEffect(() => {
    if (isOpen) applyPreferences(prefs);
  }, [prefs, isOpen]);

  const update = (key: keyof ReaderPreferences, value: any) => {
    const updated = setPreferences({ [key]: value });
    setPrefs(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="reader-settings-overlay" onClick={onClose}>
      <div className="reader-settings-panel" onClick={e => e.stopPropagation()}>
        <div className="reader-settings-header">
          <h3>閱讀設定</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="reader-settings-section">
          <label>字體大小</label>
          <div className="font-size-control">
            <button onClick={() => update('fontSize', Math.max(12, prefs.fontSize - 1))}>A-</button>
            <span className="font-size-value">{prefs.fontSize}px</span>
            <button onClick={() => update('fontSize', Math.min(24, prefs.fontSize + 1))}>A+</button>
          </div>
          <input
            type="range" min="12" max="24" value={prefs.fontSize}
            onChange={e => update('fontSize', parseInt((e.target as HTMLInputElement).value))}
          />
        </div>

        <div className="reader-settings-section">
          <label>字體</label>
          <select value={prefs.fontFamily} onChange={e => update('fontFamily', (e.target as HTMLSelectElement).value)}>
            {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>

        <div className="reader-settings-section">
          <label>行距</label>
          <input
            type="range" min="1.5" max="2.5" step="0.1"
            value={prefs.lineHeight}
            onChange={e => update('lineHeight', parseFloat((e.target as HTMLInputElement).value))}
          />
          <span className="value-label">{prefs.lineHeight}</span>
        </div>

        <div className="reader-settings-section">
          <label>段落間距</label>
          <input
            type="range" min="0" max="2" step="0.25"
            value={prefs.paragraphSpacing}
            onChange={e => update('paragraphSpacing', parseFloat((e.target as HTMLInputElement).value))}
          />
          <span className="value-label">{prefs.paragraphSpacing}em</span>
        </div>

        <div className="reader-settings-section">
          <label>對齊</label>
          <div className="toggle-group">
            <button
              className={prefs.textAlign === 'left' ? 'active' : ''}
              onClick={() => update('textAlign', 'left')}
            >靠左</button>
            <button
              className={prefs.textAlign === 'justify' ? 'active' : ''}
              onClick={() => update('textAlign', 'justify')}
            >分散</button>
          </div>
        </div>

        <div className="reader-settings-section">
          <label>主題</label>
          <div className="theme-grid">
            {THEMES.map(t => (
              <button
                key={t.value}
                className={`theme-btn ${prefs.theme === t.value ? 'active' : ''}`}
                onClick={() => update('theme', t.value)}
                style={{ backgroundColor: t.color }}
                title={t.label}
              >
                {prefs.theme === t.value && <span className="check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}