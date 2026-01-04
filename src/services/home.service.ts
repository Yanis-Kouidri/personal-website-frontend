import qs from 'qs'
import config from '../utils/config'

/**
 * Types and Interfaces
 */
export interface Paragraph {
  id: number
  content: string
}

export interface HomeData {
  banner: {
    title: string
    shortDescription: string
    location: string
  }
  mainSkills: {
    itTitle: string
    itDescription: string
    networkTitle: string
    networkDescription: string
  }
  myHistory: {
    title: string
    paragraphs: Paragraph[]
  }
  contact: {
    title: string
  }
}

/**
 * Query Construction
 * Defined outside the service to avoid re-calculation
 */
const HOME_PAGE_POPULATE = [
  'banner',
  'mainSkills',
  'myHistory.paragraphs',
  'contact',
]

const query = qs.stringify(
  { populate: HOME_PAGE_POPULATE },
  { encodeValuesOnly: true, addQueryPrefix: true },
)

export const HOME_API_ENDPOINT = `${config.strapiUrl}/api/home-page-content${query}`

/**
 * Fetches Home data from Strapi
 */
export async function fetchHomeData(): Promise<HomeData> {
  const response = await fetch(HOME_API_ENDPOINT)
  if (!response.ok) {
    throw new Error(`Failed to fetch home data: ${response.statusText}`)
  }
  const json = await response.json()
  return json.data
}
