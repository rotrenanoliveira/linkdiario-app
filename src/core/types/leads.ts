export type Lead = {
  id: string
  campaignId: string
  leads: string
}

export type LeadDetails = {
  createdAt: Date
  updatedAt?: Date | null
} & Lead
