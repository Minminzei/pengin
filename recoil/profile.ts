import { atom, useRecoilState } from 'recoil';
import axios from '../libs/axios';
import { User } from './users'

const Namespace = 'PROFILE';

const ProfileData = `${Namespace}_DATA`;
const userId = 1;

const profileAtom = atom<User|null>({
  key: ProfileData,
  default: null,
});

export default function profileMofule() {
  const [profile, setProfile] = useRecoilState(profileAtom);

  async function get() : Promise<User> {
    try {
      if (profile) {
        return profile;
      }
      const user:User|null = await axios.get(`/users/${userId}`);
      if (!user) {
        throw new Error('このユーザーは削除されました');
      }
      setProfile(user);
      return user;
    } catch (e) {
      throw e;
    }
  }

  async function save(data:User) : Promise<User> {
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log('SAVED!!');
          resolve();
        }, 500);
      });
      setProfile(data);
      return data;
    } catch (e) {
      throw e;
    }
  }
  return {
    get,
    save,
    profile,
  };
}

export {
  User,
};