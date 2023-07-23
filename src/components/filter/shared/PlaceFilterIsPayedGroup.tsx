import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { DesktopInfoBox, MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Checkbox from '@turistikrota/ui/form/checkbox'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceFilterIsPayedGroup() {
  const [isPayed, setIsPayed] = useState<boolean>(false)
  const { t } = useTranslation('filter.components.is-payed')
  const { query, push } = usePlaceFilter()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!!query.filter.isPayed && query.filter.isPayed !== isPayed) {
      setIsPayed(query.filter.isPayed)
    }
  }, [query])

  const handleChange = (val: boolean) => {
    setIsPayed(val)
    query.filter.isPayed = val
    push(query)
  }

  return (
    <>
      <MobileInfoBox>{t('description')}</MobileInfoBox>
      <Checkbox name='isPayed' id='isPayed' onChange={handleChange} value={isPayed} reversed={!isDesktop}>
        {t('label')}
        <DesktopInfoBox>{t('description')}</DesktopInfoBox>
      </Checkbox>
    </>
  )
}
