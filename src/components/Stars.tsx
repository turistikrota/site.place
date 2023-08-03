type Props = {
  star: number
  iconSize?: string
}

export default function FiveStars({ star, iconSize = '' }: Props) {
  const emptyStars = 5 - star
  return (
    <div className='flex'>
      {[...Array(star)].map((_, index) => (
        <i key={index} className={`bx bxs-star text-secondary ${iconSize ? iconSize : ''}`}></i>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={index} className={`bx bx-star text-secondary ${iconSize ? iconSize : ''}`}></i>
      ))}
    </div>
  )
}
