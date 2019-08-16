import i18n, { InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-fetch-backend";
import { recursive } from "merge";
import { initReactI18next, useTranslation } from "react-i18next";

interface AnyObject<V = any> {
  [key: string]: V;
}

export function setup(options: InitOptions) {
  i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/perrin4869/i18next-fetch-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(recursive({
      interpolation: {
        // react already safes from xss
        escapeValue: false,
      },
      // allows some resources to be set on initialization while others can be loaded using a backend connector
      partialBundledLanguages: true,
    }, options));
}

export function useT(ns: string = i18n.options.defaultNS[0]) {
  return useTranslation(ns.toLowerCase(), { useSuspense: false });
}

export function addT(resources: AnyObject<AnyObject>, ns: string = i18n.options.defaultNS[0]) {
  Object.entries(resources).forEach(([lng, res]) => {
    i18n.addResourceBundle(lng, ns.toLowerCase(), res, true, true);
  });
}

export function changeLng(lng: string) {
  i18n.changeLanguage(lng);
}
