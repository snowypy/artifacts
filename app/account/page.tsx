'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Download, Star, GitFork, LogOut} from 'lucide-react'
import {ProtectedRoute} from "@/components/protected-route";
import {useAuth} from "@/context/auth-context";

function AccountPage() {
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

  // we can use the user id later here to do stuff
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <div>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={user.avatarUrl}
              alt={`${user.display}'s avatar`}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.display}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <Button onClick={logout} variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 transition-colors duration-200">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
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
    </div>
  )
}

export default function ProtectedAccountPage() {
  return (
      <ProtectedRoute>
        <AccountPage />
      </ProtectedRoute>
  );
}
