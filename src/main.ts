import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './app.filter';
import { validationExceptionFactory } from './app.factory';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        disableErrorMessages: true,
        transform: true,
        exceptionFactory: validationExceptionFactory,
    }))

    const PORT = process.env.PORT || 3000
    await app.listen(PORT);
}
bootstrap();
