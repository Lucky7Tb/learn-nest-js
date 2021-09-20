import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { PrismaExceptionFilter } from './commons/filters/prisma-exception.filter';
import { ResponseInterceptor } from './commons/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  
  // Http Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter, new PrismaExceptionFilter);
  
  // Response Inteceptor
  app.useGlobalInterceptors(new ResponseInterceptor)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
