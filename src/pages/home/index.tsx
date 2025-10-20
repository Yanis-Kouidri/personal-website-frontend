import Banner from '../../components/home/Banner'
import MainSkills from '../../components/home/MainSkills'
import MyHistory from '../../components/home/MyHistory'
import SkillsShow from '../../components/home/SkillsShow'
import Contacts from '../../components/home/Contacts'
import config from '../../utils/config'
import { useState, useEffect } from 'react'
import { handleApiRequest } from '../../hooks/useApiRequest'

function Home() {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [homeData, setHomeData] = useState(null)

  useEffect(() => {
    // Fetch restaurant description directly using handleApiRequest
    handleApiRequest({
      baseUrl: config.strapiUrl,
      apiEndPoint: '/api/home-page-content?populate=*',
      method: 'GET',
      credentials: false,
      setIsFetching,
      onSuccess: (response) => {
        //console.log(response.data)
        // Extract text from the description field
        const fetchedHomeData = response.data
        setHomeData(fetchedHomeData)
      },
      onError: (errorMessage) => {
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
      <Banner
        title={homeData.banner.title}
        shortDescription={homeData.banner.shortDescription}
        location={homeData.banner.location}
      />
      <MainSkills />
      <MyHistory />
      <SkillsShow />
      <Contacts />
    </>
  )
}

export default Home
