/**
 * i18n Tool Script
 * Detects browser language and converts between Traditional and Simplified Chinese
 */

import { Converter, HTMLConverter, Locale } from 'opencc-js';

/**
 * Detect browser language and return 'traditional' or 'simplified'
 * Logic:
 *   - zh-CN → simplified
 *   - zh-SG → simplified
 *   - Other languages → traditional
 */
export function detectLanguage(): 'traditional' | 'simplified' {
  const browserLang = navigator.language ?? (navigator as unknown as { userLanguage?: string }).userLanguage ?? 'zh-TW';

  // Check for Simplified Chinese locales
  if (browserLang === 'zh-CN' || browserLang === 'zh-SG') {
    return 'simplified';
  }

  // All other languages default to Traditional Chinese
  return 'traditional';
}

/**
 * Initialize language conversion
 * If browser is Simplified Chinese, convert the entire page
 */
export async function initLanguage(): Promise<void> {
  const lang = detectLanguage();

  if (lang === 'simplified') {
    try {
      await convertToSimplified();
    } catch (error) {
      console.error('Failed to convert to Simplified Chinese:', error);
    }
  }
}

/**
 * Convert the entire page from Traditional to Simplified Chinese
 */
async function convertToSimplified(): Promise<void> {
  try {
    // Create converter: Traditional Chinese (Taiwan) to Simplified Chinese (Mainland China)
    const converter = Converter({
      from: Locale.TW,
      to: Locale.CN
    });

    // Get root element
    const rootNode = document.documentElement;

    // Create HTML converter handler
    // Convert from zh-TW to zh-CN
    const htmlConverter = HTMLConverter(converter, rootNode, 'zh-TW', 'zh-CN');

    // Perform conversion
    htmlConverter.convert();
  } catch (error) {
    console.error('Error during Chinese conversion:', error);
    throw error;
  }
}

/**
 * Restore the page to Traditional Chinese
 * (Useful if user wants to switch back)
 */
export function restoreLanguage(): void {
  // This would require storing the original state
  // For now, a page reload would be needed to restore original content
  console.log('To restore Traditional Chinese, please reload the page');
}