"use client";

import type { Discipline } from '@/types/discipline';
import { DisciplineCard } from '@/components/DisciplineCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { DisciplineCodeMap } from '@/lib/discipline-utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ClientPage({ disciplines, disciplineMap }: { disciplines: Discipline[], disciplineMap: DisciplineCodeMap }) {
  
  const groupedDisciplines = disciplines.reduce((acc, discipline) => {
    // We only want to show disciplines that have a numeric period on this page
    if (discipline.period && /^\d+$/.test(discipline.period)) {
      (acc[discipline.period] = acc[discipline.period] || []).push(discipline);
    }
    return acc;
  }, {} as Record<string, Discipline[]>);

  const sortedPeriods = Object.keys(groupedDisciplines).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Grade Curricular</h1>
        <p className="text-lg text-muted-foreground mt-2">Ciência da Computação - UERJ</p>
        <Link href="/disciplinas/eletivas" passHref className="mt-6">
          <Button>
            Ver Disciplinas Eletivas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Accordion type="multiple" defaultValue={sortedPeriods} className="w-full space-y-4">
        {sortedPeriods.map((period) => (
          <AccordionItem value={period} key={period} className="border-b-0">
             <AccordionTrigger className="text-2xl font-bold font-headline mb-2 border-b pb-2 hover:no-underline">
                {period}º Período
              </AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
                  {groupedDisciplines[period].map((discipline) => (
                    <Link key={discipline.discipline_id} href={`/disciplinas/${discipline.discipline_id}`} className="block">
                      <DisciplineCard discipline={discipline} />
                    </Link>
                  ))}
                </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
