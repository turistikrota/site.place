import PlaceDesktopCityGroup from './PlaceDesktopCityGroup'
import PlaceDesktopDistanceGroup from './PlaceDesktopDistanceGroup'
import PlaceDesktopFeatureGroup from './PlaceDesktopFeatureGroup'
import PlaceDesktopMinReviewGroup from './PlaceDesktopMinReviewGroup'
import PlaceDesktopIsPayedGroup from './PlaceDesktopOtherGroup'
import PlaceDesktopQueryGroup from './PlaceDesktopQueryGroup'
import PlaceDesktopTimeSpentGroup from './PlaceDesktopTimeSpentGroup'
import PlaceDesktopTypeGroup from './PlaceDesktopTypeGroup'

export default function PlaceFilterSection() {
  return (
    <>
      <PlaceDesktopCityGroup />
      <PlaceDesktopDistanceGroup />
      <PlaceDesktopTypeGroup />
      <PlaceDesktopFeatureGroup />
      <PlaceDesktopQueryGroup />
      <PlaceDesktopTimeSpentGroup />
      <PlaceDesktopMinReviewGroup />
      <PlaceDesktopIsPayedGroup />
    </>
  )
}
