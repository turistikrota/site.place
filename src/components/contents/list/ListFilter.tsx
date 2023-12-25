import { useIsDesktop, useWindowWidth } from '@turistikrota/ui/hooks/dom'
import DesktopFilterSection from '~/components/filter/DesktopFilterSection'
import MobileFilterSection from '~/components/filter/MobileFilterSection'
import { ContentProps } from '~/features/place.types'

export default function ListFilter({ data, loading }: ContentProps) {
  const isWidthExist = useWindowWidth()
  const isDesktop = useIsDesktop()

  if (!isWidthExist) return <></>

  return (
    <>
      {!isDesktop && <MobileFilterSection data={data} loading={loading} />}
      {isDesktop && <DesktopFilterSection data={data} loading={loading} />}
    </>
  )
}
