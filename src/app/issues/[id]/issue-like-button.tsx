"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { LikeButton } from "@/components/like-button"
import { getIssuesInterations } from "@/http/get-issues-interatios"

export type IssueLikeButtonProps = {
  issueId: string
}

export function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["issue-likes", issueId],
    queryFn: () => getIssuesInterations({ issueIds: [issueId] }),
  })

  const { isLiked, likesCount } = data.interactions[0]

  return (
    <LikeButton
      issueId={issueId}
      initialLikes={likesCount}
      initialLiked={isLiked}
    />
  )
}
