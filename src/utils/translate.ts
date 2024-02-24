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

function leadName(name: string) {
  switch (name) {
    case 'name':
      return 'nome'
    case 'email':
      return 'e-mail'
    case 'phone':
      return 'celular'
    case 'other':
      return 'outro'
    default:
      return name
  }
}

export class Translate {
  static campaignStatus(status: CampaignStatus) {
    return campaignStatus(status)
  }

  static leadName(name: string) {
    return leadName(name)
  }
}
