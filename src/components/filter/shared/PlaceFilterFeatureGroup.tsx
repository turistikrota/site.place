import { DesktopInfoBox, MobileInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import Checkbox from '@turistikrota/ui/cjs/form/checkbox'
import { useIsDesktop } from '@turistikrota/ui/cjs/hooks/dom'
import { Locales } from '@turistikrota/ui/cjs/types'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import Spin from 'sspin'
import { usePlaceFilter } from '~/hooks/place.filter'
import { usePlaceFeatures } from '~/hooks/usePlaceFeatures'
import { deepMerge } from '~/utils/deepMerge'

type Props = {
  onClose: () => void
}

const PLaceFilterFeatureGroup: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([])
  const { features, isLoading } = usePlaceFeatures()
  const isDesktop = useIsDesktop()
  const { t, i18n } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  useEffect(() => {
    const newFeatureUUIDs =
      query.filter.featureUUIDs && query.filter.featureUUIDs.length ? query.filter.featureUUIDs : []
    push(deepMerge(query, { filter: { featureUUIDs: newFeatureUUIDs } }))
  }, [query])

  const handleChange = (uuid: string) => {
    let newList: string[] = []
    if (selected.includes(uuid)) {
      newList = selected.filter((item) => item !== uuid)
    } else {
      newList = [...selected, uuid]
    }
    setSelected(newList)
    query.filter.featureUUIDs = newList
    push(query)
  }

  return (
    <Spin loading={isLoading}>
      <div className='space-y-4 lg:space-y-0'>
        <MobileInfoBox>{t('components.features.description')}</MobileInfoBox>
        {features.map((feature) => (
          <Checkbox
            key={feature.uuid}
            id={feature.uuid}
            name='feature'
            value={selected.includes(feature.uuid)}
            onChange={() => handleChange(feature.uuid)}
            reversed={!isDesktop}
            effect={isDesktop ? 'hover' : undefined}
          >
            {feature.translations[i18n.language as Locales].title}
            <DesktopInfoBox>{feature.translations[i18n.language as Locales].description}</DesktopInfoBox>
          </Checkbox>
        ))}
      </div>
    </Spin>
  )
}

export default PLaceFilterFeatureGroup
