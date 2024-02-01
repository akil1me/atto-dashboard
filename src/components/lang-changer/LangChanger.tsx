import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "usehooks-ts";
import { LanguageType } from "../../@types";
import { Radio } from "antd";

export const languages: LanguageType[] = ["uz", "ru", "en"];

export const LangChanger = () => {
  const [lang, setLang] = useLocalStorage<LanguageType>("lang", "ru");
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lang: LanguageType) => {
      i18n.changeLanguage(lang);
      setLang(lang);
    },
    [i18n, setLang, lang]
  );

  return (
    <Radio.Group
      buttonStyle="solid"
      defaultValue={lang}
      onChange={(e) => changeLanguage(e.target.value)}
      size="small"
    >
      {languages.map((lang, index) => (
        <Radio.Button key={index} value={lang}>
          <span className={`fi fi-${lang === "en" ? "gb" : lang}`}></span>
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
