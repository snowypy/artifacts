import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Download, Star, GitFork, LogOut } from 'lucide-react'

export default function AccountPage() {
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    avatarUrl: 'https://avatars.githubusercontent.com/u/133208096?v=4',
  }

  const metrics = {
    totalDownloads: '1.2M',
    totalStars: '5.6K',
    totalForks: '1.8K',
  }

  const repositories = [
    { id: 1, name: 'awesome-java-lib', downloads: '500K', stars: '2.3K', forks: '450' },
    { id: 2, name: 'java-utils', downloads: '300K', stars: '1.8K', forks: '320' },
    { id: 3, name: 'spring-boot-starter', downloads: '400K', stars: '1.5K', forks: '280' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center text-foreground">
            <Package className="mr-2" />
            ByteStore
          </Link>
          <Button variant="ghost" className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={user.avatarUrl}
              alt={`${user.name}'s avatar`}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <Button>Edit Profile</Button>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Your Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalDownloads}</div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Stars</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalStars}</div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Forks</CardTitle>
                <GitFork className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalForks}</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Your Repositories</h2>
          <div className="space-y-4">
            {repositories.map((repo) => (
              <Card key={repo.id} className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">{repo.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {repo.downloads} downloads
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {repo.stars} stars
                    </span>
                    <span className="flex items-center">
                      <GitFork className="h-4 w-4 mr-1" />
                      {repo.forks} forks
                    </span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Artifacts
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ByteStore. All rights reserved.
        </div>
      </footer>
    </div>
  )
}