
"use client";

import type { Discipline } from '@/types/discipline';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const EletivaNode = ({
  name,
  isAttended,
}: {
  name: string;
  isAttended: boolean;
}) => (
  <Link href="/disciplinas/eletivas" className="block w-full h-full">
    <div
      className={cn(
        'relative h-full w-full rounded-lg border-2 p-2 text-center flex flex-col justify-center min-h-[5rem] transition-all duration-300',
        isAttended
          ? 'border-green-500 bg-green-50/50 hover:shadow-xl cursor-pointer'
          : 'border-dashed border-muted bg-card/50 hover:shadow-lg hover:border-primary'
      )}
    >
      <p className="font-semibold text-[10px] md:text-sm leading-tight text-muted-foreground">{name}</p>
      {isAttended && (
        <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-500 border-2 border-card" />
      )}
    </div>
  </Link>
);


const FlowchartNode = ({
  discipline,
  attended,
  className,
}: {
  discipline?: Discipline | { name: string; code: string; attended?: boolean, discipline_id?: string, displayName?: string };
  attended?: boolean;
  className?: string;
}) => {
  if (!discipline) {
    return <div className="h-20 w-full" />;
  }

  // Handle electives in a separate component if needed or specialized logic here.
  if (discipline.name.startsWith('Eletiva')) {
     return (
       <Link href="/disciplinas/eletivas" className="block w-full h-full">
         <div
           className={cn(
             'relative h-full w-full rounded-lg border-2 border-dashed border-muted bg-card/50 p-2 text-center flex flex-col justify-center min-h-[5rem] transition-all duration-300 hover:shadow-lg hover:border-primary',
             className
           )}
         >
           <p className="font-semibold text-[10px] md:text-sm leading-tight text-muted-foreground">{discipline.name}</p>
         </div>
       </Link>
     );
   }

  if (!discipline.discipline_id) {
    const nodeContent = (
      <div
        className={cn(
          'relative h-full w-full rounded-lg border-2 border-dashed border-muted bg-card/50 p-2 text-center flex flex-col justify-center min-h-[5rem]',
          className
        )}
      >
        <p className="font-semibold text-[10px] md:text-sm leading-tight text-muted-foreground">{discipline.name || 'Vago'}</p>
      </div>
    );
    return nodeContent;
  }

  const isAttended = attended ?? discipline.attended === 'Sim';

  const displayName = (discipline as any).displayName || discipline.name.split(' ').slice(1).join(' ');

  return (
    <Link href={`/disciplinas/${discipline.discipline_id}`} className="block w-full h-full">
      <div
        className={cn(
          'relative h-full w-full rounded-lg border-2 border-primary bg-card p-2 text-center shadow-md flex flex-col justify-center transition-all duration-300 hover:shadow-xl cursor-pointer min-h-[5rem]',
          isAttended && 'border-green-500 bg-green-50/50',
          className
        )}
      >
        <p className="font-semibold text-[10px] md:text-sm leading-tight">{displayName}</p>
        {isAttended && (
          <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-500 border-2 border-card" />
        )}
      </div>
    </Link>
  );
};

const EmptyCell = () => <div className="h-20 w-full" />;

