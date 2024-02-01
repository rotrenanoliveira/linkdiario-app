'use client'

import { AccountDetails } from '@/core/types/accounts'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<AccountDetails>[] = [
  {
    accessorKey: 'fullName',
    header: 'Nome Completo',
    cell: ({ getValue }) => <div className="capitalize">{getValue<string>()}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => <div className="text-center">{getValue<string>()}</div>,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Função
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => <div className="text-center">{getValue<string>()}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Registrado em:
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const value = getValue<Date>()
      const formattedDate = value.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

      return <div className="text-center">{formattedDate}</div>
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>

  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]
