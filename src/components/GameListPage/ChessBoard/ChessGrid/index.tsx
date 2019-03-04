import * as React from 'react';
import { range } from 'rambda';

// 画棋盘网格线
export function ChessGrid({ n, cellSize }: { n: number; cellSize: number }) {
  const cellsPerLine = range(0, n).map(i => (
    <td
      key={i}
      style={{
        width: cellSize,
        height: cellSize,
        border: '1px solid red'
      }}
    />
  ));
  const lines = range(0, n).map(i => <tr key={i}>{cellsPerLine}</tr>);
  const board = (
    <table
      style={{
        borderCollapse: 'collapse',
        border: '2px solid red'
      }}
    >
      <tbody>{lines}</tbody>
    </table>
  );
  return board;
}
