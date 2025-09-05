"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Discipline } from '@/types/discipline';
import { Input } from '@/components/ui/input';
import { DisciplineCard } from '@/components/DisciplineCard';
import { Search, BookCopy } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Flowchart from '@/components/Flowchart';
import { Card, CardContent } from '@/components/ui/card';

export default function ClientPage({ disciplines }: { disciplines: Discipline[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePeriods, setActivePeriods] = useState<string[]>([]);

  const filteredDisciplines = useMemo(() => {
    return disciplines.filter((discipline) => {
      return discipline.name && discipline.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [disciplines, searchTerm]);

  const groupedDisciplines = useMemo(() => {
    return filteredDisciplines.reduce((acc, discipline) => {
      const period = discipline.period || 'Sem Período';
      if (!acc[period]) {
        acc[period] = [];
      }
      acc[period].push(discipline);
      return acc;
    }, {} as Record<string, Discipline[]>);
  }, [filteredDisciplines]);

  const sortedPeriods = useMemo(() => {
    return Object.keys(groupedDisciplines).sort((a, b) => {
      if (a === 'Sem Período') return 1;
      if (b === 'Sem Período') return -1;
      if (a === '-') return 1;
      if (b === '-') return -1;
      return parseInt(a, 10) - parseInt(b, 10);
    });
  }, [groupedDisciplines]);

  useEffect(() => {
    // Expand all periods by default when component mounts or groups change
    setActivePeriods(sortedPeriods);
  }, [sortedPeriods]);
  
  const { mandatoryCredits, electiveCredits } = useMemo(() => {
    return disciplines.reduce(
      (acc, discipline) => {
        if (discipline.attended === 'Sim') {
          if (discipline.type === 'Obrigatória') {
            acc.mandatoryCredits += parseInt(discipline.credits, 10) || 0;
          } else if (discipline.type.startsWith('E.')) {
            acc.electiveCredits += parseInt(discipline.credits, 10) || 0;
          }
        }
        return acc;
      },
      { mandatoryCredits: 0, electiveCredits: 0 }
    );
  }, [disciplines]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-12 text-center">
        <div className="mb-4 inline-block rounded-full bg-primary p-4 text-primary-foreground">
          <BookCopy className="h-10 w-10" />
        </div>
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">CCompCoursePilot</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Seu navegador para cursos universitários. Pesquise e filtre as disciplinas para encontrar o que você procura.
        </p>
      </header>
      
      <Card className="mb-8">
        <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-card shadow-md">
                    <h3 className="font-headline text-xl font-semibold text-primary">Créditos em Disciplinas Obrigatórias</h3>
                    <p className="font-body text-3xl font-bold">{mandatoryCredits}</p>
                </div>
                <div className="p-4 rounded-lg bg-card shadow-md">
                    <h3 className="font-headline text-xl font-semibold text-primary">Créditos em Disciplinas Eletivas</h3>
                    <p className="font-body text-3xl font-bold">{electiveCredits}</p>
                </div>
            </div>
        </CardContent>
      </Card>


      <Flowchart disciplines={disciplines} />

      <div className="mb-8 rounded-lg bg-card p-6 shadow-md">
        <div className="grid grid-cols-1 gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar por nome da disciplina..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base"
              aria-label="Pesquisar por nome"
            />
          </div>
        </div>
      </div>

      {filteredDisciplines.length > 0 ? (
        <Accordion
          type="multiple"
          value={activePeriods}
          onValueChange={setActivePeriods}
          className="w-full space-y-4"
        >
          {sortedPeriods.map((period) => (
            <AccordionItem value={period} key={period} className="rounded-lg bg-card shadow-md">
              <AccordionTrigger className="px-6 py-4 font-headline text-2xl font-semibold hover:no-underline">
                {period === '-' ? 'Eletivas' : `${period}º Período`}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {groupedDisciplines[period].map((discipline) => (
                    <DisciplineCard key={discipline.discipline_id} discipline={discipline} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="rounded-lg bg-card px-6 py-16 text-center shadow-md">
          <h2 className="font-headline text-2xl font-semibold">Nenhuma disciplina encontrada</h2>
          <p className="mt-2 text-muted-foreground">Tente ajustar seus termos de pesquisa ou filtro.</p>
        </div>
      )}
    </div>
  );
}
