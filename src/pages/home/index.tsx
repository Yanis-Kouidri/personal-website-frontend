import qs from 'qs'
import { useEffect, useState } from 'react'
import Banner from '../../components/home/Banner'
import Contacts from '../../components/home/Contacts'
import MainSkills from '../../components/home/MainSkills'
import MyHistory from '../../components/home/MyHistory'
import SkillsShow from '../../components/home/SkillsShow'
import { handleApiRequest } from '../../hooks/useApiRequest'
import config from '../../utils/config'

interface ApiResponse {
  data: HomeData
}

interface HomeData {
  banner: BannerProps
  mainSkills: MainSkillsProps
  myHistory: MyHistoryProps
  contact: ContactProps
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

export interface MyHistoryProps {
  title: string
  paragraphs: Paragraph[]
}

interface Paragraph {
  id: number
  content: string
}

export interface ContactProps {
  title: string
}

function Home() {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [homeData, setHomeData] = useState<HomeData | null>(null)

  const populate: string[] = [
    'banner',
    'mainSkills',
    'myHistory.paragraphs',
    'contact',
  ]

  const query = qs.stringify(
    {
      populate,
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  )

  const apiEndPoint: string = `/api/home-page-content${query}`

  useEffect(() => {
    handleApiRequest({
      baseUrl: config.strapiUrl,
      apiEndPoint,
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
  }, [apiEndPoint])

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
      <Banner
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
