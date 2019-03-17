import * as React from 'react';
import styles from './style.module.scss';
import { useCurrentActiveColor } from '../../../../../../store/hooks';
import { IStep } from '../../../../../../store';
import { onStep } from '../../../../../../store/actions';

interface IProps {
  r: number;
  rowIdx: number;
  colIdx: number;
  cx: number;
  cy: number;
}

const _IntersectionPoint: React.SFC<IProps> = ({
  r,
  rowIdx,
  colIdx,
  cx,
  cy
}) => {
  const ref = React.createRef<HTMLDivElement>();
  const activeColor = useCurrentActiveColor();

  function placeChessPiece() {
    const step: IStep = [rowIdx, colIdx, activeColor];
    onStep(step);
  }

  const style: React.CSSProperties = {
    left: cx - r,
    top: cy - r,
    width: 2 * r,
    height: 2 * r,
    borderRadius: r
  };
  return (
    <div
      onClick={placeChessPiece}
      className={styles['intersection-point']}
      ref={ref}
      style={style}
    />
  );
};

export const IntersectionPoint = React.memo(_IntersectionPoint);
