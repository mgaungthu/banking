import i18n from 'i18next'

export function strings (name: string, params = {}) {
  return i18n.t(name, params)
}

export default i18n
