/**
 * CampaignStatus represents the various states a campaign can be in.
 */
export type CampaignStatus = 'ACTIVE' | 'PAUSED' | 'REMOVED' | 'ENDED' | 'NOT_PUBLISHED'

/**
 * CampaignType represents the different types of campaigns, such as presell or quiz.
 */
export type CampaignType = 'PRESELL' | 'QUIZ'

/**
 * CampaignQuiz represents a quiz associated with a campaign, including a question and a list of answers.
 */
export type CampaignQuiz = { question: string; answers: Array<string> }

/**
 * CarouselImage represents an image file and its URL for use in a carousel display.
 */
export type CarouselImage = { file: string; url: string }

/**
 * CarouselImageCreateInput represents the input data required to create a new carousel image.
 * This includes the name of the image, a unique key for storage purposes, and the campaign ID
 * to which this image belongs.
 */
export type CarouselImageCreateInput = {
  name: string
  key: string
  campaignId: string
}

/**
 * Campaign represents the structure of a marketing campaign with its associated properties.
 */
export type Campaign = {
  id: string
  companyId: string
  status: CampaignStatus
  affiliateUrl: string
  title: string
  subtitle: string
  slug: string
  name: string
  carouselImages: Array<CarouselImage>
  createdAt: Date
  startedAt: Date
  endedAt?: Date | null
  updatedAt?: Date | null
}

/**
 * CampaignToDashboard represents the data structure of a campaign as it would appear on a dashboard view.
 */
export type CampaignToDashboard = {
  id: string
  companyId: string
  campaignUrl: string
  name: string
  status: CampaignStatus
  type: CampaignType
  startedAt: Date
}

/**
 * CampaignToCustomer represents the information of a campaign that is relevant and visible to a customer.
 */
export type CampaignToCustomer = {
  id: string
  name: string
  status: CampaignStatus
  title: string
  subtitle: string
  slug: string
  affiliateUrl: string
  type: CampaignType
  carouselImages: CarouselImage[]
  description?: string | null
  quiz?: CampaignQuiz | null
}

/**
 * Type representing a campaign that is in the presale phase with additional description.
 */
export type PresellCampaign = Campaign & { description: string; type: 'PRESELL' }

/**
 * Type representing a campaign that involves a quiz, containing quiz details.
 */
export type QuizCampaign = Campaign & { type: 'QUIZ'; quiz: CampaignQuiz }

/**
 * Type representing campaign details sent to a customer, specifically for quiz campaigns.
 */
export type QuizCampaignToCustomer = { quiz: CampaignQuiz } & CampaignToCustomer

/**
 * Type representing campaign details sent to a customer, specifically for presell campaigns.
 */
export type PresellCampaignToCustomer = { description: string } & CampaignToCustomer

/**
 * CampaignCreateInput represents the input data required to create a new Campaign.
 * It contains both required and optional fields.
 */
export type CampaignCreateInput = {
  id?: string // Optional unique identifier for the campaign
  companyId: string // Identifier of the company associated with the campaign
  title: string // The title of the campaign
  subtitle: string // A subtitle for the campaign
  name: string // The internal name used for the campaign
  slug: string // A URL-friendly identifier for the campaign
  affiliateUrl: string // A URL for affiliates associated with the campaign
  status: CampaignStatus // Current status of the campaign
  type: CampaignType // The type of campaign, which determines its behavior and features
  startedAt: Date // The date and time when the campaign starts
  description?: string | null // Optional description for additional details about the campaign
  quiz?: CampaignQuiz | null // Optional quiz associated with the campaign
}

export type CampaignUpdateInput = {
  id?: string
  title?: string
  subtitle?: string
  name?: string
  slug?: string
  affiliateUrl?: string
  status?: CampaignStatus
  type?: CampaignType
  startedAt?: Date
  description?: string | null
  quiz?: CampaignQuiz | null
  endedAt?: Date | null
}

/**
 * CampaignFindBySlugAndCompanyIdArgs represents the arguments used to find a Campaign
 * by its slug and the associated company's identifier.
 */
export type CampaignFindBySlugAndCompanyIdArgs = {
  slug: string // The slug of the campaign to find
  companyId: string // The identifier of the company associated with the campaign
}

/**
 * CampaignFindBySlugAndCompanySlugArgs represents the arguments used to find a Campaign
 * by its slug and the associated company's slug.
 */
export type CampaignFindBySlugAndCompanySlugArgs = {
  campaignSlug: string // The slug of the campaign to find
  companySlug: string // The slug of the company associated with the campaign
}

/**
 * CampaignCounter represents a count of active and total campaigns.
 */
export type CampaignCounter = {
  active: number
  removed: number
  paused: number
  total: number
}
