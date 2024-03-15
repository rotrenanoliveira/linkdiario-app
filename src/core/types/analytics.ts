/**
 * These types represent the possible operations that can be performed
 * against the analytics endpoint.
 *
 * @type ANALYTICS_OPERATIONS - keys are operation names, values are operation descriptions
 */
export const ANALYTICS_OPERATIONS = {
  create: 'create',
  updatePageView: 'updatePageView',
  updateCta: 'updateCta',
} as const

/**
 * These types represent the possible operations that can be performed
 * against the analytics endpoint.
 *
 * @type AnalyticsOperations - union type of operation names
 */
export type AnalyticsOperations = (typeof ANALYTICS_OPERATIONS)[keyof typeof ANALYTICS_OPERATIONS]

/**
 * These types represent the possible operations that can be performed
 * against the analytics endpoint.
 *
 * @type SaveAnalyticsInput - input shape for saveAnalytics function
 */
export type SaveAnalyticsInput = {
  campaignId: string
  operation: AnalyticsOperations
}

/**
 * These types represent the possible operations that can be performed
 * against the analytics endpoint.
 *
 * @type Analytics - structure of an analytics document
 */
export type Analytics = {
  id: string
  campaignId: string
  pageView: number
  clickCta: number
}
