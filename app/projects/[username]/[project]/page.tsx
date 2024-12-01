'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Download, GitBranch, Clock, FileText, GitCommit, HammerIcon } from 'lucide-react';
import { DependencyModal } from '@/components/dependency-modal';
import { motion } from "framer-motion";
import { Project } from "@/types/project";

interface Commit {
    commitHash: string;
    commitMessage: string;
    author: string;
    date: string;
    buildInfo: BuildInfo;
}

interface BuildInfo {
    id: string;
    projectId: string;
    builtAt: string;
    location: 'LOCAL' | 'S3' | 'DISCORD';
    status: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS';
}

export default function ArtifactPage() {
    const { username, project } = useParams<{ username: string; project: string }>();
    const [projectData, setProjectData] = useState<Project | null>(null);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [buildingCommits, setBuildingCommits] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedDependency, setSelectedDependency] = useState<{ version: string; isCommit: boolean } | null>(null);
    const [activeTab, setActiveTab] = useState<string>('commits');
    const [isAdmin, setIsAdmin] = useState<boolean>(false); 

    useEffect(() => {
        const fetchArtifact = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${username}/${project}`);
                if (!res.ok) {
                    console.log("Failed to fetch project information");
                    return {
                        redirect: {
                            destination: '/404',
                            permanent: false,
                        },
                    };
                }

                const data = await res.json();
                setProjectData(data);


                // Check if the user is an admin (you can adjust this logic based on how you manage roles)
                if (data.isAdmin) {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load project data. Please try again later.');
                return {
                    redirect: {
                        destination: '/404',
                        permanent: false,
                    },
                };
            } finally {
                setLoading(false);
            }
        };

        const fetchCommits = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${username}/${project}/commits`);
                if (!res.ok) {
                    console.log("Failed to fetch commit information");
                    return {
                        redirect: {
                            destination: '/404',
                            permanent: false,
                        },
                    };
                }

                setCommits(await res.json());
            } catch (err) {
                console.error(err);
                setError('Failed to load commit data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtifact();
        fetchCommits();
    }, [username, project]);

    const getStatusColor = (status: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS' | 'NOT_BUILT'): string => {
        switch (status) {
            case 'SUCCESS':
                return 'bg-green-500';
            case 'FAILED':
                return 'bg-red-500';
            case 'IN_PROGRESS':
                return 'bg-blue-500';
            case 'NOT_BUILT':
                return 'bg-gray-500';
            default:
                return 'bg-yellow-500';
        }
    };

    const getBuildStatusText = (status: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS' | 'NOT_BUILT'): string => {
        switch (status) {
            case 'NOT_BUILT':
                return 'Not Built';
            case 'FAILED':
                return 'Build Failed';
            case 'SUCCESS':
                return 'Build Successful';
            case 'IN_PROGRESS':
                return 'Building...';
        }
    };

    const handleBuild = async (commitId: string) => {
        try {
            setBuildingCommits(prev => new Set(prev).add(commitId));
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${username}/${project}/build/${commitId}`, {
                method: 'POST',
            });
            if (response.ok) {
                const buildInfo = await response.json();
                setCommits(prevCommits =>
                    prevCommits.map(commit =>
                        commit.commitHash === commitId
                            ? { ...commit, buildInfo: { ...buildInfo, status: 'IN_PROGRESS' } }
                            : commit
                    )
                );
    
                const intervalId = setInterval(async () => {
                    const statusResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${username}/${project}/build/${commitId}/status`);
                    if (statusResponse.ok) {
                        const statusData = await statusResponse.json();
                        setCommits(prevCommits =>
                            prevCommits.map(commit =>
                                commit.commitHash === commitId
                                    ? { ...commit, buildInfo: { ...statusData } }
                                    : commit
                            )
                        );
    
                        if (statusData.status !== 'IN_PROGRESS') {
                            clearInterval(intervalId);
                        }
                    } else {
                        console.error('Failed to fetch build status');
                        clearInterval(intervalId);
                    }
                }, 5000); // [:] Counted in milliseconds (5 seconds)
            } else {
                console.error('Failed to request build');
            }
        } catch (error) {
            console.error('Error requesting build:', error);
        } finally {
            setBuildingCommits(prev => {
                const newSet = new Set(prev);
                newSet.delete(commitId);
                return newSet;
            });
        }
    };

    const handleBlacklist = async () => {
        if (projectData) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${username}/${project}/blacklist`, {
                method: 'POST',
            });
            if (res.ok) {
                alert('Project has been blacklisted successfully.');
            } else {
                alert('Failed to blacklist the project.');
            }
        }
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

    if (!projectData) {
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <DependencyModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={projectData}
                    version={selectedDependency?.version || ''}
                    isCommit={selectedDependency?.isCommit || false}
                    />
                    <h1 className="text-4xl font-bold mb-2">{projectData.repoName}</h1>
                    <p className="text-xl text-muted-foreground mb-4">com.github.{projectData.username.toLowerCase()}</p>
                    <p className="text-lg mb-4">This is an example description because we are too lazy to implement description rn.</p>
                    <div className="flex flex-wrap gap-4">
                        <Badge variant="secondary" className="text-lg py-1 px-3">
                            Latest: v1.0
                        </Badge>
                        <Button onClick={() => {
                            setSelectedDependency({ version: "1.0", isCommit: false });
                            setIsModalOpen(true);
                        }}>
                            <Package className="mr-2 h-4 w-4" />
                            Copy Latest Dependency
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download Latest
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={`https://github.com/${username}/${project}`} target="_blank" rel="noopener noreferrer">
                                <GitBranch className="mr-2 h-4 w-4" />
                                View on GitHub
                            </a>
                        </Button>
                    </div>
                    {isAdmin && ( 
                        <div className="mt-6">
                            <Button onClick={handleBlacklist} variant="destructive">
                                 <HammerIcon className="mr-2 h-4 w-4" />
                                Blacklist Project
                            </Button>
                        </div>
                    )
                   }
                </motion.div>

                <Tabs defaultValue="commits" className="mb-12" onValueChange={setActiveTab}>
                    <div className="flex justify-between items-center mb-4">
                        <TabsList>
                            <TabsTrigger value="commits">Commits</TabsTrigger>
                            <TabsTrigger value="builds">Releases</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="commits">
                        <div className="space-y-4">
                            {commits.map((commit, index) => (
                                <motion.div
                                    key={commit.commitHash}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.3, delay: index * 0.1}}
                                >
                                    <Card
                                        className="overflow-hidden bg-card hover:shadow-md transition-shadow duration-300">
                                        <div className={`h-2 ${getStatusColor(commit.buildInfo != null ? commit.buildInfo.status : "NOT_BUILT")}`}/>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                        <span className="flex items-center">
                                            <GitCommit className="mr-2 h-4 w-4"/>
                                            {commit.commitHash.substring(0, 7)}
                                        </span>
                                                <Badge
                                                    variant={commit.buildInfo != null && commit.buildInfo.status === 'SUCCESS' ? 'default' : 'secondary'}>
                                                    {getBuildStatusText(commit.buildInfo != null ? commit.buildInfo.status : "NOT_BUILT")}
                                                </Badge>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="mb-2 font-medium">{commit.commitMessage}</p>
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
                                                        <a href={`https://github.com/${username}/${project}/commit/${commit.commitHash}`}
                                                           target="_blank" rel="noopener noreferrer">
                                                            <GitBranch className="mr-2 h-4 w-4"/>
                                                            View on GitHub
                                                        </a>
                                                    </Button>
                                                    {commit.buildInfo != null && (
                                                        <Button variant="outline" size="sm">
                                                            <FileText className="mr-2 h-4 w-4"/>
                                                            {commit.buildInfo.status === 'IN_PROGRESS' ? 'View Build Progress' : 'Build Logs'}
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedDependency({version: commit.commitHash, isCommit: true});
                                                            setIsModalOpen(true);
                                                        }}
                                                    >
                                                        <Package className="mr-2 h-4 w-4"/>
                                                        Copy Dependency
                                                    </Button>
                                                </div>
                                                {commit.buildInfo == null && (
                                                    <Button variant="default" size="sm"
                                                            className="bg-blue-500 hover:bg-blue-600 text-white"
                                                            onClick={() => handleBuild(commit.commitHash)}>
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
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
