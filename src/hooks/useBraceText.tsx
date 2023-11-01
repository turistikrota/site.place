import { useTranslation } from 'next-i18next'

export const useBraceText = (strings: string[]): string => {
  const { t } = useTranslation('common')
  if (strings.length === 0) return ''
  if (strings.length === 1) return strings[0]
  if (strings.length === 2) return `${strings[0]} ${t('brace.and')} ${strings[1]}`
  return `${strings.slice(0, strings.length - 1).join(', ')} ${t('brace.and')} ${strings[strings.length - 1]}`
}
