"use client";

import type { Discipline } from '@/types/discipline';
import Flowchart from '@/components/Flowchart';
import CreditSummary from '@/components/CreditSummary';

export default function ClientPage({ disciplines }: { disciplines: Discipline[] }) {
  const attendedDisciplines = disciplines.filter(d => d.attended === 'Sim');

  const obrigatóriasCredits = attendedDisciplines
    .filter(d => d.type === 'Obrigatória')
    .reduce((acc, d) => acc + parseInt(d.credits, 10), 0);

  const eletivasCredits = attendedDisciplines
    .filter(d => d.type === 'Eletiva')
    .reduce((acc, d) => acc + parseInt(d.credits, 10), 0);
  
  // Based on the curriculum, total credits required.
  const totalObrigatóriasCredits = 172; 
  const totalEletivasCredits = 20;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Flowchart disciplines={disciplines} />
      <CreditSummary 
        obrigatoriasConcluidos={obrigatóriasCredits}
        eletivasConcluidos={eletivasCredits}
        totalObrigatorias={totalObrigatóriasCredits}
        totalEletivas={totalEletivasCredits}
      />
    </div>
  );
}
