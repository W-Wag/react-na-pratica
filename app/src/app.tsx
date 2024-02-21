import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import {
  LucidePlus,
  LucideSearch,
  LucideFileDown,
  LucideMoreHorizontal,
  LucideFilter,
} from 'lucide-react'
import { Header } from './components/header'
import { Tabs } from './components/tabs'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import { Pagination } from './components/pagination'
import { useState } from 'react'
import useDebounceValue from './hooks/use-debounce-value'

export interface Tag {
  title: string
  slug: string
  amountOfVideos: number
  id: string
}

export interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tag[]
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''

  const [filter, setFilter] = useState(urlFilter)
  const debouncedFilter = useDebounceValue(filter, 1000)

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ['get-tags', debouncedFilter, urlFilter, page],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`,
      )
      const data = await response.json()

      return data
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  })

  function handleFilter() {
    setSearchParams((params) => {
      params.set('page', '1')
      params.set('filter', filter)

      return params
    })
  }

  if (isLoading) {
    return null
  }
  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <div>
        <main className="max-w-6xl mx-auto space-y-5">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Tags</h1>
            <Button variant="primary">
              <LucidePlus className="size-3" />
              Create new
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Input variant="filter">
                <LucideSearch className="size-3" />
                <Control
                  placeholder="Search tags"
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                />
              </Input>
              <Button onClick={handleFilter}>
                <LucideFilter className="size-3" />
                Filtrar
              </Button>
            </div>
            <Button>
              <LucideFileDown className="size-3" />
              Export
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableHead></TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableHeader>
            <TableBody>
              {tagsResponse?.data.map((tag, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell></TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{tag.title}</span>
                        <span className="text-xs text-zinc-500">{tag.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>{tag.amountOfVideos} video(s)</TableCell>
                    <TableCell className="text-right">
                      <Button size="icon">
                        <LucideMoreHorizontal />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {tagsResponse && (
            <Pagination
              pages={tagsResponse.pages}
              items={tagsResponse.items}
              page={page}
            />
          )}
        </main>
      </div>
    </div>
  )
}
