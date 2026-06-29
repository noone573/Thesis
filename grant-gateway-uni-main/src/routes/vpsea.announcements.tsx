import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Megaphone } from "lucide-react";
import { api } from "@/lib/api";
import { useState } from "react";

export const Route = createFileRoute("/vpsea/announcements")({ component: Ann });

function Ann() {
  const qc = useQueryClient();
  const { data: announcements = [] } = useQuery({ queryKey: ["vpsea-announcements"], queryFn: api.getVPSEAAnnouncements });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const create = useMutation({
    mutationFn: () => api.createVPSEAAnnouncement({ title, body }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["vpsea-announcements"] }); setTitle(""); setBody(""); },
  });

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="p-6 lg:col-span-2 space-y-3">
        <h3 className="font-semibold mb-2">Published</h3>
        {announcements.map((a: any) => (
          <div key={a.id} className="p-4 rounded-xl border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Megaphone className="h-3 w-3" />{a.date}</div>
            <p className="font-medium mt-1">{a.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{a.body}</p>
          </div>
        ))}
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">New Announcement</h3>
        <Input placeholder="Title" className="mb-2" value={title} onChange={e => setTitle(e.target.value)} />
        <Textarea placeholder="Message body…" className="mb-4 min-h-32" value={body} onChange={e => setBody(e.target.value)} />
        <Button className="w-full" onClick={() => create.mutate()} disabled={!title || !body || create.isPending}>Publish</Button>
      </Card>
    </div>
  );
}
