import Link from "next/link"
import { Clock, Archive, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
// import { getAllUnlockedCapsules } from "@/lib/capsules"
import { getAllCapsules } from "@/lib/api";

export default async function Home() {
  const unlockedCapsules = await getAllCapsules();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 blur-lg"></div>
          <div className="relative rounded-full bg-black p-5">
            <Clock className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Digital Time Capsule
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Create a message for the future. Lock your thoughts, memories, and wishes in a digital time capsule that will
          unlock at a date you choose.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition-all duration-300"
          >
            <Link href="/create">
              <Plus className="h-5 w-5" />
              Create Capsule
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 border-2 hover:bg-muted/50 transition-all duration-300"
          >
            <Link href="/capsules">
              <Archive className="h-5 w-5" />
              View All Capsules
            </Link>
          </Button>
        </div>
      </div>

      {unlockedCapsules.length > 0 && (
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Recently Added Capsules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unlockedCapsules.slice(0, 3).map((capsule) => (
              <Link key={capsule.public_id} href={`/capsule/${capsule.public_id}`} className="block group">
                <div className="border-0 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:-translate-y-1 duration-300">
                  <h3 className="font-semibold text-xl group-hover:text-primary">{capsule.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">By {capsule.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Unlocked on {new Date(capsule.unlock_at).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {unlockedCapsules.length > 3 && (
            <div className="flex justify-center mt-10">
              <Button asChild variant="outline" className="border-2 hover:bg-muted/50 transition-all duration-300">
                <Link href="/capsules">View All Unlocked Capsules</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
