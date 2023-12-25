import { DesktopInfoBox, MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Checkbox from '@turistikrota/ui/form/checkbox'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { deepMerge } from '@turistikrota/ui/utils'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { usePlaceFilter } from '~/hooks/place.filter'

export default function PlaceFilterIsPayedGroup() {
  const [isPayed, setIsPayed] = useState<boolean | undefined>(undefined)
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (typeof query.filter.isPayed !== 'undefined' && query.filter.isPayed !== isPayed) {
      setIsPayed(query.filter.isPayed)
    } else if (typeof query.filter.isPayed === 'undefined') {
      setIsPayed(undefined)
    }
  }, [query])

  const handlePayedChange = (val: boolean) => {
    setIsPayed(val === true ? true : undefined)
    push(deepMerge(query, { filter: { isPayed: val === true ? true : undefined } }))
  }

  const handleFreeChange = (val: boolean) => {
    setIsPayed(val === true ? false : undefined)
    push(deepMerge(query, { filter: { isPayed: val === true ? false : undefined } }))
  }

  return (
    <div className='space-y-2 lg:space-y-0'>
      <MobileInfoBox>{t('components.is-payed.description')}</MobileInfoBox>
      <Checkbox name='isPayed' id='isPayed' onChange={handlePayedChange} value={isPayed === true} reversed={!isDesktop}>
        {t('components.is-payed.label')}
        <DesktopInfoBox>{t('components.is-payed.description')}</DesktopInfoBox>
      </Checkbox>
      <Checkbox name='isPayed' id='free' onChange={handleFreeChange} value={isPayed === false} reversed={!isDesktop}>
        {t('components.is-free.label')}
        <DesktopInfoBox>{t('components.is-free.description')}</DesktopInfoBox>
      </Checkbox>
    </div>
  )
}
