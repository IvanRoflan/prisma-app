import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest.js + Prisma app')
    .setDescription('API for managing products and shops')
    .setVersion('0.0.1')
    .build();
  const swaggerPath = `/api/docs`;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => Logger.log(`Server started on ${PORT} port`));

  const url = await app.getUrl();
  Logger.log(`Application is running on: ${url}`);
  Logger.log(`Swagger path: ${url}${swaggerPath}`);
}

start();
