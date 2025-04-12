import { CreateCapsuleForm } from "@/components/create-capsule-form"

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Create a Time Capsule
        </h1>
        <CreateCapsuleForm />
      </div>
    </div>
  )
}
