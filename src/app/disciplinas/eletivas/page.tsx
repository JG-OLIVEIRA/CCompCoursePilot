
import type { Discipline } from '@/types/discipline';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { DisciplineCard } from '@/components/DisciplineCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getDisciplines } from '@/lib/discipline-utils';

export default async function EletivasPage() {
  const allDisciplines = await getDisciplines();
  const eletivas = allDisciplines.filter(d => d.type.includes('Eletiva'));

  if (allDisciplines.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Dados</AlertTitle>
          <AlertDescription>
            Não foi possível obter as informações do servidor. Por favor, tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Disciplinas Eletivas</h1>
        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Grade
          </Button>
        </Link>
      </div>

      {eletivas.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {eletivas.map((discipline) => (
             <Link key={discipline.discipline_id} href={`/disciplinas/${discipline.discipline_id}`} className="block">
                <DisciplineCard discipline={discipline} />
            </Link>
          ))}
        </div>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Nenhuma Eletiva Encontrada</AlertTitle>
          <AlertDescription>
            Não há disciplinas eletivas disponíveis no momento.
          </AlertDescription>
        </Alert>
      )}
    </main>
  );
}
