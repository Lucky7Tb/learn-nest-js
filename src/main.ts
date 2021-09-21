import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { PrismaExceptionFilter } from './commons/filters/prisma-exception.filter';
import { ResponseInterceptor } from './commons/interceptors/response.interceptor';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  
  // Http Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter, new PrismaExceptionFilter);
  
  // Response Inteceptor
  app.useGlobalInterceptors(new ResponseInterceptor);

  // Helmer
  app.use(helmet());

  // Comporession
  app.use(compression());

  // Cors
  app.enableCors();

  // Swagger
   const config = new DocumentBuilder()
    .setTitle('Cheva song')
    .setDescription('List endpoint of cheva song')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
