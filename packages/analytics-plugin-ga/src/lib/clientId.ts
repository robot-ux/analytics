import { v4 as uuidv4 } from 'uuid';

const UUID_KEY = '_BEW_USER_UUID_';

export const getClientId = () => {
  let uuid = window.localStorage.getItem(UUID_KEY);
  if (uuid) return uuid;

  uuid = uuidv4();
  window.localStorage.setItem(UUID_KEY, uuid as string);

  return uuid as string;
};
