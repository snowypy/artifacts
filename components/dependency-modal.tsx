import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';
import {Project} from "@/types/project";

interface DependencyModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project,
    version: string;
    isCommit: boolean;
}

export function DependencyModal({ isOpen, onClose, project, version, isCommit }: DependencyModalProps) {
    const [copiedTab, setCopiedTab] = useState<string | null>(null);
    const displayVersion = isCommit ? version.substring(0, 7) : version;
    
    const mavenDependency = `<dependency>
  <groupId>com.github.${project.username.toLowerCase()}</groupId>
  <artifactId>${project.repoName}</artifactId>
  <version>${isCommit ? displayVersion + '-SNAPSHOT' : displayVersion}</version>
</dependency>`;

    const gradleDependency = `implementation 'com.github.${project.username.toLowerCase()}:${project.repoName}:${isCommit ? displayVersion + '-SNAPSHOT' : displayVersion}'`;

    const copyToClipboard = (text: string, tab: string) => {
        navigator.clipboard.writeText(text);
        setCopiedTab(tab);
        setTimeout(() => setCopiedTab(null), 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px] w-full">
                <DialogHeader>
                    <DialogTitle>Copy Dependency</DialogTitle>
                    <DialogDescription>
                        Copy the dependency configuration for {isCommit ? `commit ${displayVersion}` : `version ${displayVersion}`}.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="maven" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="maven">Maven</TabsTrigger>
                        <TabsTrigger value="gradle">Gradle</TabsTrigger>
                    </TabsList>
                    <TabsContent value="maven">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
                            <code>{mavenDependency}</code>
                        </pre>
                        <Button
                            onClick={() => copyToClipboard(mavenDependency, 'maven')}
                            className="mt-2 w-full text-sm"
                            variant={copiedTab === 'maven' ? 'outline' : 'default'}
                            size="sm"
                        >
                            {copiedTab === 'maven' ? (
                                <>
                                    <Check className="mr-1 h-3 w-3" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="mr-1 h-3 w-3" />
                                    Copy Maven Dependency
                                </>
                            )}
                        </Button>
                    </TabsContent>
                    <TabsContent value="gradle">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
                            <code>{gradleDependency}</code>
                        </pre>
                        <Button
                            onClick={() => copyToClipboard(gradleDependency, 'gradle')}
                            className="mt-2 w-full text-sm"
                            variant={copiedTab === 'gradle' ? 'outline' : 'default'}
                            size="sm"
                        >
                            {copiedTab === 'gradle' ? (
                                <>
                                    <Check className="mr-1 h-3 w-3" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="mr-1 h-3 w-3" />
                                    Copy Gradle Dependency
                                </>
                            )}
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

