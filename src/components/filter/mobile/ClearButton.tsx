import { useTranslation } from 'next-i18next'

type Props = {
  onClear?: () => void
  text?: string
}

const ClearButton: React.FC<Props> = ({ onClear, text }) => {
  const { t } = useTranslation('common.ux.button')
  return (
    <span
      className=' text-primary hover:opacity-90 transition-colors'
      onClick={() => onClear && onClear()}
      role='button'
      title={t('clear-filter')}
      aria-label={t('clear-filter')}
    >
      {text ?? t('clear')}
    </span>
  )
}

export default ClearButton
