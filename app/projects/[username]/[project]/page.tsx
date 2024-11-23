'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {Package, Download, GitBranch, Clock, FileText, GitCommit, Tag, Star, GitFork} from 'lucide-react';
import { DependencyModal } from '@/components/dependency-modal';
import { motion } from "framer-motion";

interface Version {
    version: string;
    status: 'success' | 'failed' | 'pending';
    date: string;
    downloads: number;
}

interface Commit {
    id: string;
    message: string;
    author: string;
    date: string;
    buildStatus: 'not_built' | 'failed' | 'success' | 'concurrent';
}

interface Artifact {
    id: string;
    name: string;
    group: string;
    latestVersion: string;
    description: string;
    versions: Version[];
    commits: Commit[];
    githubUrl: string;
    totalDownloads: string;
    totalStars: string;
    totalForks: string;
}

const getArtifact = async (id: string, project: string): Promise<Artifact> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        id,
        name: project,
        group: 'com.example',
        latestVersion: '1.2.3',
        description: 'A powerful Java library for awesome things, now with even more awesomeness!',
        githubUrl: 'https://github.com/example/project',
        totalDownloads: '1.2M',
        totalStars: '5.6K',
        totalForks: '1.8K',
        versions: [
            { version: '1.2.3', status: 'success', date: '2023-05-15', downloads: 5000 },
            { version: '1.2.2', status: 'success', date: '2023-04-01', downloads: 12000 },
            { version: '1.2.1', status: 'failed', date: '2023-03-15', downloads: 8000 },
            { version: '1.2.0', status: 'success', date: '2023-02-28', downloads: 15000 },
        ],
        commits: [
            { id: 'abc123', message: 'Fix critical bug in authentication flow', author: 'Alice', date: '2023-05-20', buildStatus: 'success' },
            { id: 'def456', message: 'Add new feature: Dark mode support', author: 'Bob', date: '2023-05-19', buildStatus: 'failed' },
            { id: 'ghi789', message: 'Update dependencies to latest versions', author: 'Charlie', date: '2023-05-18', buildStatus: 'not_built' },
            { id: 'jkl012', message: 'Refactor code for better performance', author: 'David', date: '2023-05-17', buildStatus: 'concurrent' },
        ],
    };
};

