import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { KeyboardEvent, useState } from 'react'
import useDebounceValue from './hooks/use-debounce-value'
import {
  LucidePlus,
  LucideSearch,
  LucideFileDown,
  LucideMoreHorizontal,
  LucideFilter,
  LucideTrash,
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
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { CreateTagForm } from './components/create-tag-form'

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
  const queryClient = useQueryClient()
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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await fetch(`http://localhost:3333/tags/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['get-tags'],
      })
    },
  })

  function handleEnterFilterPressed(e: KeyboardEvent<HTMLElement>) {
    if (e.code === 'Enter') {
      handleFilter()
    }
  }

  function handleFilter() {
    setSearchParams((params) => {
      params.set('page', '1')
      params.set('filter', filter)

      return params
    })
  }

  function handleDeleteTag(id: string) {
    mutateAsync(id)
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
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="primary">
                  <LucidePlus className="size-3" />
                  Create new
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70" />
                <Dialog.Content className="fixed p-10 space-y-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-l border-zinc-900">
                  <div className="space-y-3">
                    <Dialog.Title className="text-xl font-bold">
                      Create Tag
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-zinc-500">
                      Tags can be used to group videos about similar concepts.
                    </Dialog.Description>
                  </div>
                  <CreateTagForm />
                  <Dialog.Close></Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Input variant="filter">
                <LucideSearch className="size-3" />
                <Control
                  placeholder="Search tags"
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                  onKeyDown={(e) => handleEnterFilterPressed(e)}
                />
              </Input>
              <Button onClick={handleFilter}>
                <LucideFilter className="size-3" />
                Apply Filters
              </Button>
            </div>
            <Button disabled>
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
                        <span className="text-xs text-zinc-500">
                          {tag.slug}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{tag.amountOfVideos} video(s)</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button
                            disabled={isPending}
                            className="py-1.5 px-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 disabled:bg-zinc-900/40 disabled:cursor-wait"
                          >
                            <LucideMoreHorizontal />
                          </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content className="w-32 fixed">
                          <div className="bg-zinc-900 rounded-md py-2 space-y-2 text-center">
                            <DropdownMenu.Label>Options</DropdownMenu.Label>
                            <DropdownMenu.Separator className="h-0.5 bg-zinc-800" />
                            <DropdownMenu.Item
                              onClick={() => handleDeleteTag(tag.id)}
                              className="flex justify-center items-center gap-2 font-bold text-red-500 hover:underline hover:text-red-600 cursor-pointer"
                            >
                              Delete <LucideTrash className="size-3" />
                            </DropdownMenu.Item>
                          </div>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
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
