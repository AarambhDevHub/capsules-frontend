import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="relative mb-6">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 blur-lg"></div>
        <div className="relative rounded-full bg-black p-4">
          <Search className="h-10 w-10 text-white" />
        </div>
      </div>
      <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-semibold">Time Capsule Not Found</h2>
      <p className="mt-4 text-muted-foreground max-w-md">
        The time capsule you're looking for doesn't exist or may have been removed.
      </p>
      <Button
        asChild
        className="mt-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition-all duration-300"
      >
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
