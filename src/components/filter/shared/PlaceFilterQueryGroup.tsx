import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Input from '@turistikrota/ui/form/input'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { usePlaceFilter } from '~/hooks/place.filter'

export default function PlaceFilterQueryGroup() {
  const [word, setWord] = useState<string>('')
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  useEffect(() => {
    if (!!query.filter.query && query.filter.query !== word) {
      setWord(query.filter.query)
    } else if (!query.filter.query && word !== '') {
      setWord('')
    }
  }, [query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
    push({
      ...query,
      filter: {
        ...query.filter,
        query: e.target.value,
      },
    })
  }

  return (
    <>
      <MobileInfoBox>{t('components.query.description')}</MobileInfoBox>
      <Input label={t('components.query.label')} name='word' value={word} onChange={handleChange} />
    </>
  )
}