export default function ArtifactPage() {
    const { username, project } = useParams<{ username: string; project: string }>();
    const [artifact, setArtifact] = useState<Artifact | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedDependency, setSelectedDependency] = useState<{ version: string; isCommit: boolean } | null>(null);
    const [activeTab, setActiveTab] = useState<string>('commits');

    useEffect(() => {
        const fetchArtifact = async () => {
            try {
                const fetchedArtifact = await getArtifact(username, project);
                setArtifact(fetchedArtifact);
            } catch (err) {
                console.error(err);
                setError('Failed to load artifact data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtifact();
    }, [username, project]);

    const getStatusColor = (status: 'success' | 'failed' | 'pending' | 'not_built' | 'concurrent'): string => {
        switch (status) {
            case 'success':
                return 'bg-green-500';
            case 'failed':
                return 'bg-red-500';
            case 'concurrent':
                return 'bg-blue-500';
            case 'not_built':
                return 'bg-gray-500';
            default:
                return 'bg-yellow-500';
        }
    };

    const getBuildStatusText = (status: 'not_built' | 'failed' | 'success' | 'concurrent'): string => {
        switch (status) {
            case 'not_built':
                return 'Not Built';
            case 'failed':
                return 'Build Failed';
            case 'success':
                return 'Build Successful';
            case 'concurrent':
                return 'Building...';
        }
    };

    const handleBuild = (commitId: string) => {
        console.log(`Building commit ${commitId}`);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex gap-2 mb-8">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-lg mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        );
    }

    if (!artifact) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Artifact not found</h1>
                <p className="text-lg mb-4">The requested artifact could not be found. Please check the URL and try again.</p>
                <Link href="/">
                    <Button>Go to Homepage</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-2">{artifact.name}</h1>
                    <p className="text-xl text-muted-foreground mb-4">{artifact.group}</p>
                    <p className="text-lg mb-4">{artifact.description}</p>
                    <div className="flex flex-wrap gap-4">
                        <Badge variant="secondary" className="text-lg py-1 px-3">
                            Latest: v{artifact.latestVersion}
                        </Badge>
                        <Button onClick={() => {
                            setSelectedDependency({version: artifact.latestVersion, isCommit: false});
                            setIsModalOpen(true);
                        }}>
                            <Package className="mr-2 h-4 w-4"/>
                            Copy Latest Dependency
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4"/>
                            Download Latest
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={artifact.githubUrl} target="_blank" rel="noopener noreferrer">
                                <GitBranch className="mr-2 h-4 w-4"/>
                                View on GitHub
                            </a>
                        </Button>
                    </div>
                </motion.div>

                <Tabs defaultValue="commits" className="mb-12" onValueChange={setActiveTab}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">{activeTab === 'commits' ? 'Recent Commits' : 'Releases'}</h2>
                        <TabsList className="flex space-x-2">
                            <TabsTrigger value="commits" className="px-4 py-2 rounded">Commits</TabsTrigger>
                            <TabsTrigger value="releases" className="px-4 py-2 rounded">Releases</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="commits">
                        <div className="space-y-4">
                            {artifact.commits.map((commit, index) => (
                                <motion.div
                                    key={commit.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.3, delay: index * 0.1}}
                                >
                                    <Card
                                        className="overflow-hidden bg-card hover:shadow-md transition-shadow duration-300">
                                        <div className={`h-2 ${getStatusColor(commit.buildStatus)}`}/>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <GitCommit className="mr-2 h-4 w-4"/>
                                            {commit.id.substring(0, 7)}
                                        </span>
                                                <Badge
                                                    variant={commit.buildStatus === 'success' ? 'default' : 'secondary'}>
                                                    {getBuildStatusText(commit.buildStatus)}
                                                </Badge>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="mb-2 font-medium">{commit.message}</p>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center">
                                            <Clock className="mr-1 h-4 w-4"/>
                                            {commit.date}
                                        </span>
                                                <span className="flex items-center">
                                            Author: {commit.author}
                                        </span>
                                            </div>
                                            <div className="mt-4 flex flex-wrap gap-2 justify-between">
                                                <div className="flex flex-wrap gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <a href={`${artifact.githubUrl}/commit/${commit.id}`}
                                                           target="_blank" rel="noopener noreferrer">
                                                            <GitBranch className="mr-2 h-4 w-4"/>
                                                            View on GitHub
                                                        </a>
                                                    </Button>
                                                    {commit.buildStatus !== 'not_built' && (
                                                        <Button variant="outline" size="sm">
                                                            <FileText className="mr-2 h-4 w-4"/>
                                                            {commit.buildStatus === 'concurrent' ? 'View Build Progress' : 'Build Logs'}
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedDependency({version: commit.id, isCommit: true});
                                                            setIsModalOpen(true);
                                                        }}
                                                    >
                                                        <Package className="mr-2 h-4 w-4"/>
                                                        Copy Dependency
                                                    </Button>
                                                </div>
                                                {commit.buildStatus === 'not_built' && (
                                                    <Button variant="default" size="sm"
                                                            className="bg-blue-500 hover:bg-blue-600 text-white"
                                                            onClick={() => handleBuild(commit.id)}>
                                                        <FileText className="mr-2 h-4 w-4"/>
                                                        Request Build
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="releases">
                        <div className="space-y-4">
                            {artifact.versions.map((version, index) => (
                                <motion.div
                                    key={version.version}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.3, delay: index * 0.1}}
                                >
                                    <Card
                                        className="overflow-hidden bg-card hover:shadow-md transition-shadow duration-300">
                                        <div className={`h-2 ${getStatusColor(version.status)}`}/>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <Tag className="mr-2 h-4 w-4"/>
                                            v{version.version}
                                        </span>
                                                <Badge
                                                    variant={version.status === 'success' ? 'default' : 'destructive'}>
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
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedDependency({
                                                            version: version.version,
                                                            isCommit: false
                                                        });
                                                        setIsModalOpen(true);
                                                    }}
                                                >
                                                    <Package className="mr-2 h-4 w-4"/>
                                                    Copy Dependency
                                                </Button>
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={`${artifact.githubUrl}/releases/tag/v${version.version}`}
                                                       target="_blank" rel="noopener noreferrer">
                                                        <GitBranch className="mr-2 h-4 w-4"/>
                                                        View on GitHub
                                                    </a>
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <FileText className="mr-2 h-4 w-4"/>
                                                    Release Notes
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Download className="mr-2 h-4 w-4"/>
                                                    Download
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            {artifact && selectedDependency && (
                <DependencyModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedDependency(null);
                    }}
                    artifact={artifact}
                    version={selectedDependency.version}
                    isCommit={selectedDependency.isCommit}
                />
            )}
        </div>
    );
}