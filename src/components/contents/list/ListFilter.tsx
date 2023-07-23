import { useIsDesktop, useWindowWidth } from '@turistikrota/ui/cjs/hooks/dom'
import { ContentProps } from '~/features/place.types'
import ContentLoader from '@turistikrota/ui/cjs/loader'
import MobileFilterSection from '~/components/filter/MobileFilterSection'
import DesktopFilterSection from '~/components/filter/DesktopFilterSection'

export default function ListFilter({ data, loading }: ContentProps) {
  const isWidthExist = useWindowWidth()
  const isDesktop = useIsDesktop()

  if (!isWidthExist) return <ContentLoader />

  return (
    <>
      {!isDesktop && <MobileFilterSection data={data} loading={loading} />}
      {isDesktop && <DesktopFilterSection data={data} loading={loading} />}
    </>
  )
}
