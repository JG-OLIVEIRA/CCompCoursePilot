import type { Discipline } from '@/types/discipline';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RequirementLink } from '@/components/RequirementLink';

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
    const name = data.name; // Use the full name from the API
    const department = code.split('-')[0] || 'Unknown';
    return { ...data, name, code, department };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getMultipleDisciplines(ids: string[]): Promise<Discipline[]> {
  if (ids.length === 0) return [];
  try {
    const results = await Promise.all(
      ids.map(id => 
        fetch(`https://uerj-scraping-app.onrender.com/disciplines/${id}`, { next: { revalidate: 3600 } })
        .then(res => res.ok ? res.json() : null)
      )
    );
    return results.filter(Boolean) as Discipline[];
  } catch (error) {
    console.error('Falha ao buscar múltiplas disciplinas:', error);
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
  const discipline = await getDisciplineDetails(params.id);

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

  const requirementCodes = discipline.requirements?.flatMap(req => req.description.match(/[A-Z]{3}\d{2}-\d{5}/g) || []) || [];
  const requiredDisciplines = await getMultipleDisciplines(requirementCodes);
  
  const checkRequirementStatus = (description: string) => {
    const codeRegex = /[A-Z]{3}\d{2}-\d{5}/g;
    const requiredCodesInDesc = description.match(codeRegex);

    if (!requiredCodesInDesc || requiredCodesInDesc.length === 0) {
      // If no specific discipline code is mentioned, we can't determine fulfillment status
      // This could be for requirements like "Credit lock"
      return false;
    }
    
    // For 'E' type (AND), all must be fulfilled
    // For 'OU' type (OR), at least one must be fulfilled
    const isAndRequirement = description.includes(' E ');

    const fulfilledCodes = requiredCodesInDesc.map(reqCode => {
        const reqDiscipline = requiredDisciplines.find((d) => d.name.startsWith(reqCode));
        return reqDiscipline?.attended === 'Sim';
    });

    if (isAndRequirement) {
        return fulfilledCodes.every(status => status);
    } else {
        return fulfilledCodes.some(status => status);
    }
  };

  const disciplineName = discipline.name.split(' ').slice(1).join(' ');

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
              <CardTitle className="text-3xl font-bold mb-2">{discipline.code} - {disciplineName}</CardTitle>
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
                  const hasDisciplineCode = /[A-Z]{3}\d{2}-\d{5}/g.test(req.description);

                  return (
                    <li key={index} className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                      <Badge variant={req.type === 'Pré-Requisito' ? 'destructive' : 'secondary'}>{req.type}</Badge>
                      <div className="flex-grow">
                        <RequirementLink description={req.description} />
                      </div>
                      {hasDisciplineCode && (
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
                      )}
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
