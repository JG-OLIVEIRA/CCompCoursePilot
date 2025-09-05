import type { Discipline } from '@/types/discipline';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

async function getDisciplineDetails(id: string): Promise<Discipline | null> {
  try {
    const res = await fetch(`https://uerj-scraping-app.onrender.com/disciplines/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) {
      throw new Error(`Falha ao buscar detalhes da disciplina: ${res.statusText}`);
    }
    const data = await res.json();
    const nameParts = data.name.split(' ');
    const code = nameParts.shift() || '';
    const name = nameParts.join(' ');
    const department = code.split('-')[0] || 'Unknown';
    return { ...data, name, code, department };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getDisciplines(): Promise<Discipline[]> {
  try {
    const res = await fetch('https://uerj-scraping-app.onrender.com/disciplines', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Falha ao buscar disciplinas');
    const data: Omit<Discipline, 'code' | 'department'>[] = await res.json();
    return data.map((discipline) => {
      const nameParts = discipline.name.split(' ');
      const code = nameParts[0] || '';
      const name = nameParts.slice(1).join(' ');
      const department = code.split('-')[0] || 'Unknown';
      return { ...discipline, name: discipline.name, code, department, discipline_id: discipline.discipline_id };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

function toTitleCase(str: string): string {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => {
    const lower = txt.toLowerCase();
    // Keep small connecting words in lowercase, unless it's the first word.
    if (['de', 'da', 'do', 'dos', 'das'].includes(lower) && str.toLowerCase().indexOf(lower) > 0) {
      return lower;
    }
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

const dayMapping: { [key: string]: string } = {
  SEG: 'Segunda',
  TER: 'Terça',
  QUA: 'Quarta',
  QUI: 'Quinta',
  SEX: 'Sexta',
  SAB: 'Sábado',
};

function formatTimes(times: string) {
  if (!times) return null;

  const parts = times.split(' ');
  const schedule: { [key: string]: string[] } = {};
  let currentDay = '';

  parts.forEach((part) => {
    if (dayMapping[part]) {
      currentDay = dayMapping[part];
      if (!schedule[currentDay]) {
        schedule[currentDay] = [];
      }
    } else if (currentDay) {
      schedule[currentDay].push(part);
    }
  });

  return Object.entries(schedule).map(([day, timeSlots]) => (
    <div key={day}>
      <span className="font-semibold">{day}:</span> {timeSlots.join(', ')}
    </div>
  ));
}

export default async function DisciplineDetailPage({ params }: { params: { id: string } }) {
  const [discipline, allDisciplines] = await Promise.all([
    getDisciplineDetails(params.id),
    getDisciplines(),
  ]);

  if (!discipline) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Dados</AlertTitle>
          <AlertDescription>
            Não foi possível obter as informações da disciplina do servidor. Por favor, tente novamente mais tarde.
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  const checkRequirementStatus = (description: string) => {
    // Regex to find all discipline codes (e.g., IME01-12345) in the description string.
    const codeRegex = /[A-Z]{3}\d{2}-\d{5}/g;
    const requiredCodes = description.match(codeRegex);

    if (!requiredCodes || requiredCodes.length === 0) {
      // If no codes are found, we can't determine status, assume not fulfilled for safety.
      return false;
    }
    
    // Check if at least one of the required disciplines has been attended.
    return requiredCodes.some(reqCode => {
        const reqDiscipline = allDisciplines.find((d) => d.name.startsWith(reqCode + ' '));
        return reqDiscipline?.attended === 'Sim';
    });
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Grade
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{discipline.code} - {discipline.name.split(' ').slice(1).join(' ')}</CardTitle>
              <p className="text-muted-foreground text-lg">
                {discipline.type} - {discipline.credits} créditos - {discipline.total_hours} horas
              </p>
            </div>
            <Badge variant={discipline.attended === 'Sim' ? 'default' : 'secondary'} className={discipline.attended === 'Sim' ? 'bg-green-600' : ''}>
              {discipline.attended === 'Sim' ? 'Cursada' : 'Não Cursada'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          {discipline.requirements && discipline.requirements.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Requisitos</h3>
              <ul className="list-none pl-0 space-y-3">
                {discipline.requirements.map((req, index) => {
                  const isFulfilled = checkRequirementStatus(req.description);
                  return (
                    <li key={index} className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                      <Badge variant={req.type === 'Pré-Requisito' ? 'destructive' : 'secondary'}>{req.type}</Badge>
                      <span className="flex-grow">{req.description}</span>
                      <div className="flex items-center gap-2">
                        {isFulfilled ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium text-green-600">Cumprido</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-500" />
                            <span className="text-sm font-medium text-red-600">Não Cumprido</span>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {discipline.classes && discipline.classes.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Turmas Disponíveis</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Turma</TableHead>
                      <TableHead>Professor</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Vagas Ofertadas</TableHead>
                      <TableHead>Vagas Ocupadas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discipline.classes.map((cls) => (
                      <TableRow key={cls.number}>
                        <TableCell>{cls.number}</TableCell>
                        <TableCell>{toTitleCase(cls.teacher)}</TableCell>
                        <TableCell>{formatTimes(cls.times)}</TableCell>
                        <TableCell>{cls.offered_uerj}</TableCell>
                        <TableCell>{cls.occupied_uerj}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
