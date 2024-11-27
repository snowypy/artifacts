'use client';

import { useState, useEffect, useCallback} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Github, Search, Loader2} from 'lucide-react';
import {useToast} from "@/hooks/use-toast";
import {SearchResults} from "@/components/search-results";
import debounce from 'lodash.debounce';
import {Project} from '@/types/project';
import {motion} from 'framer-motion';

export default function HomePage() {
  const router = useRouter();
  const {toast} = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [popularProjects, setPopularProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
    fetchPopularProjects();
  }, []);

  const fetchPopularProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api/projects/top`);
      if (!response.ok) {
        throw new Error('Failed to fetch popular projects');
      }
      const data = await response.json();
      setPopularProjects(data || []);
    } catch (error) {
      console.error('Error fetching popular projects:', error);
      toast({
        title: 'Error',
        description: 'Failed to load popular projects. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(
      debounce(async (query, projects: Project[], page: number) => {
        if (query.trim() === '') {
          setSearchResults([]);
          return;
        }

        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const filteredResults = projects.filter(project =>
              project.repoName.toLowerCase().includes(query.toLowerCase()) ||
              project.username.toLowerCase().includes(query.toLowerCase())
          );
          const paginatedResults = filteredResults.slice((page - 1) * resultsPerPage, page * resultsPerPage);
          setSearchResults(paginatedResults);
        } catch (error) {
          console.error(error);
          toast({
            title: "Search Error",
            description: "An error occurred while searching. Please try again.",
          });
        } finally {
          setIsLoading(false);
        }
      }, 300),
      [toast]
  );

  useEffect(() => {
    debouncedSearch(searchQuery, popularProjects, currentPage);
  }, [searchQuery, popularProjects, currentPage, debouncedSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      toast({
        title: "Search Error",
        description: "Please enter a search query.",
      });
      return;
    }

    const isValidFormat = /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(trimmedQuery);

    if (isValidFormat) {
      router.push(`/projects/${trimmedQuery}`);
    } else {
      setCurrentPage(1);
      debouncedSearch(trimmedQuery, popularProjects, 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    debouncedSearch(searchQuery, popularProjects, newPage);
  };

  const handleGithubClick = (e: React.MouseEvent<HTMLButtonElement>, githubUrl: string | URL | undefined) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(githubUrl, '_blank', 'noopener noreferrer');
  };

  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto px-4 py-8">
          <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">Welcome to ByteStore</h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">Build and serve Java artifacts from GitHub repositories with ease</p>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row max-w-md mx-auto">
              <div className="relative flex-grow mb-2 sm:mb-0 sm:mr-2">
                <Input
                    type="text"
                    placeholder="Search for a repository..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary text-secondary-foreground"
                    aria-label="Search for a repository"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
              <Button
                  type="submit"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
              >
                {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                ) : (
                    'Search'
                )}
              </Button>
            </form>
          </motion.section>

          <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              aria-live="polite"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {searchQuery ? 'Search Results' : 'Popular Artifacts'}
            </h2>
            {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : searchQuery ? (
                <>
                  <SearchResults results={searchResults} isLoading={isLoading} />
                  <div className="flex justify-center mt-4">
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2"
                    >
                      Previous
                    </Button>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={searchResults.length < resultsPerPage}
                    >
                      Next
                    </Button>
                  </div>
                </>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {popularProjects.map((project) => {
                    const githubUrl = `https://github.com/${project.username}/${project.repoName}`;

                    return (
                        <Link
                            href={`/projects/${project.username}/${project.repoName}`}
                            key={project.id}
                        >
                          <Card className="bg-card border-border hover:border-primary transition-colors cursor-pointer">
                            <CardHeader>
                              <CardTitle className="text-lg text-primary">{project.repoName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-2">by {project.username}</p>
                              <p className="text-sm text-foreground">{project.downloads} downloads</p>
                              <Button
                                  variant="outline"
                                  className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                  onClick={(e) => handleGithubClick(e, githubUrl)}
                              >
                                <Github className="mr-2 h-4 w-4"/>
                                View on GitHub
                              </Button>
                            </CardContent>
                          </Card>
                        </Link>
                    );
                  })}
                </div>
            )}
          </motion.section>
        </main>
      </div>
  );
} 