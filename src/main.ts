import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  // add configuration of doc
  const config = new DocumentBuilder()
    .setTitle('NestJS server for Step_3')
    .setDescription('See the task in README.md')
    .setVersion('1.0.0')
    .addTag('ezzegen')
    .build()
  // create object doc, the first arg is instance of our app.
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
}

bootstrap();
