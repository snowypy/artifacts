import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from 'lucide-react';
import {Project} from "@/types/project";

interface SearchResultsProps {
    results: Project[];
    isLoading: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
    if (isLoading) {
        return <p className="text-center text-muted-foreground">Searching...</p>;
    }

    if (results.length === 0) {
        return <p className="text-center text-muted-foreground">No results found</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((result) => (
                <Card key={result.id} className="bg-card border-border hover:border-primary transition-colors">
                    <CardHeader>
                        <CardTitle className="text-lg text-primary">{result.repoName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">by {result.username}</p>
                        <p className="text-sm text-foreground">{result.downloads} downloads</p>
                        <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={window.open("https://github.com/" + result.username + "/" + result.repoName)}>
                            <Github className="mr-2 h-4 w-4" />
                            View on GitHub
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}