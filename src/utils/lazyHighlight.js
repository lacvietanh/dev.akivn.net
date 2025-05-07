// Lazy load highlight.js để giảm kích thước initial bundle
// Chỉ import core và các ngôn ngữ thực sự sử dụng

import hljsInstance from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml'; // For HTML
import css from 'highlight.js/lib/languages/css';

// Register languages that are imported statically
hljsInstance.registerLanguage('javascript', javascript);
hljsInstance.registerLanguage('jsx', javascript); // Alias for JSX
hljsInstance.registerLanguage('html', xml);
hljsInstance.registerLanguage('xml', xml);
hljsInstance.registerLanguage('css', css);

const languageAliases = {
  shell: 'bash',
  sh: 'bash',
  zsh: 'bash',
  vue: 'html', // vue files often use html for template part
  // Add more aliases as needed
};

// Cache for loaded languages, initialized with statically loaded ones
const loadedLanguages = {
  javascript: true,
  jsx: true,
  html: true,
  xml: true,
  css: true,
};

const doLoadLanguage = async (lang) => {
  if (!lang) return false;
  const actualLang = languageAliases[lang.toLowerCase()] || lang.toLowerCase();

  if (loadedLanguages[actualLang]) {
    return true;
  }

  let module;
  try {
    // Attempt to load common languages with specific imports first for better bundling
    switch (actualLang) {
      case 'typescript':
      case 'ts':
        module = await import('highlight.js/lib/languages/typescript');
        break;
      case 'bash':
        module = await import('highlight.js/lib/languages/bash');
        break;
      case 'markdown':
      case 'md':
        module = await import('highlight.js/lib/languages/markdown');
        break;
      case 'json':
        module = await import('highlight.js/lib/languages/json');
        break;
      case 'php':
        module = await import('highlight.js/lib/languages/php');
        break;
      case 'python':
      case 'py':
        module = await import('highlight.js/lib/languages/python');
        break;
      case 'rust':
      case 'rs':
        module = await import('highlight.js/lib/languages/rust');
        break;
      case 'yaml':
      case 'yml':
        module = await import('highlight.js/lib/languages/yaml');
        break;
      // Add more common languages here
      default:
        // Fallback for other languages using pure dynamic import
        try {
          module = await import(/* @vite-ignore */ `highlight.js/lib/languages/${actualLang}`);
        } catch (e) {
          console.warn(`Dynamically loading language '${actualLang}' failed. It might not be a separate module or doesn't exist.`, e);
          return false;
        }
    }

    if (module && module.default) {
      hljsInstance.registerLanguage(actualLang, module.default);
      loadedLanguages[actualLang] = true;
      // If the original lang was an alias, mark it as loaded too for future direct alias checks
      if (lang.toLowerCase() !== actualLang) {
        loadedLanguages[lang.toLowerCase()] = true;
      }
      return true;
    } else {
      console.warn(`Module for language '${actualLang}' loaded but was empty or had no default export.`);
      // loadedLanguages[actualLang] = false; // Mark as failed to avoid retries if needed
      return false;
    }
  } catch (e) {
    console.error(`Failed to load language module for: ${actualLang} (from ${lang})`, e);
    // loadedLanguages[actualLang] = false;
    return false;
  }
};

export default {
  getHljs: () => hljsInstance,
  loadLanguage: doLoadLanguage,
};