export default function Flowchart({ disciplines }: { disciplines: Discipline[] }) {
  const getDisciplineByCode = (code: string): Discipline | undefined => {
    return disciplines.find((d) => d.name.startsWith(code));
  };
  
  const attendedEletivasCount = disciplines.filter(d => d.type === 'Eletiva' && d.attended === 'Sim').length;

  const prepareDiscipline = (code: string, displayName: string) => {
    const discipline = getDisciplineByCode(code);
    if (!discipline) return { name: displayName, code, discipline_id: undefined, displayName };
    return { ...discipline, displayName };
  }

  const disciplineMap: { [key: string]: Discipline | { name: string; code: string; discipline_id?: string; displayName?: string } | undefined } = {
    'IME03-10814': prepareDiscipline('IME03-10814', 'Geometria Analítica'),
    'IME01-04827': prepareDiscipline('IME01-04827', 'Cálculo I'),
    'IME02-10815': prepareDiscipline('IME02-10815', 'Álgebra'),
    'IME06-10816': prepareDiscipline('IME06-10816', 'Matemática Discreta'),
    'IME04-10817': prepareDiscipline('IME04-10817', 'Fundamentos da Computação'),
    'FIS01-10982': prepareDiscipline('FIS01-10982', 'Física I'),
    
    'IME02-10818': prepareDiscipline('IME02-10818', 'Álgebra Linear'),
    'IME01-10819': prepareDiscipline('IME01-10819', 'Cálculo II'),
    'IME05-10819': prepareDiscipline('IME05-10819', 'Cálculo das Probabilidades'),
    'IME04-10820': prepareDiscipline('IME04-10820', 'Algoritmos e Est. de Dados I'),
    'IME04-10821': prepareDiscipline('IME04-10821', 'Linguagem de Programação I'),
    
    'ILE02-10822': prepareDiscipline('ILE02-10822', 'Português Instrumental'),
    'IME01-06767': prepareDiscipline('IME01-06767', 'Cálculo III'),
    'IME04-10823': prepareDiscipline('IME04-10823', 'Algoritmos e Est. de Dados II'),
    'IME02-10824': prepareDiscipline('IME02-10824', 'Elementos de Lógica'),
    'IME04-10825': prepareDiscipline('IME04-10825', 'Linguagem de Programação II'),
    'IME04-10826': prepareDiscipline('IME04-10826', 'Teoria da Computação'),
    
    'IME04-10827': prepareDiscipline('IME04-10827', 'Cálculo Numérico'),
    'IME01-10828': prepareDiscipline('IME01-10828', 'Cálculo IV'),
    'IME04-11311': prepareDiscipline('IME04-11311', 'Algoritmos em Grafos'),
    'IME04-10830': prepareDiscipline('IME04-10830', 'Engenharia de Software'),
    'IME04-10831': prepareDiscipline('IME04-10831', 'Arquitetura de Computadores I'),
    'FIS03-10983': prepareDiscipline('FIS03-10983', 'Física II'),

    'IME04-10834': prepareDiscipline('IME04-10834', 'Estruturas de Linguagens'),
    'IME04-10832': prepareDiscipline('IME04-10832', 'Banco de Dados I'),
    'IME04-11312': prepareDiscipline('IME04-11312', 'Otimização em Grafos'),
    'IME04-10833': prepareDiscipline('IME04-10833', 'Análise e Proj. de Sistemas'),
    'IME04-10835': prepareDiscipline('IME04-10835', 'Sistemas Operacionais I'),
    'IME04-10836': prepareDiscipline('IME04-10836', 'Arquitetura de Computadores II'),

    'IME06-10837': prepareDiscipline('IME06-10837', 'Otimização Combinatória'),
    'IME04-10838': prepareDiscipline('IME04-10838', 'Banco de Dados II'),
    'IME04-10839': prepareDiscipline('IME04-10839', 'Interfaces Humano-Comp.'),
    'IME04-10840': prepareDiscipline('IME04-10840', 'Sistemas Operacionais II'),
    'IME04-10841': prepareDiscipline('IME04-10841', 'Compiladores'),
    
    'IME04-10842': prepareDiscipline('IME04-10842', 'Computação Gráfica'),
    'IME04-10843': prepareDiscipline('IME04-10843', 'Inteligência Artificial'),
    'IME04-10844': prepareDiscipline('IME04-10844', 'Ética Comp. e Sociedade'),
    'IME04-10845': prepareDiscipline('IME04-10845', 'Metod. Cient. no Projeto Final'),
    'IME04-10846': prepareDiscipline('IME04-10846', 'Redes de Computadores I'),
    'IME04-10847': prepareDiscipline('IME04-10847', 'Arq. Avançadas de Computadores'),

    'IME04-10848': prepareDiscipline('IME04-10848', 'Projeto Final'),
    'IME04-10849': prepareDiscipline('IME04-10849', 'Sistemas Distribuidos'),
  };

  const periods = [...Array(8)].map((_, i) => i + 1);

  return (
    <div className="p-4 bg-card rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 font-headline">Fluxograma do Curso de Ciência da Computação</h2>
        
        <div className="flex w-full overflow-x-auto">
            <div className="flex flex-1 space-x-1 md:space-x-2 min-w-[1200px]">
                {periods.map((periodIndex) => (
                    <div key={periodIndex} className="flex flex-col items-center space-y-2 md:space-y-4 flex-1 min-w-0">
                        <h3 className="text-sm md:text-lg font-bold whitespace-nowrap">{periodIndex}º Período</h3>
                        <div className="flex flex-col space-y-2 md:space-y-4 w-full">
                            {renderPeriod(periodIndex, disciplineMap, attendedEletivasCount)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}


const renderPeriod = (periodIndex: number, disciplineMap: any, attendedEletivasCount: number) => {
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
                    <EletivaNode name="Eletiva Básica" isAttended={attendedEletivasCount >= 1} />
                </>
            );
        case 6:
            return (
                <>
                    <FlowchartNode discipline={disciplineMap['IME06-10837']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10838']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10839']} />
                    <EletivaNode name="Eletiva I" isAttended={attendedEletivasCount >= 2} />
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
                    <EletivaNode name="Eletiva II" isAttended={attendedEletivasCount >= 3} />
                    <EletivaNode name="Eletiva III" isAttended={attendedEletivasCount >= 4} />
                    <FlowchartNode discipline={disciplineMap['IME04-10848']} />
                    <FlowchartNode discipline={disciplineMap['IME04-10849']} />
                    <EletivaNode name="Eletiva IV" isAttended={attendedEletivasCount >= 5} />
                    <EmptyCell />
                    <EmptyCell />
                </>
            );
        default:
            return null;
    }
}

    