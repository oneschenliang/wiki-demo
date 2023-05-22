import i18n from 'i18next';
import { wiki } from './en';
import { wiki as zhWiki } from './zh';

const lang = 'zh'

const langs ={
  zh: zhWiki,
  en: wiki
} 

i18n.init({
  lng: lang, // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    [lang]: {translation: langs[lang]},
    // zh: zhWiki
  }
})
