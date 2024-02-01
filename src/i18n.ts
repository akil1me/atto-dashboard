import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locales/en.json";
import uz from "../public/locales/uz.json";
import ru from "../public/locales/ru.json";

const resources = {
  uz,
  en,
  ru,
};

function determineLanguage() {
  const storedLanguage = localStorage.getItem("lang");
  if (storedLanguage) {
    return JSON.parse(storedLanguage);
  }

  const browserLanguage = navigator.language;
  if (browserLanguage.startsWith("en")) {
    return "en";
  } else if (browserLanguage === "uz") {
    return "uz";
  } else if (browserLanguage === "ru") {
    return "ru";
  } else {
    return "en";
  }
}

const selectedLanguage = determineLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: selectedLanguage,
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
