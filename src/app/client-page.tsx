"use client";

import { useState, useMemo } from 'react';
import type { Discipline } from '@/types/discipline';
import { Input } from '@/components/ui/input';
import { DisciplineCard } from '@/components/DisciplineCard';
import { Search, BookCopy } from 'lucide-react';

export default function ClientPage({ disciplines }: { disciplines: Discipline[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [codeFilter, setCodeFilter] = useState('');

  const filteredDisciplines = useMemo(() => {
    return disciplines.filter((discipline) => {
      const nameMatch =
        discipline.name && discipline.name.toLowerCase().includes(searchTerm.toLowerCase());
      const codeMatch =
        discipline.code && discipline.code.toLowerCase().includes(codeFilter.toLowerCase());
      return nameMatch && codeMatch;
    });
  }, [disciplines, searchTerm, codeFilter]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-12 text-center">
        <div className="mb-4 inline-block rounded-full bg-primary p-4 text-primary-foreground">
          <BookCopy className="h-10 w-10" />
        </div>
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">CCompCoursePilot</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Your navigator for university courses. Search and filter through disciplines to find what
          you're looking for.
        </p>
      </header>

      <div className="mb-8 rounded-lg bg-card p-6 shadow-md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by discipline name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base"
              aria-label="Search by name"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter by course code..."
              value={codeFilter}
              onChange={(e) => setCodeFilter(e.target.value)}
              className="pl-10 text-base"
              aria-label="Filter by code"
            />
          </div>
        </div>
      </div>

      {filteredDisciplines.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredDisciplines.map((discipline) => (
            <DisciplineCard key={discipline.discipline_id} discipline={discipline} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-card px-6 py-16 text-center shadow-md">
          <h2 className="font-headline text-2xl font-semibold">No Courses Found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or filter terms.</p>
        </div>
      )}
    </div>
  );
}
