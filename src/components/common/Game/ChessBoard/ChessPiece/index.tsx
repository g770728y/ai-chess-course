import * as React from 'react';
import styles from './style.module.scss';
import { IColor } from '../../../../../store';

export function ChessPieceRaw({
  r,
  color,
  style
}: {
  r: number;
  color: IColor;
  style?: React.CSSProperties;
}) {
  const _style: React.CSSProperties = {
    ...style,
    background: color,
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
  color: IColor;
  cellSize: number;
};

function _ChessPiece({ r, rowIdx, colIdx, color, cellSize }: IProps) {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: colIdx * cellSize - r,
    top: rowIdx * cellSize - r
  };
  return <ChessPieceRaw r={r} color={color} style={style} />;
}

export const ChessPiece = React.memo(_ChessPiece);
