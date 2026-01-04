import { useEffect, useState } from 'react'
import Banner from '../../components/home/Banner'
import Contacts from '../../components/home/Contacts'
import MainSkills from '../../components/home/MainSkills'
import MyHistory from '../../components/home/MyHistory'
import SkillsShow from '../../components/home/SkillsShow'
import { fetchHomeData, type HomeData } from '../../services/home.service'

function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    fetchHomeData()
      .then((data) => {
        if (isMounted) setHomeData(data)
      })
      .catch((err) => {
        if (isMounted)
          setError(err instanceof Error ? err.message : 'Unknown error')
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) return <aside aria-busy="true">Loading content...</aside>
  if (error) return <aside role="alert">Error: {error}</aside>
  if (!homeData) return <p>No content available.</p>

  return (
    <>
      {/* React 19 Native SEO Support */}
      <title>{homeData.banner.title} | Personal website</title>
      <meta name="description" content={homeData.banner.shortDescription} />

      <Banner {...homeData.banner} />

      <MainSkills
        itTitle={homeData.mainSkills.itTitle}
        itDescription={homeData.mainSkills.itDescription}
        networkTitle={homeData.mainSkills.networkTitle}
        networkDescription={homeData.mainSkills.networkDescription}
      />

      <MyHistory
        title={homeData.myHistory.title}
        paragraphs={homeData.myHistory.paragraphs}
      />

      <SkillsShow />

      <Contacts title={homeData.contact.title} />
    </>
  )
}

export default Home
