import type { Discipline } from '@/types/discipline';
import ClientPage from './client-page';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { getDisciplineMap, getDisciplines } from '@/lib/discipline-utils';


export default async function Home() {
  const disciplines = await getDisciplines();
  const disciplineMap = await getDisciplineMap();

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
      <ClientPage disciplines={disciplines} disciplineMap={disciplineMap} />
    </main>
  );
}
