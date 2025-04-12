import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Lock, Calendar, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
// import { getCapsuleById } from "@/lib/capsules"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareLinkButton } from "@/components/share-link-button"
import { getCapsuleByPublicId } from "@/lib/api"

export default async function CapsulePage({ params }: { params: { id: string } }) {
  const capsule = await getCapsuleByPublicId(params.id)

  if (!capsule) {
    notFound()
  }

  const isUnlocked = new Date(capsule.unlock_at) <= new Date()
  // const capsuleUrl = `/capsule/${capsule.public_id}`

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8 hover:bg-muted/50 transition-all duration-300">
          <Link href="/capsules" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to all capsules
          </Link>
        </Button>

        <Card className="border-0 shadow-lg bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
          <CardHeader className="pt-8 pb-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {capsule.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-black/10 dark:bg-white/10">
                <Calendar className="h-4 w-4" />
                {isUnlocked
                  ? `Unlocked on ${new Date(capsule.unlock_at).toLocaleDateString()}`
                  : `Unlocks on ${new Date(capsule.unlock_at).toLocaleDateString()}`}
              </div>
            </div>
            <p className="text-muted-foreground">By {capsule.name}</p>
          </CardHeader>
          <CardContent className="pb-8">
            {isUnlocked ? (
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{capsule.message}</p>
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="relative mx-auto w-fit mb-6">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 blur-lg"></div>
                  <div className="relative rounded-full bg-black p-4">
                    <Lock className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-medium mb-3">This Time Capsule is Locked</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This capsule will be unlocked on {new Date(capsule.unlock_at).toLocaleDateString()}. Come back then to
                  view its contents.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-sm">
            <Share2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Time Capsule ID: {capsule.public_id}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Share this link to let others view this capsule:</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <ShareLinkButton capsuleId={capsule.public_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
