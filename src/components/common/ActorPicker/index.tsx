import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { IActor } from '../../../store';

interface IProps {
  isVisible: boolean;
  onSelect: (actor: IActor) => void;
}

const ActorPicker: React.SFC<IProps> = ({ isVisible, onSelect }) => {
  return (
    <Dialog open={isVisible}>
      <DialogTitle>选择角色</DialogTitle>
      <div>
        <List>
          <For each="_item_" index="_index_" of={['human', 'ai']}>
            <ListItem button onClick={() => onSelect(_item_)} key={_item_}>
              <ListItemText primary={_item_} />
            </ListItem>
          </For>
        </List>
      </div>
    </Dialog>
  );
};

export { ActorPicker };
