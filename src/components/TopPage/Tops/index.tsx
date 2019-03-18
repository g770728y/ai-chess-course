import * as React from 'react';
import { useStats } from '../../../store/hooks';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid
} from '@material-ui/core';
import { IStat } from '../../../store';
import { sort } from 'rambda';

declare const statItem: IStat;

const Tops: React.SFC = () => {
  const { loading, data } = useStats();

  const [orderBy, setOrderBy] = React.useState('default');

  if (loading) return null;

  const sortedData: IStat[] = sort(
    (s1, s2) =>
      orderBy === 'count'
        ? s2.win - s1.win
        : orderBy === 'rate'
        ? rate(s2) - rate(s1)
        : -1,
    data as IStat[]
  );

  return (
    <Grid container direction="column" wrap="nowrap" style={{ height: '100%' }}>
      <Grid item style={{ marginLeft: 20, marginTop: 20 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOrderBy('count')}
        >
          按胜场
        </Button>
        <div style={{ display: 'inline-block', width: 20 }} />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOrderBy('rate')}
        >
          按胜率(%)
        </Button>
      </Grid>

      <Grid item style={{ flex: 'auto', height: 100 }}>
        <Paper
          style={{
            margin: 20,
            overflowY: 'auto',
            height: 'calc(100% - 40px)'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>排名</TableCell>
                <TableCell>玩家</TableCell>
                <TableCell>总场次</TableCell>
                <TableCell>胜 - 负 - 平</TableCell>
                <TableCell>胜率</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <For each="statItem" index="_index_" of={sortedData}>
                <TableRow key={statItem.playerId}>
                  <TableCell>{_index_ + 1}</TableCell>
                  <TableCell>
                    {statItem.player!.no} - {statItem.player!.name}
                  </TableCell>
                  <TableCell>{total(statItem)}</TableCell>
                  <TableCell>
                    {statItem.win} - {statItem.lost} - {statItem.draw}
                  </TableCell>
                  <TableCell>
                    {rate(statItem) <= 0 ? '尚未参赛' : `${rate(statItem)}%`}
                  </TableCell>
                </TableRow>
              </For>
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export { Tops };

function total({ win, lost, draw }: IStat) {
  return win + lost + draw;
}

function rate(stat: IStat) {
  const _total = total(stat);
  const { win, lost, draw } = stat;
  return _total <= 0 ? 0 : ((((win * 1.0) / _total) * 1000) | 0) / 10.0;
}
