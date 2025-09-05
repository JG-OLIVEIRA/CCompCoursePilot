import type { Discipline } from '@/types/discipline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Barcode, GraduationCap, Building2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DisciplineCard({ discipline }: { discipline: Discipline }) {
  const attended = discipline.attended === 'Sim';

  return (
    <Card
      className={cn(
        'flex h-full flex-col rounded-lg border-transparent bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl cursor-pointer',
        attended && 'opacity-60 hover:opacity-100'
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div className="flex flex-row items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <CardTitle className="font-headline text-xl">{discipline.name}</CardTitle>
        </div>
        {attended && <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-500" />}
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between pt-0">
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <Barcode className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs">{discipline.code}</span>
          </div>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-accent" />
            <span>{discipline.credits} créditos</span>
          </div>
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-accent" />
            <span>{discipline.department}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
