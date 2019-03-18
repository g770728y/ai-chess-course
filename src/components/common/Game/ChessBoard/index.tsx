import * as React from 'react';
import { ChessPiece } from './ChessPiece';
import { ChessGrid } from './ChessGrid';
import { IntersectionPoints } from './IntersectionPoints';
import styles from './style.module.scss';
import { dividableNumber } from '../../../../store/helper';
import { useCurrentSteps } from '../../../../store/hooks';

interface IProps {
  // 棋盘全宽
  w: number;
  // 格子数量(18)
  n: number;
}

export const ChessBoard: React.SFC<IProps> = ({ w, n }) => {
  const width = dividableNumber(Math.min(w, 800), n) * 1.0;

  const cellSize = width / n;

  // 棋盘网格线
  const grid = <ChessGrid n={n} cellSize={cellSize} />;

  // 棋盘交叉点(可落子)
  const chessRadius = cellSize * 0.4;
  const intersectionPoints = (
    <IntersectionPoints n={n} cellSize={cellSize} r={chessRadius} />
  );

  // 全部已落下的棋子
  const _steps = useCurrentSteps();
  const chessPieces = _steps.map(({ row, col, color }) => (
    <ChessPiece
      key={`${row}:${col}`}
      r={chessRadius}
      rowIdx={row}
      colIdx={col}
      color={color}
      cellSize={cellSize}
    />
  ));

  return (
    <div
      className={styles['chess-board']}
      style={{ width: width + 80, height: width + 80 }}
    >
      <div style={{ position: 'relative' }}>
        {grid}
        {intersectionPoints}
        {chessPieces}
      </div>
    </div>
  );
};
