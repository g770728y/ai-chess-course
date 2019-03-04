import * as React from 'react';
import { IRole } from '../../../../store';

type IProps = {
  r: number;
  rowIdx: number;
  colIdx: number;
  role: IRole;
  cellSize: number;
};

function _ChessPiece({ r, rowIdx, colIdx, role, cellSize }: IProps) {
  console.log('chess piece render');
  const style: React.CSSProperties = {
    position: 'absolute',
    background: role === 'w' ? 'white' : 'black',
    width: 2 * r,
    height: 2 * r,
    borderRadius: r,
    left: colIdx * cellSize - r,
    top: rowIdx * cellSize - r
  };
  return <div className={'chess-piece'} style={style} />;
}

export const ChessPiece = React.memo(_ChessPiece);
