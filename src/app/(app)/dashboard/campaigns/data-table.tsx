'use client'

import React from 'react'
import { X } from 'lucide-react'

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CampaignStatus } from '@/core/types/campaign'
import { Translate } from '@/utils/translate'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const [statusFilter, setStatusFilter] = React.useState<string | null>(null)
  const [typeFilter, setTypeFilter] = React.useState<string | null>(null)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  function handleSelectStatus(value: string) {
    setStatusFilter(value)
    table.getColumn('status')?.setFilterValue(value)
  }

  function handleRemoveStatusFilter() {
    setStatusFilter(null)
    table.getColumn('status')?.setFilterValue('')
  }

  function handleSelectType(value: string) {
    setTypeFilter(value)
    table.getColumn('type')?.setFilterValue(value)
  }

  function handleRemoveTypeFilter() {
    setTypeFilter(null)
    table.getColumn('type')?.setFilterValue('')
  }

  return (
    <div>
      <div className="py-4 flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-0">
        <Input
          placeholder="Buscar pelo nome da campanha..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />

        <div className="w-full md:w-auto inline-flex gap-2">
          <Select onValueChange={handleSelectStatus} value={statusFilter ?? ''}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="paused">Pausado</SelectItem>
                <SelectItem value="removed">Removido</SelectItem>
                <SelectItem value="ended">Finalizado</SelectItem>
                <SelectItem value="not_published">Não publicado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleSelectType} value={typeFilter ?? ''}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo de campanha</SelectLabel>
                <SelectItem value="presell">Presell</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(statusFilter || typeFilter) && (
        <div className="flex items-center justify-end pb-4">
          {statusFilter && (
            <Button type="button" variant="ghost" onClick={handleRemoveStatusFilter} className="gap-2 rounded-full">
              <Badge variant="outline" className="capitalize">
                <X size={16} />

                {Translate.campaignStatus(statusFilter.toUpperCase() as CampaignStatus)}
              </Badge>
            </Button>
          )}

          {typeFilter && (
            <Button type="button" variant="ghost" onClick={handleRemoveTypeFilter} className="gap-2 rounded-full">
              <Badge variant="outline" className="capitalize">
                <X size={16} />

                {typeFilter}
              </Badge>
            </Button>
          )}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
