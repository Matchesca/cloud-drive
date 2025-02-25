import Fastify from "fastify";
import { v2 as webdav } from "webdav-server";

// Types for webdav callbacks
export type SimpleCallback = (error?: Error) => void;
export type ReturnCallback<T> = (error?: Error, data?: T) => void;
export type Return2Callback<T, Q> = (error?: Error, x?: T, y?: Q) => void;

const fastify = Fastify({ logger: true });

const webdavServer = new webdav.WebDAVServer({
  port: 1900,
});

const testingFileSystem = new webdav.PhysicalFileSystem("../storage");

fastify.get("/storage", function (request, reply) {
  const ctx = webdavServer.createExternalContext();

  webdavServer.getResource(
    ctx,
    "/data",
    function (error: Error | undefined, data: webdav.Resource | undefined) {
      if (error) {
        reply.status(501).send({ error: "Resource not found" });
      } else {
        if (data) {
          // Try to read the directory
          data.readDir(function (error, data) {
            if (error) {
              reply.status(501).send({ error: error.message });
            } else {
              reply.status(200).send(data);
            }
          });
        }
      }
    },
  );
});

webdavServer.setFileSystem("/data", testingFileSystem, (success) => {
  console.log("Successfully mounted that shit");
});

webdavServer.start(() => console.log("Ready"));

fastify.listen({ port: 3000 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on 3000`);
});
