import { user2Player } from './player.resolver';

it('user2Player', () => {
  expect(user2Player({ id: '1', name: '2', no: '3' })).toEqual({
    userId: '1',
    name: '2',
    no: '3'
  });
});
