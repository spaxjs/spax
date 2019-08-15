import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

interface AnyObject<V = any> {
  [key: string]: V;
}

const NS = "translation";

export function setup(lng: string = "zh") {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      lng,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
}

export function useRes(ns: string = NS) {
  return useTranslation(ns.toLowerCase());
}

export function addRes(resources: AnyObject<AnyObject>, ns: string = NS) {
  Object.entries(resources).forEach(([lng, res]) => {
    i18n.addResourceBundle(lng, ns.toLowerCase(), res, true, true);
  });
}

export function setLng(lng: string) {
  i18n.changeLanguage(lng);
}
