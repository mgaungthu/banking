import i18n, {LanguageDetectorAsyncModule, Services, InitOptions} from 'i18next'
import {initReactI18next} from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import en from '../locales/en.json'
import ar from '../locales/ar.json'
import ja from '../locales/ja.json'
import ko from '../locales/ko.json'
import tr from '../locales/tr.json'
import ru from '../locales/ru.json'
import es from '../locales/es.json'
import zh from '../locales/zh.json'
import it from '../locales/it.json'
import fr from '../locales/fr.json'
import de from '../locales/de.json'
import pt from '../locales/pt.json'

import * as RNLocalize from 'react-native-localize';
const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: (
    _services: Services,
    _detectorOptions: object,
    _i18nextOptions: InitOptions,
  ) => {
   
  },
  detect: (callback: (lng: string) => void) => {
    AsyncStorage.getItem('appLanguage', (err, lng) => {
      // Error fetching stored data or no language was stored
      if (err || !lng) {
        if (err) {
          // console.log('Error fetching "appLanguage" from async store', err)
        } else {
          // console.log(
          //   'No language is set, choosing the best available or English as fallback',
          // )
        }
        // const bestLng = RNLocalize.findBestAvailableLanguage([en,ar,ja,ko,tr,ru,es,zh,itfr]);
        // callback(bestLng?.languageTag ?? 'en');
        callback("en")
        return
      }       
      callback(lng)
    })
  },
  cacheUserLanguage: (lng: string) => {
    AsyncStorage.setItem('appLanguage', lng)
  },
}

i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
      ja: {
        translation: ja,
      },
      ko: {
        translation: ko,
      },
      tr: {
        translation: tr,
      },
      ru: {
        translation: ru
      },
      es: {
        translation: es
      },
      zh: {
        translation: zh
      },
      it: {
        translation: it
      },  
      fr: {
        translation: fr
      },
      de: {
        translation: de
      },
      pt: {
        translation: pt
      },
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  })
