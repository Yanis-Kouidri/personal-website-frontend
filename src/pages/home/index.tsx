import BannerProps from '../../components/home/Banner'
import MainSkills from '../../components/home/MainSkills'
import MyHistory from '../../components/home/MyHistory'
import SkillsShow from '../../components/home/SkillsShow'
import Contacts from '../../components/home/Contacts'
import config from '../../utils/config'
import { useState, useEffect } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'

interface ApiResponse {
  data: HomeData
}

interface HomeData {
  banner: BannerProps
  mainSkills: MainSkillsProps
}

export interface BannerProps {
  title: string
  shortDescription: string
  location: string
}

export interface MainSkillsProps {
  itTitle: string
  itDescription: string
  networkTitle: string
  networkDescription: string
}

function Home() {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [homeData, setHomeData] = useState<HomeData | null>(null)

  useEffect(() => {
    handleApiRequest({
      baseUrl: config.strapiUrl,
      apiEndPoint: '/api/home-page-content?populate=*',
      method: 'GET',
      credentials: false,
      setIsFetching,
      onSuccess: (response: ApiResponse) => {
        //console.log(response.data)
        const fetchedHomeData: HomeData = response.data
        setHomeData(fetchedHomeData)
      },
      onError: (errorMessage: string) => {
        setError(errorMessage)
      },
    })
  }, [])

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!homeData) {
    return <div>No content available</div>
  }

  return (
    <>
      <BannerProps
        title={homeData.banner.title}
        shortDescription={homeData.banner.shortDescription}
        location={homeData.banner.location}
      />
      <MainSkills
        itTitle={homeData.mainSkills.itTitle}
        itDescription={homeData.mainSkills.itDescription}
        networkTitle={homeData.mainSkills.networkTitle}
        networkDescription={homeData.mainSkills.networkDescription}
      />
      <MyHistory />
      <SkillsShow />
      <Contacts />
    </>
  )
}

export default Home
