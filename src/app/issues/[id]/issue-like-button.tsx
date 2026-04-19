"use client"

import { useQuery } from "@tanstack/react-query"
import { LikeButton } from "@/components/like-button"
import { Skeleton } from "@/components/skeleton"
import { getIssuesInterations } from "@/http/get-issues-interatios"

export type IssueLikeButtonProps = {
  issueId: string
}

export function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["issue-likes", issueId],
    queryFn: () => getIssuesInterations({ issueIds: [issueId] }),
  })
  const interactions = data?.interactions[0]

  if (isLoading) {
    return <Skeleton className="h-7 w-16" />
  }


  return (
    <LikeButton
      issueId={issueId}
      initialLikes={interactions?.likesCount ?? 0}
      initialLiked={interactions?.isLiked ?? false}
    />
  )
}
