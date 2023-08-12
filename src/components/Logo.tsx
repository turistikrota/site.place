import { useTranslation } from 'next-i18next'

type Props = {
  width?: number
  height?: number
}

function Submodule() {
  const { t } = useTranslation('common')
  return (
    <span className='inline-flex items-center justify-center px-1.5 py-1.5 text-sm leading-none text-black dark:text-white bg-secondary dark:bg-secondary-600 rounded-md'>
      {t('header.submodule')}
    </span>
  )
}

export default function Logo({ width = 186, height = 30 }: Props) {
  return (
    <div className='relative flex gap-1'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <text
          style={{
            fill: '#f9a31a',
            fontSize: '34px',
            fontFamily: 'Verdana, Verdana',
          }}
          transform='translate(0 26.92)'
        >
          <tspan x='0' y='0'>
            turistik
          </tspan>
        </text>
        <text
          style={{
            fill: '#3397e6',
            fontSize: '34px',
            fontFamily: 'Verdana, Verdana',
          }}
          transform='translate(118.86 27.08)'
        >
          <tspan x='0' y='0'>
            rota
          </tspan>
        </text>
      </svg>
      <Submodule />
    </div>
  )
}
