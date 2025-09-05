import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CreditSummaryProps {
  obrigatoriasConcluidos: number;
  eletivasConcluidos: number;
  totalObrigatorias: number;
  totalEletivas: number;
}

export default function CreditSummary({
  obrigatoriasConcluidos,
  eletivasConcluidos,
  totalObrigatorias,
  totalEletivas,
}: CreditSummaryProps) {
  const progressoObrigatorias = (obrigatoriasConcluidos / totalObrigatorias) * 100;
  const progressoEletivas = (eletivasConcluidos / totalEletivas) * 100;

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-headline">Créditos em Disciplinas Obrigatórias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{obrigatoriasConcluidos}</p>
            <p className="text-muted-foreground">de {totalObrigatorias} créditos</p>
          </div>
          <Progress value={progressoObrigatorias} className="mt-4 h-3" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-headline">Créditos em Disciplinas Eletivas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{eletivasConcluidos}</p>
            <p className="text-muted-foreground">de {totalEletivas} créditos</p>
          </div>
          <Progress value={progressoEletivas} className="mt-4 h-3" />
        </CardContent>
      </Card>
    </div>
  );
}
