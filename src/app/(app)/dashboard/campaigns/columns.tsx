'use client'

import { ArrowUpDown, Copy, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CampaignStatus, CampaignToDashboard } from '@/core/types/campaign'
import { Translate } from '@/utils/translate'

export const dashboardCampaignsColumns: ColumnDef<CampaignToDashboard>[] = [
  {
    id: 'index',
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },
  {
    accessorKey: 'name',
    header: 'Campanha',
    cell: ({ getValue }) => {
      const campaignName = getValue<string>()

      return (
        <p className="capitalize overflow-hidden whitespace-nowrap text-overflow-ellipsis" title={campaignName}>
          {/* {campaignName.substring(0, 35).concat('...')} */}
          {campaignName}
        </p>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<CampaignStatus>()
      const variant =
        status === 'ACTIVE' ? 'success' : status === 'PAUSED' || status === 'NOT_PUBLISHED' ? 'warning' : 'destructive'

      return (
        <Badge variant={variant} className="w-32 inline-flex justify-center capitalize ">
          {Translate.campaignStatus(getValue<CampaignStatus>())}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'startedAt',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Iniciado em:
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue<Date>()
      const startedAt = new Date(value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

      return <div>{startedAt}</div>
    },
  },
  {
    accessorKey: 'analytics.impressions',
    header: 'Visitas',
    cell: ({ getValue }) => <div>{getValue<number>()}</div>,
  },
  {
    accessorKey: 'analytics.clicks',
    header: 'Cliques',
    cell: ({ getValue }) => <div>{getValue<number>()}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const campaign = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(campaign.campaignUrl)}
              className="flex items-center group gap-2 cursor-pointer"
            >
              Copiar URL campanha
              <div className="p-1 group-hover:bg-foreground/15 rounded">
                <Copy size={20} strokeWidth={1.25} />
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link
                href={`/preview/${campaign.id}`}
                className="w-full flex items-center justify-between group cursor-pointer"
              >
                Visualizar preview
                <div className="p-1 w-fit group-hover:bg-foreground/15 rounded">
                  <ExternalLink size={20} strokeWidth={0.75} />
                </div>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href={`/dashboard/campaigns/edit/${campaign.id}`}
                className="w-full flex items-center justify-between group cursor-pointer"
              >
                Editar
                <div className="p-1 w-fit group-hover:bg-foreground/15 rounded">
                  <Pencil size={20} strokeWidth={0.75} />
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
