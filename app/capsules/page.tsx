import Link from "next/link";
import { Clock, Lock, Unlock } from "lucide-react";

// import { getAllUnlockedCapsules } from "@/lib/capsules"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCapsules } from "@/lib/api";

export default async function CapsulesPage() {
  const capsules = await getAllCapsules();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Time Capsules
      </h1>

      {capsules.length === 0 ? (
        <div className="text-center py-16 max-w-md mx-auto">
          <div className="relative mx-auto w-fit mb-6">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 blur-lg"></div>
            <div className="relative rounded-full bg-black p-4">
              <Clock className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-medium mb-3">
            No Unlocked Capsules Yet
          </h2>
          <p className="text-muted-foreground">
            There are no unlocked time capsules available at the moment. Check
            back later or create your own!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capsules.map((capsule) => {
            const isUnlocked = capsule.is_unlocked;
            return (
              <Link
                key={capsule.public_id}
                href={`/capsule/${capsule.public_id}`}
                className="block group"
              >
                <Card
                  className={`h-full border-0 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:-translate-y-1 duration-300 ${
                    isUnlocked ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
                  <CardHeader className="pb-2 pt-6 flex items-center justify-between">
                    <CardTitle
                      className={`transition-all duration-300 ${
                        isUnlocked
                          ? "group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-indigo-500 group-hover:bg-clip-text"
                          : ""
                      }`}
                    >
                      {capsule.title}
                    </CardTitle>
                    {isUnlocked ? (
                      <Unlock className="w-5 h-5 text-green-500" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      By {capsule.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Unlocks on{" "}
                      {new Date(capsule.unlock_at).toLocaleDateString()}
                    </p>
                    <div
                      className={`mt-4 text-sm line-clamp-3 ${
                        isUnlocked ? "" : "blur-sm text-gray-400"
                      }`}
                    >
                      {capsule.message.substring(0, 150)}
                      {capsule.message.length > 150 ? "..." : ""}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
