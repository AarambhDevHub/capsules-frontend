import fs from "fs/promises"
import path from "path"

// Define the capsule type
export type Capsule = {
  public_id: string
  name: string
  email: string
  title: string
  message: string
  unlock_at: string
  created_at: string
}

// Path to the JSON file that stores the capsules
const CAPSULES_FILE = path.join(process.cwd(), "data", "capsules.json")

// Initialize the data directory and file if they don't exist
async function initDataFile() {
  try {
    // Create the data directory if it doesn't exist
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true })

    // Check if the capsules file exists
    try {
      await fs.access(CAPSULES_FILE)
    } catch {
      // If not, create it with an empty array
      await fs.writeFile(CAPSULES_FILE, JSON.stringify([]))
    }
  } catch (error) {
    console.error("Error initializing data file:", error)
  }
}

// Get all capsules
async function getAllCapsules(): Promise<Capsule[]> {
  await initDataFile()

  try {
    const data = await fs.readFile(CAPSULES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading capsules:", error)
    return []
  }
}

// Get all unlocked capsules (where unlock_at <= current time)
export async function getAllUnlockedCapsules(): Promise<Capsule[]> {
  const capsules = await getAllCapsules()
  const now = new Date()

  return capsules
    .filter((capsule) => new Date(capsule.unlock_at) <= now)
    .sort((a, b) => new Date(b.unlock_at).getTime() - new Date(a.unlock_at).getTime())
}

// Get a capsule by its public ID
export async function getCapsuleById(id: string): Promise<Capsule | null> {
  const capsules = await getAllCapsules()
  return capsules.find((capsule) => capsule.public_id === id) || null
}

// Save a new capsule
export async function saveCapsule(capsule: Capsule): Promise<Capsule> {
  await initDataFile()

  const capsules = await getAllCapsules()
  capsules.push(capsule)

  await fs.writeFile(CAPSULES_FILE, JSON.stringify(capsules, null, 2))

  return capsule
}
