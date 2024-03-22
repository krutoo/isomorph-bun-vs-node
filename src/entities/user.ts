import { FetchUtil } from '@sima-land/isomorph/http';

export interface UserData {
  id: number;
  name?: string | null;
  photo_url?: string | null;
}

export type UserApi = ReturnType<typeof createUserApi>;

export function createUserApi({ host, fetch }: { host: string; fetch: typeof globalThis.fetch }) {
  return {
    getUser() {
      const url = new URL('user/current/', host);

      FetchUtil.setParams(url, {
        expand: 'segment',
      });

      return fetch(url).then(...FetchUtil.eitherResponse<UserData>());
    },
  };
}
