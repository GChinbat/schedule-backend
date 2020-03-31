import * as model from '@/models/users';

export default {
  login: (_, { username, password }: { username: string; password: string }) =>
    model.login(username, password),
  register: (
    _,
    { username, password }: { username: string; password: string },
  ) => model.register(username, password),
};
