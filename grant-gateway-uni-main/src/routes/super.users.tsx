import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/AdminLayout";
import { Search, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/super/users")({ component: U });

function U() {
  const { data: users = [] } = useQuery({ queryKey: ["super-users"], queryFn: api.getUsers });

  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users…" className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="vpsea">VPSEA Admin</SelectItem>
            <SelectItem value="unifast">UniFAST Admin</SelectItem>
            <SelectItem value="super">Super Admin</SelectItem>
          </SelectContent>
        </Select>
        <Button><Plus className="h-4 w-4 mr-2" /> Add User</Button>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{users.map((u: any) => (
          <TableRow key={u.id}>
            <TableCell className="font-medium">{u.first_name} {u.last_name}</TableCell>
            <TableCell className="text-muted-foreground">{u.email}</TableCell>
            <TableCell>{u.role}</TableCell>
            <TableCell><StatusBadge status={u.status} /></TableCell>
            <TableCell className="space-x-1"><Button size="sm" variant="ghost">Edit</Button><Button size="sm" variant="ghost">Reset</Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </Card>
  );
}
