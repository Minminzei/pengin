import { Users } from './data';

const resolvers = {
  users: async () => {
    console.log('users resolvers');
    return Users;
  },
  user: async (params: { id: number }) => {
    console.log(`users(${params.id}) resolvers`);
    return Users.find((user) => user.id == params.id);
  },
};

export default resolvers;