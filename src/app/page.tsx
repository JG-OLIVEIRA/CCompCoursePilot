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
      throw new Error('Falha ao buscar disciplinas');
    }
    const data: Omit<Discipline, 'code' | 'department'>[] = await res.json();
    
    // The API does not provide a separate 'code' or 'department', so we extract it from the 'name'
    return data.map((discipline) => {
      const nameParts = discipline.name.split(' ');
      const code = nameParts.shift() || '';
      const name = nameParts.join(' ');
      const department = code.split('-')[0] || 'Unknown';
      return { ...discipline, name, code, department };
    });
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
          <AlertTitle>Erro ao Carregar Dados</AlertTitle>
          <AlertDescription>
            Não foi possível obter as informações do curso do servidor. Por favor, tente novamente mais tarde.
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
