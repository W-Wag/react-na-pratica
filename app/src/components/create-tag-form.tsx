import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LucideCheck, LucideLoader2, LucideX } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

const createTagSchema = z.object({
  title: z.string().min(3, { message: 'Minimum 3 characters.' }),
})

type CreateTagSchema = z.infer<typeof createTagSchema>

export function CreateTagForm() {
  const { register, handleSubmit, watch, formState } = useForm<CreateTagSchema>(
    {
      resolver: zodResolver(createTagSchema),
    },
  )

  const queryClient = useQueryClient()

  const slug = watch('title') ? getSlugFromString(watch('title')) : ''

  const { mutateAsync } = useMutation({
    mutationFn: async ({ title }: CreateTagSchema) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await fetch('http://localhost:3333/tags', {
        method: 'POST',
        body: JSON.stringify({
          title,
          slug,
          amountOfVideos: 0,
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tags'],
      })
    },
  })

  async function createTag({ title }: CreateTagSchema) {
    await mutateAsync({ title })
  }

  function getSlugFromString(input: string): string {
    return input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
  }

  return (
    <form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="title">
          Tag Name
        </label>
        <input
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm outline-none focus-visible:border-teal-400"
          id="title"
          type="text"
          {...register('title')}
        />
        {formState.errors?.title && (
          <p className="text-sm text-red-400">
            {formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">
          Slug
        </label>
        <input
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm outline-none focus-visible:border-teal-400 cursor-not-allowed"
          id="slug"
          type="text"
          value={slug}
          readOnly
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button>
            <LucideX className="size-3" />
            Cancel
          </Button>
        </Dialog.Close>
        <Button
          type="submit"
          className="bg-teal-400"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? (
            <LucideLoader2 className="size-3 animate-spin" />
          ) : (
            <LucideCheck className="size-3" />
          )}
          Save
        </Button>
      </div>
    </form>
  )
}
