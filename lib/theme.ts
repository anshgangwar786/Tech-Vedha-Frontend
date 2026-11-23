export const THEME_STORAGE_KEY = "tv-theme";

/**
 * Runs before first paint (inlined in <head>) so the page never flashes the wrong theme.
 * Order: saved choice → operating-system preference → dark.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})();`;

/**
 * Also inlined in <head>: turns on the scroll-reveal styles (see app/globals.css) only when
 * JavaScript runs and the visitor allows motion, so content is never hidden otherwise.
 */
export const REVEAL_BOOT_SCRIPT = `(function(){try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("reveal-ready")}catch(e){}})();`;
