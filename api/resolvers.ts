import { Users } from './data';

const resolvers = {
  users: async () => {
    console.log('users resolvers');
    return Users;
  },
  user: async (params: { id: string }) => {
    console.log(`users(${params.id}) resolvers`);
    return Users.find((user) => user.id == params.id);
  },
  saveUser: async (params: {
    input: {
      id: string;
      name: string;
      location: string;
      comment?: string;
    };
  }) => {
    const { input } = params;
    const user = await resolvers.user({ id: input.id });
    return {
      ...user,
      ...input,
    };
  },
};

export default resolvers;