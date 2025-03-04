import { createClient } from "webdav";

export const webdavClient = createClient(
  process.env.NEXT_PUBLIC_WEBDAV_CLIENT!,
  {
    withCredentials: true,
  },
);
