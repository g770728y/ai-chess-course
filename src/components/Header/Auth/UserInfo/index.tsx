import * as React from 'react';
import { useUser } from '../../../../store/hooks';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import { useFormState } from 'react-use-form-state';
import { updateUserInfo } from '../../../../store/effects';

const UserInfoAppender: React.SFC = () => {
  const user = useUser();

  const [formState, { text }] = useFormState({ userName: '' });

  // 这里的逻辑比较特殊:
  // 如果用户存在, 但没有输入name时才打开对话框!!!
  // 如果用户不存在, 则他应该先登录
  const showModal = !!user && !user.name;

  if (!showModal) return null;

  const handleClick = () => {
    if (formState.validity) {
      updateUserInfo({ id: user!.id, name: formState.values.userName });
    }
  };

  const userInfoModal = (
    <Dialog open={showModal}>
      <DialogTitle>完善玩家信息</DialogTitle>
      <DialogContent>
        <DialogContentText>登录成功! 请完善玩家信息</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="姓名"
          type="text"
          {...text('userName')}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>保存</Button>
      </DialogActions>
    </Dialog>
  );

  return userInfoModal;
};

export { UserInfoAppender };
