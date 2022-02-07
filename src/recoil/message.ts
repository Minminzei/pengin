import { atom, useRecoilState } from 'recoil';

const Namespace = 'MESSAGE';

const MessageData = `${Namespace}_DATA`;

class Message {
  type: 'toast' | 'error' | 'complete';
  message: string;
  constructor(params: {
    type?: 'toast' | 'error' | 'complete';
    message: string;
  }) {
    this.type = params.type || 'toast';
    this.message = params.message;
  }
}

const messageAtom = atom<Message|null>({
  key: MessageData,
  default: null,
});

export default function profileMofule() {
  const [message, setMessage] = useRecoilState(messageAtom);

  function get() : Message|null {
    if (message) {
      return message;
    }
    return null;
  }

  function set(data:Message) : void {
    try {
      setMessage(data);
    } catch (e) {
      throw e;
    }
  }

  function clear() : void {
    setMessage(null);
  }
  return {
    get,
    set,
    clear,
  };
}