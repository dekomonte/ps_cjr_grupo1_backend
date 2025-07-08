// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger (manteve o que já existia)
  const config = new DocumentBuilder()
    .setTitle('backend')
    .setDescription('The backend API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuração global do CORS (libera acesso do frontend)
  app.enableCors({
    origin: '*', // ou coloca a URL do front se quiser restringir
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  });

  // validação automática dos DTOs
  app.useGlobalPipes(new ValidationPipe());

  // pega a porta do .env ou usa 3000 como padrão
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  await app.listen(port);
}
bootstrap();