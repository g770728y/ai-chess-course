import * as React from 'react';
import * as R from 'ramda';
import { IntersectionPoint } from '../IntersectionPoint';
import { dividableNumber, useCurrentSteps } from '../../helper';
import { ChessPiece } from '../ChessPiece';
import { IStep, appState } from '../store';
import { useAtom } from '@dbeining/react-atom';
import { ChessGrid } from '../ChessGrid';
import { IntersectionPoints } from '../IntersectionPoints';

interface IProps {
  // 棋盘全宽
  w: number;
  // 格子数量(18)
  n: number;
}

export const ChessBoard: React.SFC<IProps> = ({ w, n }) => {
  console.log('render chess board');
  const width = dividableNumber(w, n) * 1.0;

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
  const chessPieces = _steps.map(([rowIdx, colIdx, role]) => (
    <ChessPiece
      key={`${rowIdx}:${colIdx}`}
      r={chessRadius}
      rowIdx={rowIdx}
      colIdx={colIdx}
      role={role}
      cellSize={cellSize}
    />
  ));

  return (
    <div className="chess-board" style={{ padding: 40, width: width + 80 }}>
      <div style={{ position: 'relative' }}>
        {grid}
        {intersectionPoints}
        {chessPieces}
      </div>
    </div>
  );
};
