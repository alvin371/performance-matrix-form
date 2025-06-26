'use client';

import { Gauge } from 'lucide-react';
import type { PerformanceData } from '@/app/page';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
  data: PerformanceData;
  lastInteraction: string;
}

const WinnerBadge = ({ val1, val2 }: { val1: number; val2: number }) => {
  if (val1 === 0 || val2 === 0) return <Badge variant="secondary">Pending</Badge>;
  if (val1 < val2) {
    return <Badge className="bg-accent text-accent-foreground">Tailwind</Badge>;
  }
  if (val2 < val1) {
    return <Badge className="bg-blue-300 text-blue-900">Ant Design</Badge>;
  }
  return <Badge variant="outline">Tie</Badge>;
};

export function PerformanceDebugger({ data, lastInteraction }: Props) {
  const { tailwind, antd } = data;

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
            <Gauge className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="font-headline text-xl">Performance Debugger</CardTitle>
            <CardDescription>Results update on interaction. Lower is better.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Tailwind</TableHead>
                <TableHead className="text-right">Ant Design</TableHead>
                <TableHead className="text-right">Winner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Initial Render</TableCell>
                <TableCell className={`text-right ${lastInteraction.includes('mount') ? 'text-primary font-bold' : ''}`}>
                  {tailwind.mount > 0 ? `${tailwind.mount.toFixed(2)} ms` : '...'}
                </TableCell>
                <TableCell className={`text-right ${lastInteraction.includes('mount') ? 'text-primary font-bold' : ''}`}>
                  {antd.mount > 0 ? `${antd.mount.toFixed(2)} ms` : '...'}
                </TableCell>
                <TableCell className="text-right">
                  <WinnerBadge val1={tailwind.mount} val2={antd.mount} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Last Update</TableCell>
                <TableCell className={`text-right ${lastInteraction.includes('update') && lastInteraction.includes('tailwind') ? 'text-primary font-bold' : ''}`}>
                  {tailwind.update > 0 ? `${tailwind.update.toFixed(2)} ms` : '...'}
                </TableCell>
                <TableCell className={`text-right ${lastInteraction.includes('update') && lastInteraction.includes('antd') ? 'text-primary font-bold' : ''}`}>
                  {antd.update > 0 ? `${antd.update.toFixed(2)} ms` : '...'}
                </TableCell>
                <TableCell className="text-right">
                  <WinnerBadge val1={tailwind.update} val2={antd.update} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          <strong>Last Interaction:</strong> {lastInteraction || 'None yet. Interact with a form to see update times.'}
        </p>
      </CardContent>
    </Card>
  );
}
