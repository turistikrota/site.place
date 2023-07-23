import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { DesktopInfoBox, MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Checkbox from '@turistikrota/ui/form/checkbox'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { usePlaceFilter } from '~/features/place.filter'
import { Locales } from '@turistikrota/ui/types'
import Spin from 'sspin'
import { usePlaceFeatures } from '~/hooks/usePlaceFeatures'

type Props = {
  onClose: () => void
}

const PLaceFilterFeatureGroup: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([])
  const { features, isLoading } = usePlaceFeatures()
  const isDesktop = useIsDesktop()
  const { t, i18n } = useTranslation('filter.components.features')
  const { query, push } = usePlaceFilter()

  useEffect(() => {
    if (!!query.filter.featureUUIDs && !query.filter.featureUUIDs.every((uuid) => selected.find((f) => f === uuid))) {
      setSelected([...query.filter.featureUUIDs])
    }
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
        <MobileInfoBox>{t('description')}</MobileInfoBox>
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
