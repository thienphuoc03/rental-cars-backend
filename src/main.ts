import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  // variables
  const PORT = parseInt(process.env.PORT);
  const HOSTNAME = process.env.HOSTNAME;

  const app = await NestFactory.create(AppModule, { cors: true });

  // Server
  app.setGlobalPrefix('api/v1');

  await app.listen(PORT, HOSTNAME, async () => {
    console.log(
      `Application is running on: ${await app.getUrl()} - http://${HOSTNAME}:${PORT}`,
    );
  });
}
bootstrap();
