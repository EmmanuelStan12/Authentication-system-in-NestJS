import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeORMModule } from './data/typeorm.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        TypeORMModule,
        ConfigModule.forRoot()
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
