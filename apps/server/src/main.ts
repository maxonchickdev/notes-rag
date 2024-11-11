import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SERVER_CONFIG } from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  const host: string = configService.get<string>(`${SERVER_CONFIG}.host`);
  const port: string = configService.get<string>(`${SERVER_CONFIG}.port`);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('notes-rag')
    .setDescription('notes-rag description')
    .setVersion('0.0.1')
    .addServer(`http://${host}:${port}/`, 'Local enviroment')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'notes-rag',
  });

  await app.listen(parseInt(port, 10));

  Logger.log(`🚀 Application is running on: http://${host}:${port}/`);
}

bootstrap();
