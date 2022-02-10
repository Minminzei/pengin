import fs from 'fs/promises';
import { Users } from './data';

const resolvers = {
  users: async () => {
    return Users;
  },
  user: async (params: { id: string }) => {
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
  uploadImage: async (params: {
    input: {
      uri: string;
      mimeType: string;
    }
  }) => {
    const { input } = params;
    const extension = input.mimeType.split('/');
    const filename = `${Date.now()}.${extension[1]}`;
    const imgdata = input.uri;
    const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    await fs.writeFile(
      `${__dirname}/uploads/${filename}`,
      base64Data,
      { encoding: 'base64' },
    );
    return {
      uri: `${process.env.API_ROOT}${filename}`,
    };
  },
};

export default resolvers;