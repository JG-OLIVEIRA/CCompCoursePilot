
"use client";

import type { Discipline } from '@/types/discipline';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const FlowchartNode = ({
  discipline,
  attended,
  className,
}: {
  discipline?: Discipline | { name: string; code: string; attended?: boolean, discipline_id?: string };
  attended?: boolean;
  className?: string;
}) => {
  if (!discipline || !discipline.discipline_id) {
    const nodeContent = (
      <div
        className={cn(
          'relative h-full w-full rounded-lg border-2 border-dashed border-muted bg-card/50 p-2 text-center flex flex-col justify-center min-h-[5rem]',
          className
        )}
      >
        <p className="font-semibold text-[10px] md:text-sm leading-tight text-muted-foreground">{discipline?.name || 'Vago'}</p>
      </div>
    );
    // If it's an elective or empty cell without a specific page, don't wrap with Link
    return nodeContent;
  }

  const isAttended = attended ?? discipline.attended === 'Sim';

  return (
    <Link href={`/disciplinas/${discipline.discipline_id}`} className="flex-shrink-0 w-full h-full">
      <div
        className={cn(
          'relative h-full w-full rounded-lg border-2 border-primary bg-card p-2 text-center shadow-md flex flex-col justify-center transition-all duration-300 hover:shadow-xl cursor-pointer min-h-[5rem]',
          isAttended && 'border-green-500 bg-green-50/50',
          className
        )}
      >
        <p className="font-semibold text-[10px] md:text-sm leading-tight">{discipline.name}</p>
        {isAttended && (
          <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-500 border-2 border-card" />
        )}
      </div>
    </Link>
  );
};

const EmptyCell = () => <div className="h-20 w-full flex-shrink-0" />;

