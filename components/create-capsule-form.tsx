"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Send, Clock } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { createCapsule } from "@/lib/actions"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { createCapsule } from "@/lib/api"
// import { toast } from "@/components/ui/use-toast"

export function CreateCapsuleForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 1 week from now
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const title = formData.get("title") as string
    const message = formData.get("message") as string

    if (!date) {
      // toast({
      //   title: "Error",
      //   description: "Please select an unlock date",
      //   variant: "destructive",
      // })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await createCapsule({
        name,
        email,
        title,
        message,
        unlock_at: date.toISOString(),
      })

    //   toast({
    //     title: "Time Capsule Created",
    //     description: "Your time capsule has been created successfully!",
    //   })

      router.push(`/capsule/${result.public_id}`)
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to create time capsule. Please try again.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
      <CardContent className="pt-8 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              Your Name
            </Label>
            <Input
              id="name"
              name="name"
              required
              className="h-12 bg-transparent border-2 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="h-12 bg-transparent border-2 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-500 transition-all duration-300"
            />
            <p className="text-xs text-muted-foreground">
              Your email will not be displayed publicly. It's only used for reference.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">
              Capsule Title
            </Label>
            <Input
              id="title"
              name="title"
              required
              className="h-12 bg-transparent border-2 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-base">
              Your Message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Write your message for the future..."
              required
              className="bg-transparent border-2 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-500 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Unlock Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12 bg-transparent border-2 hover:bg-muted/50 transition-all duration-300",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="rounded-md"
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              Select when your time capsule should be unlocked and visible to everyone.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition-all duration-300 mt-4 gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Clock className="h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Create Time Capsule
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
