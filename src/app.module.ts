import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeORMModule } from './data/typeorm.module';
import { APP_GUARD } from '@nestjs/core';
import { AppGuard } from './app.guard';
import { HttpExceptionFilter } from './app.filter';

@Module({
    imports: [
        UserModule,
        AuthModule,
        TypeORMModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [AppController],
    providers: [AppService, { provide: APP_GUARD, useClass: AppGuard }],
})
export class AppModule { }
