'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Package, Download, GitBranch, Clock, FileText, LogOut} from 'lucide-react';

// Define types for the artifact data
interface Version {
    version: string;
    status: 'success' | 'failed' | 'pending';
    date: string;
    downloads: number;
}

interface Artifact {
    id: string;
    name: string;
    group: string;
    latestVersion: string;
    description: string;
    versions: Version[];
}

// Mock API call to fetch artifact data
const getArtifact = async (id: string, project: string): Promise<Artifact> => {
    return {
        id,
        name: project,
        group: 'com.example',
        latestVersion: '1.2.3',
        description: 'A powerful Java library for awesome things',
        versions: [
            { version: '1.2.3', status: 'success', date: '2023-05-15', downloads: 5000 },
            { version: '1.2.2', status: 'success', date: '2023-04-01', downloads: 12000 },
            { version: '1.2.1', status: 'failed', date: '2023-03-15', downloads: 8000 },
            { version: '1.2.0', status: 'success', date: '2023-02-28', downloads: 15000 },
        ],
    };
};

export default function ArtifactPage() {
    const { username, project } = useParams<{ username: string; project: string }>();
    const [artifact, setArtifact] = useState<Artifact | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtifact = async () => {
            try {
                const fetchedArtifact = await getArtifact(username, project);
                setArtifact(fetchedArtifact);
            } catch (err) {
                console.log(err)
                setError('Failed to load artifact data.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtifact();
    }, [username, project]); // Re-run if username or project changes

    // Show loading spinner or error message while fetching
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getStatusColor = (status: 'success' | 'failed' | 'pending'): string => {
        switch (status) {
            case 'success':
                return 'bg-green-500';
            case 'failed':
                return 'bg-red-500';
            default:
                return 'bg-yellow-500';
        }
    };

    // We should prob redirect to a 404 instead
    if (!artifact) {
        return <div>Artifact not found</div>;
    }


    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="border-b border-border/40">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold flex items-center text-foreground">
                        <Package className="mr-2"/>
                        ByteStore
                    </Link>
                    <Button variant="ghost" className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4"/>
                        Sign Out
                    </Button>
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
                            <Download className="mr-2 h-4 w-4"/>
                            Download Latest
                        </Button>
                    </div>
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Versions</h2>
                    <div className="space-y-4">
                        {artifact.versions.map((version) => (
                            <Card key={version.version} className="overflow-hidden bg-card">
                                <div className={`h-2 ${getStatusColor(version.status)}`}/>
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
                                            <Clock className="mr-1 h-4 w-4"/>
                                            {version.date}
                                        </span>
                                        <span className="flex items-center">
                                            <Download className="mr-1 h-4 w-4"/>
                                            {version.downloads.toLocaleString()} downloads
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <Button variant="outline" size="sm">
                                            <GitBranch className="mr-2 h-4 w-4"/>
                                            View on GitHub
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <FileText className="mr-2 h-4 w-4"/>
                                            Build Logs
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4"/>
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
                    © {new Date().getFullYear()} ByteStore. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
