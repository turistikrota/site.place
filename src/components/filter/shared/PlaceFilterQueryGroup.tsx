import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { MobileInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import Input from '@turistikrota/ui/cjs/form/input'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceFilterQueryGroup() {
  const [word, setWord] = useState<string>('')
  const { t } = useTranslation('filter.components.query')
  const { query, push } = usePlaceFilter()

  useEffect(() => {
    if (!!query.filter.query && query.filter.query !== word) {
      setWord(query.filter.query)
    }
  }, [query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
    query.filter.query = e.target.value
    push(query)
  }

  return (
    <>
      <MobileInfoBox>{t('description')}</MobileInfoBox>
      <Input label={t('label')} name='word' value={word} onChange={handleChange} />
    </>
  )
}
