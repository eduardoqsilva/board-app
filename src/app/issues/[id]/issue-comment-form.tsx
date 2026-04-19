"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon, MessageCirclePlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Input } from "@/components/input"

const createCommentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty"),
})

export type CreateCommentSchema = z.infer<typeof createCommentSchema>

interface IssueCommentProps {
  onCreateComment: (data: CreateCommentSchema) => Promise<void>
  isAuthenticated: boolean
}

export function IssueCommentForm({ onCreateComment, isAuthenticated }: IssueCommentProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    mode: "onChange",
  })

  async function handleCreateComment(data: CreateCommentSchema) {
    await onCreateComment(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleCreateComment)} className="relative w-full">
      <Input
        className="bg-navy-900 h-11 pr-24 w-full"
        placeholder={!isAuthenticated ? "Sign in to leave a comment..." : "Leave a comment..."}
        disabled={!isAuthenticated || isSubmitting}
        {...register("text")}
      />
      {errors.text && (<span className="text-xs text-red-400 mt-1">{errors.text.message}</span>)}
      <button
        type="submit"
        className="flex items-center gap-2 text-indigo-400 absolute right-3 top-1/2 -translate-y-1/2 text-xs hove:text-indigo-300 cursor-pointer disabled:opacity-50"
        disabled={isSubmitting || !isAuthenticated}
      >
        Publish
        {isSubmitting ? (
          <Loader2Icon className="size-3 animate-spin"/>
        ) : (
        <MessageCirclePlusIcon className="size-3" />
        )}
      </button>
        
    </form>
  )
}
