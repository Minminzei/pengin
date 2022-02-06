import { selector, selectorFamily } from 'recoil';
import * as _ from 'lodash';
import axios from '../libs/axios';

const Namespace = 'USERS';

export class User {
  id: number;
  name: string;
  image: string;
  comment: string;
  location: string;
  constructor(params: {
    id: number;
    name: string;
    image: string;
    comment: string;
  location: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.image = params.image;
    this.comment = params.comment;
    this.location = params.location;
  }
}

const UserList = `${Namespace}_LIST`;
const UserData = `${Namespace}_DATA`;

export const users = selector<User[]>({
  key: UserList,
  get: async () : Promise<User[]> => {
    try {
      const users:User[] = await axios.get('/users');
      return users;
    } catch (e) {
      throw e;
    }
  },
});

export const user = selectorFamily({
  key: UserData,
  get: (id:number) => async () : Promise<User> => {
    try {
      const user:User|null = await axios.get(`/users/${id}`);
      if (!user) {
        throw new Error('このユーザーは削除されました');
      }
      return user;
    } catch (e) {
      throw e;
    }
  },
});