export default function Flowchart({ disciplines }: { disciplines: Discipline[] }) {
  const getDisciplineByCode = (code: string): Discipline | undefined => {
    return disciplines.find((d) => d.code === code);
  };

  const disciplineMap: { [key: string]: Discipline | { name: string; code: string; discipline_id?: string } | undefined } = {
    'IME03-10814': getDisciplineByCode('IME03-10814'), // Geometria Analítica
    'IME01-04827': getDisciplineByCode('IME01-04827'), // Cálculo I
    'IME02-10815': getDisciplineByCode('IME02-10815'), // Álgebra
    'IME06-10816': getDisciplineByCode('IME06-10816'), // Matemática Discreta
    'IME04-10817': getDisciplineByCode('IME04-10817'), // Fundamentos da Computação
    'FIS01-10982': getDisciplineByCode('FIS01-10982'), // Física I
    
    'IME02-10818': getDisciplineByCode('IME02-10818'), // Álgebra Linear
    'IME01-10819': getDisciplineByCode('IME01-10819'), // Cálculo II
    'IME05-10819': getDisciplineByCode('IME05-10819'), // Cálculo das Probabilidades
    'IME04-10820': getDisciplineByCode('IME04-10820'), // Algoritmos e Est. de Dados I
    'IME04-10821': getDisciplineByCode('IME04-10821'), // Linguagem de Programação I
    
    'ILE02-10822': getDisciplineByCode('ILE02-10822'), // Português Instrumental
    'IME01-06767': getDisciplineByCode('IME01-06767'), // Cálculo III
    'IME04-10823': getDisciplineByCode('IME04-10823'), // Algoritmos e Est. de Dados II
    'IME02-10824': getDisciplineByCode('IME02-10824'), // Elementos de Lógica
    'IME04-10825': getDisciplineByCode('IME04-10825'), // Linguagem de Programação II
    'IME04-10826': getDisciplineByCode('IME04-10826'), // Teoria da Computação
    
    'IME04-10827': getDisciplineByCode('IME04-10827'), // Cálculo Numérico
    'IME01-10828': getDisciplineByCode('IME01-10828'), // Cálculo IV
    'IME04-11311': getDisciplineByCode('IME04-11311'), // Algoritmos em Grafos
    'IME04-10830': getDisciplineByCode('IME04-10830'), // Engenharia de Software
    'IME04-10831': getDisciplineByCode('IME04-10831'), // Arquitetura de Computadores I
    'FIS03-10983': getDisciplineByCode('FIS03-10983'), // Física II

    'IME04-10834': getDisciplineByCode('IME04-10834'), // Estruturas de Linguagens
    'IME04-10832': getDisciplineByCode('IME04-10832'), // Banco de Dados I
    'IME04-11312': getDisciplineByCode('IME04-11312'), // Otimização em Grafos
    'IME04-10833': getDisciplineByCode('IME04-10833'), // Análise e Proj. de Sistemas
    'IME04-10835': getDisciplineByCode('IME04-10835'), // Sistemas Operacionais I
    'IME04-10836': getDisciplineByCode('IME04-10836'), // Arquitetura de Computadores II
    'IME-Eletiva-Basica': { name: 'Eletiva Básica', code: 'IME' },

    'IME06-10837': getDisciplineByCode('IME06-10837'), // Otimização Combinatória
    'IME04-10838': getDisciplineByCode('IME04-10838'), // Banco de Dados II
    'IME04-10839': getDisciplineByCode('IME04-10839'), // Interfaces Humano-Comp.
    'IME-Eletiva-I': { name: 'Eletiva I', code: 'IME' },
    'IME04-10840': getDisciplineByCode('IME04-10840'), // Sistemas Operacionais II
    'IME04-10841': getDisciplineByCode('IME04-10841'), // Compiladores
    
    'IME04-10842': getDisciplineByCode('IME04-10842'), // Computação Gráfica
    'IME04-10843': getDisciplineByCode('IME04-10843'), // Inteligência Artificial
    'IME04-10844': getDisciplineByCode('IME04-10844'), // Ética Comp. e Sociedade
    'IME04-10845': getDisciplineByCode('IME04-10845'), // Metod. Cient. no Projeto Final
    'IME04-10846': getDisciplineByCode('IME04-10846'), // Redes de Computadores I
    'IME04-10847': getDisciplineByCode('IME04-10847'), // Arq. Avançadas de Computadores

    'IME-Eletiva-II': { name: 'Eletiva II', code: 'IME' },
    'IME-Eletiva-III': { name: 'Eletiva III', code: 'IME' },
    'IME04-10848': getDisciplineByCode('IME04-10848'), // Projeto Final
    'IME04-10849': getDisciplineByCode('IME04-10849'), // Sistemas Distribuidos
    'IME-Eletiva-IV': { name: 'Eletiva IV', code: 'IME' },
  };

  const periods = [...Array(8)].map((_, i) => i + 1);

  return (
    <div className="p-4 bg-card rounded-lg shadow-md mb-8 overflow-x-auto">
        <h2 className="text-2xl font-bold text-center mb-2">Fluxograma do Curso de Ciência da Computação</h2>
        <h3 className="text-lg text-muted-foreground text-center mb-6">Unidade Responsável: Instituto de Matemática e Estatística</h3>
        
        <div className="flex w-full min-w-[1200px]">
            <div className="flex flex-1 space-x-1 md:space-x-2">
                {periods.map((periodIndex) => (
                    <div key={periodIndex} className="flex flex-col items-center space-y-2 md:space-y-4 flex-1 min-w-0">
                        <h3 className="text-sm md:text-lg font-bold whitespace-nowrap">{periodIndex}º Período</h3>
                        <div className="flex flex-col space-y-2 md:space-y-4 w-full">
                            {renderPeriod(periodIndex, disciplineMap)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}


const renderPeriod = (periodIndex: number, disciplineMap: any) => {
    switch (periodIndex) {
        case 1:
            return (
                <>
                    <FlowchartNode discipline={disciplineMap['IME03-10814']} />
                    <FlowchartNode discipline={disciplineMap['IME01-04827']} />
                    <FlowchartNode discipline={disciplineMap['IME02-10815']} />
                    <FlowchartNode discipline={disciplineMap['IME06-10816']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10817']} />
                    <FlowchartNode discipline={disciplineMap['FIS01-10982']} />
                    <EmptyCell />
                </>
            );
        case 2:
            return (
                <>
                    <FlowchartNode discipline={disciplineMap['IME02-10818']} />
                    <FlowchartNode discipline={disciplineMap['IME01-10819']} />
                    <FlowchartNode discipline={disciplineMap['IME05-10819']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10820']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10821']} />
                    <EmptyCell />
                    <EmptyCell />
                </>
            );
        case 3:
            return (
                <>
                    <FlowchartNode discipline={disciplineMap['ILE02-10822']} />
                    <FlowchartNode discipline={disciplineMap['IME01-06767']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10823']} />
                    <FlowchartNode discipline={disciplineMap['IME02-10824']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10825']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10826']} />
                    <EmptyCell />
                </>
            );
        case 4:
            return (
                <>
                    <FlowchartNode discipline={disciplineMap['IME04-10827']} />
                    <FlowchartNode discipline={disciplineMap['IME01-10828']} />
                    <FlowchartNode discipline={disciplineMap['IME04-11311']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10830']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10831']} />
                    <FlowchartNode discipline={disciplineMap['FIS03-10983']} />
                    <EmptyCell />
               </>
            );
        case 5:
            return (
                <>
                    <FlowchartNode discipline={disciplineMap['IME04-10834']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10832']} />
                    <FlowchartNode discipline={disciplineMap['IME04-11312']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10833']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10835']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10836']} />
                    <FlowchartNode discipline={disciplineMap['IME-Eletiva-Basica']} />
                </>
            );
        case 6:
            return (
                <>
                    <FlowchartNode discipline={disciplineMap['IME06-10837']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10838']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10839']} />
                    <FlowchartNode discipline={disciplineMap['IME-Eletiva-I']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10840']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10841']} />
                    <EmptyCell />
                </>
            );
        case 7:
            return (
                <>
                    <FlowchartNode discipline={disciplineMap['IME04-10842']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10843']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10844']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10845']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10846']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10847']} />
                    <EmptyCell />
                </>
            );
        case 8:
            return (
                <>
                    <FlowchartNode discipline={disciplineMap['IME-Eletiva-II']} />
                    <FlowchartNode discipline={disciplineMap['IME-Eletiva-III']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10848']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10849']} />
                    <FlowchartNode discipline={disciplineMap['IME-Eletiva-IV']} />
                    <EmptyCell />
                    <EmptyCell />
                </>
            );
        default:
            return null;
    }
}
