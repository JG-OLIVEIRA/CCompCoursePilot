"use client";

import type { Discipline } from '@/types/discipline';
import { DisciplineCard } from '@/components/DisciplineCard';
import Link from 'next/link';

export default function ClientPage({ disciplines }: { disciplines: Discipline[] }) {
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Grade Curricular</h1>
        <p className="text-lg text-muted-foreground mt-2">Ciência da Computação - UERJ</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {disciplines.map((discipline) => (
          <Link key={discipline.discipline_id} href={`/disciplinas/${discipline.discipline_id}`} className="block">
            <DisciplineCard discipline={discipline} />
          </Link>
        ))}
      </div>
    </div>
  );
}
