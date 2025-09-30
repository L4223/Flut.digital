import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Blogbeiträge</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Aktive Beiträge</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kontaktanfragen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Ungelesene Anfragen</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
