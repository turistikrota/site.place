import { DesktopInfoBox, MobileInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import Checkbox from '@turistikrota/ui/cjs/form/checkbox'
import { useIsDesktop } from '@turistikrota/ui/cjs/hooks/dom'
import { Locales } from '@turistikrota/ui/cjs/types'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import Spin from 'sspin'
import { usePlaceFilter } from '~/hooks/place.filter'
import { usePlaceFeatures } from '~/hooks/usePlaceFeatures'

type Props = {
  onClose: () => void
}

const PLaceFilterFeatureGroup: React.FC = () => {
  const { features, isLoading } = usePlaceFeatures()
  const isDesktop = useIsDesktop()
  const { t, i18n } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const selected = useMemo(() => {
    if (!query.filter.featureUUIDs) return []
    return query.filter.featureUUIDs
  }, [query])

  const handleChange = (uuid: string) => {
    let newList: string[] = []
    if (selected.includes(uuid)) {
      newList = selected.filter((item) => item !== uuid)
    } else {
      newList = [...selected, uuid]
    }
    push({
      ...query,
      filter: {
        ...query.filter,
        featureUUIDs: newList,
      },
    })
  }

  return (
    <section>
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
    </section>
  )
}

export default PLaceFilterFeatureGroup
