import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Download, GitBranch, Clock, FileText } from 'lucide-react'

const getArtifact = async (id) => {
  return {
    id,
    name: 'awesome-java-lib',
    group: 'com.example',
    latestVersion: '1.2.3',
    description: 'A powerful Java library for awesome things',
    versions: [
      { version: '1.2.3', status: 'success', date: '2023-05-15', downloads: 5000 },
      { version: '1.2.2', status: 'success', date: '2023-04-01', downloads: 12000 },
      { version: '1.2.1', status: 'failed', date: '2023-03-15', downloads: 8000 },
      { version: '1.2.0', status: 'success', date: '2023-02-28', downloads: 15000 },
    ]
  }
}

export default async function ArtifactPage({ params }) {
  const artifact = await getArtifact(params.id)

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'failed':
        return 'bg-red-500'
      default:
        return 'bg-yellow-500'
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-primary">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center text-primary-foreground">
            <Package className="mr-2" />
            ByteStream
          </Link>
          <nav>
            <Link href="/account" className="text-primary-foreground hover:underline">Account</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{artifact.name}</h1>
          <p className="text-xl text-muted-foreground mb-4">{artifact.group}</p>
          <p className="text-lg mb-4">{artifact.description}</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="text-lg py-1 px-3">
              Latest: v{artifact.latestVersion}
            </Badge>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Latest
            </Button>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Versions</h2>
          <div className="space-y-4">
            {artifact.versions.map((version) => (
              <Card key={version.version} className="overflow-hidden bg-card">
                <div className={`h-2 ${getStatusColor(version.status)}`} />
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>v{version.version}</span>
                    <Badge variant={version.status === 'success' ? 'default' : 'destructive'}>
                      {version.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {version.date}
                    </span>
                    <span className="flex items-center">
                      <Download className="mr-1 h-4 w-4" />
                      {version.downloads.toLocaleString()} downloads
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <GitBranch className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Build Logs
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Â© {new Date().getFullYear()} ByteStream. All rights reserved.
        </div>
      </footer>
    </div>
  )
}