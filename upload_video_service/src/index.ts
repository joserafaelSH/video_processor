import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { Readable } from 'stream';

const fastify = Fastify({
  logger: true,
});
fastify.register(fastifyMultipart);

fastify.post('/upload', async function (request, reply) {
  const data = await request.file();
  if (!data) {
    return reply.send({ message: 'No file uploaded' });
  }
  data.file.on('data', (chunk) => {
    if (!chunk) {
      return reply.send({ message: 'No data in the file' });
    }
    const inputStream = new Readable(chunk);
    console.log('inputStream', inputStream);
    //send to kafka topic
  });

  return reply.send({ message: 'File uploaded successfully' });
});

fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
