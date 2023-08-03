type Props = {
  star: number
  iconSize?: string
}

export default function FiveStars({ star, iconSize = '' }: Props) {
  const halfStars = star < 5 && star % 1 > 0 ? 1 : 0
  const emptyStars = 5 - Math.trunc(star > 5 ? 5 : star) - halfStars
  return (
    <div className='flex'>
      {[...Array(Math.trunc(star > 5 ? 5 : star))].map((_, index) => (
        <i key={index} className={`bx bxs-star text-secondary ${iconSize ? iconSize : ''}`}></i>
      ))}
      {halfStars > 0 && <i className={`bx bxs-star-half text-secondary ${iconSize ? iconSize : ''}`}></i>}
      {emptyStars > 0 &&
        [...Array(emptyStars)].map((_, index) => (
          <i key={index} className={`bx bx-star text-secondary ${iconSize ? iconSize : ''}`}></i>
        ))}
    </div>
  )
}
