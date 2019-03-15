import * as React from 'react';
import { useHistories } from '../../../store/hooks';
import {
  Table,
  Paper,
  TableHead,
  TableCell,
  TableBody,
  TableRow
} from '@material-ui/core';
import { IHistory, IGameResult } from '../../../store';

declare const histItem: IHistory;

function formatResult(result: IGameResult) {
  return result === 'win' ? '胜' : result === 'lost' ? '败' : '平';
}

const Histories: React.SFC = () => {
  const { loading, data } = useHistories();

  if (loading) return null;

  return (
    <Paper style={{ margin: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>序号</TableCell>
            <TableCell>对手</TableCell>
            <TableCell>结果</TableCell>
            <TableCell>日期</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each="histItem" index="_index_" of={data as IHistory[]}>
            <TableRow key={_index_}>
              <TableCell>{_index_ + 1}</TableCell>
              <TableCell>
                {histItem.opponent!.no} - {histItem.opponent!.name}
              </TableCell>
              <TableCell>{formatResult(histItem.result)}</TableCell>
              <TableCell>{histItem.createdAt}</TableCell>
            </TableRow>
          </For>
        </TableBody>
      </Table>
    </Paper>
  );
};

export { Histories };
