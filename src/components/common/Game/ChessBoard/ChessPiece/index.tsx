import * as React from 'react';
import styles from './style.module.scss';
import { IRole } from '../../../../../store';

export function ChessPieceRaw({
  r,
  role,
  style
}: {
  r: number;
  role: IRole;
  style?: React.CSSProperties;
}) {
  const _style: React.CSSProperties = {
    ...style,
    background: role === 'w' ? 'white' : 'black',
    width: 2 * r,
    height: 2 * r,
    borderRadius: r
  };
  return <div className={styles['chess-piece']} style={_style} />;
}

type IProps = {
  r: number;
  rowIdx: number;
  colIdx: number;
  role: IRole;
  cellSize: number;
};

function _ChessPiece({ r, rowIdx, colIdx, role, cellSize }: IProps) {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: colIdx * cellSize - r,
    top: rowIdx * cellSize - r
  };
  return <ChessPieceRaw r={r} role={role} style={style} />;
}

export const ChessPiece = React.memo(_ChessPiece);
