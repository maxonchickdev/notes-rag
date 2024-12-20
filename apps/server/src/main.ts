import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { SERVER_CONFIG } from './common/config/server.config';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: [
      `http://${configService.get<string>(`${SERVER_CONFIG}.host`)}:${configService.get<string>(`${SERVER_CONFIG}.port`)}`,
      'http://localhost:4201',
    ],
  });

  app.useGlobalPipes(new ValidationPipe());

  const host: string = configService.get<string>(`${SERVER_CONFIG}.host`);
  const port: string = configService.get<string>(`${SERVER_CONFIG}.port`);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('notes-rag')
    .setDescription('notes-rag description')
    .setVersion('0.0.1')
    .addServer(`http://${host}:${port}/`, 'Local enviroment')
    .addBearerAuth(
      {
        bearerFormat: 'JWT',
        description: 'Input your JWT token',
        in: 'header',
        name: 'Authorization',
        scheme: 'bearer',
        type: 'http',
      },
      'bearer',
    )
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'notes-rag',
  });

  await app.listen(parseInt(port, 10));

  Logger.log(`🚀 Application is running on: http://${host}:${port}/`);
}

bootstrap();
