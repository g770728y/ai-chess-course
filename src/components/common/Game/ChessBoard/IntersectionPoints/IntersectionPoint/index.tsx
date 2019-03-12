import * as React from 'react';
import styles from './style.module.scss';
import {
  useCurrentGameId,
  useGameActiveRole
} from '../../../../../../store/hooks';
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
  const gameId = useCurrentGameId();
  const activeRole = useGameActiveRole(gameId);

  function placeChessPiece() {
    const step: IStep = [rowIdx, colIdx, activeRole];
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
