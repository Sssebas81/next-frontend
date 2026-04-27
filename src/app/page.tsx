import Link from "next/link";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello, Welcome to games</h1>
          <p className="py-6">Discover and create games with us. Join our community of gamers and developers today!</p>
          <div className="space-x-4">
            <Link href="/feed" className="btn btn-outline">All Games</Link>
            <Link href="/create" className="btn btn-outline">Create Game</Link>
          </div>
        </div>
      </div>
    </div>
  )
}