import { useTranslation } from 'next-i18next'

export const useBraceText = (texts: string[]): string => {
  const { t } = useTranslation('common')
  if (texts.length === 0) return ''
  if (texts.length === 1) return texts[0]
  const last = texts.pop()
  const firsts = texts.join(', ')
  return `${firsts} ${t('brace.and')} ${last}`
}
