import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enNs1 from './en/ns1.json'
import enNs2 from './en/ns2.json'
import viNs1 from './vi/ns1.json'
import viNs2 from './vi/ns2.json'

export const defaultNS = 'ns1'

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  defaultNS,
  resources: {
    en: {
      ns1: enNs1,
      ns2: enNs2
    },
    vi: {
      ns1: viNs1,
      ns2: viNs2
    }
  }
})

export default i18next
