const BaseSeo: React.FC = () => {
  return (
    <>
      <meta name='application-name' content='Turistikrota' />
      <meta name='generator' content='Turistikrota' />
      <meta name='referrer' content='origin-when-cross-origin' />
      <meta name='author-url' content='https://turistikrota.com' />
      <meta name='base-url' content='https://turistikrota.com' />
      <link rel='alternate' hrefLang='en' href='/en' />
      <link rel='alternate' hrefLang='tr' href='/tr' />
      <meta name='color-scheme' content='light dark' />
      <meta name='robots' content='index, follow, nocache' />
      <meta name='googlebot' content='index, follow' />

      <link rel='icon' href='/favicon.ico' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    </>
  )
}

export default BaseSeo
