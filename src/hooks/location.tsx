import cities, { City } from '~/static/location/cities'
export const useCities = (filter: string | null): City[] => {
  if (filter === null) {
    return cities
  }
  return cities.filter((city: City) => {
    return city.name.toLocaleLowerCase('tr').includes(filter.toLocaleLowerCase('tr'))
  })
}
