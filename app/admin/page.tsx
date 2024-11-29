'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, FilePlus, PackagePlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/context/auth-context";

function AdminPage() {
  const metrics = {
    totalUsers: '500',
    projectsIndexed: '200',
    artifactsBuilt: '1.5K',
  };

  const nodesToApprove = [
    { id: 1, nodeName: 'Node Alpha', requester: 'User123', status: 'Pending' },
    { id: 2, nodeName: 'Node Beta', requester: 'User456', status: 'Pending' },
    { id: 3, nodeName: 'Node Gamma', requester: 'User789', status: 'Pending' },
  ];

  const { user } = useAuth();
  if (!user) return null;

  return (
    <div>
      <main className="container mx-auto px-4 py-8">

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Admin Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projects Indexed</CardTitle>
                <FilePlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.projectsIndexed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Artifacts Built</CardTitle>
                <PackagePlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.artifactsBuilt}</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Approve Nodes</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Node Name</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodesToApprove.map((node) => (
                <TableRow key={node.id}>
                  <TableCell>{node.nodeName}</TableCell>
                  <TableCell>{node.requester}</TableCell>
                  <TableCell>{node.status}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => alert(`Approved ${node.nodeName}`)}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => alert(`Declined ${node.nodeName}`)}
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </section>
      </main>
    </div>
  );
}

export default function ProtectedAdminPage() {
  return (
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  );
}
