import { CampaignStatus } from '@/core/types/campaign'

function campaignStatus(status: CampaignStatus) {
  switch (status) {
    case 'ACTIVE':
      return 'ativo'
    case 'PAUSED':
      return 'pausado'
    case 'ENDED':
      return 'finalizado'
    case 'REMOVED':
      return 'removido'
    case 'NOT_PUBLISHED':
      return 'não publicado'
  }
}

export class Translate {
  static campaignStatus(status: CampaignStatus) {
    return campaignStatus(status)
  }
}
