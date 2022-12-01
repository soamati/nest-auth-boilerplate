import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const validationPipe = new ValidationPipe({
    exceptionFactory: (errors) => {
      const fields = errors.reduce((prev, { property, constraints }) => {
        return { ...prev, [property]: Object.values(constraints) };
      }, {});

      return new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        fields,
      });
    },
  });

  app.useGlobalPipes(validationPipe);

  await app.listen(3000);
}
bootstrap();
