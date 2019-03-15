import * as React from 'react';
import { IntersectionPoint } from './IntersectionPoint';
import { range } from 'rambda';
import { useCurrentUserMovable } from '../../../../../store/hooks';

interface IProps {
  n: number;
  cellSize: number;
  r: number;
}

// 画一个n行n列的交叉点网格
function _IntersectionPoints({ n, cellSize, r }: IProps) {
  const movable = useCurrentUserMovable();
  const intersectionPointsPerLine = (rowIdx: number) =>
    range(0, n + 1).map(colIdx => {
      const cx = colIdx * cellSize;
      const cy = rowIdx * cellSize;
      return (
        <IntersectionPoint
          r={r}
          rowIdx={rowIdx}
          colIdx={colIdx}
          cx={cx}
          cy={cy}
          key={colIdx}
        />
      );
    });
  const intersectionPoints = range(0, n + 1).map(i => (
    <div key={i}>{intersectionPointsPerLine(i)}</div>
  ));

  return !!movable ? <>{intersectionPoints}</> : null;
}

export const IntersectionPoints = React.memo(_IntersectionPoints);
