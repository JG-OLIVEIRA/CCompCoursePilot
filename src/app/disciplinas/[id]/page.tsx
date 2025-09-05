import type { Discipline } from '@/types/discipline';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function getDisciplineDetails(id: string): Promise<Discipline | null> {
  try {
    const res = await fetch(`https://uerj-scraping-app.onrender.com/disciplines/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) {
      throw new Error(`Falha ao buscar detalhes da disciplina: ${res.statusText}`);
    }
    const data = await res.json();
     // The API returns the name with code, so we process it here
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
              <CardTitle className="text-3xl font-bold mb-2">{discipline.name}</CardTitle>
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
                <ul className="list-disc pl-5 space-y-2">
                    {discipline.requirements.map((req, index) => (
                    <li key={index}>
                        <Badge variant={req.type === 'Pré-Requisito' ? 'destructive' : 'secondary'} className="mr-2">
                        {req.type}
                        </Badge>
                        <span>{req.description}</span>
                    </li>
                    ))}
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
                                    <TableCell>{cls.teacher}</TableCell>
                                    <TableCell>{cls.times}</TableCell>
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
