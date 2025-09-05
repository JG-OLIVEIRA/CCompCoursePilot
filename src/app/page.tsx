import type { Discipline } from '@/types/discipline';
import ClientPage from './client-page';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

async function getDisciplines(): Promise<Discipline[]> {
  try {
    const res = await fetch('https://uerj-scraping-app.onrender.com/disciplines', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) {
      throw new Error('Failed to fetch disciplines');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const disciplines = await getDisciplines();

  if (disciplines.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Fetching Data</AlertTitle>
          <AlertDescription>
            Could not retrieve course information from the server. Please try again later.
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <main>
      <ClientPage disciplines={disciplines} />
    </main>
  );
}
