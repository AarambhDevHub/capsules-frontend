"use server"

import { revalidatePath } from "next/cache"
import { saveCapsule } from "./capsules"

type CapsuleInput = {
  name: string
  email: string
  title: string
  message: string
  unlock_at: string
}

export async function createCapsule(data: CapsuleInput) {
  // Validate input
  if (!data.name || !data.email || !data.title || !data.message || !data.unlock_at) {
    throw new Error("All fields are required")
  }

  // Create a unique public ID
  const public_id = generatePublicId()

  // Save the capsule
  const capsule = await saveCapsule({
    ...data,
    public_id,
    created_at: new Date().toISOString(),
  })

  // Revalidate the capsules page
  revalidatePath("/capsules")
  revalidatePath("/")

  return capsule
}

function generatePublicId() {
  // Generate a random string of 10 characters
  return Math.random().toString(36).substring(2, 12)
}
