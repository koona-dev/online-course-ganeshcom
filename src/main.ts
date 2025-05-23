import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // penting untuk konversi ke class
      whitelist: true, // hapus properti yang tidak didefinisikan
      forbidNonWhitelisted: true, // error kalau ada field asing
    }),
  );

  app.use('/test', (req, res) => {
    res.send('Hello World!');
  });

  await app.listen(process.env.APP_PORT ?? 3000);
}
void bootstrap();
