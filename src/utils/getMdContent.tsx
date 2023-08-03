export const getMdContent = async (url: string): Promise<string> => {
  const res = await fetch(url).catch((err) => {
    console.error(err)
    return { text: () => '' }
  })
  return res.text()
}
