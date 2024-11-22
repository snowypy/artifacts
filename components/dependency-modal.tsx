import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';

interface DependencyModalProps {
    isOpen: boolean;
    onClose: () => void;
    artifact: {
        group: string;
        name: string;
    };
    version: string;
    isCommit: boolean;
}

export function DependencyModal({ isOpen, onClose, artifact, version, isCommit }: DependencyModalProps) {
    const [copiedTab, setCopiedTab] = useState<string | null>(null);

    const mavenDependency = `<dependency>
  <groupId>${artifact.group}</groupId>
  <artifactId>${artifact.name}</artifactId>
  <version>${isCommit ? version + '-SNAPSHOT' : version}</version>
</dependency>`;

    const gradleDependency = `implementation '${artifact.group}:${artifact.name}:${isCommit ? version + '-SNAPSHOT' : version}'`;

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
                        Copy the dependency configuration for {isCommit ? `commit ${version.substring(0, 7)}` : `version ${version}`}.
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

