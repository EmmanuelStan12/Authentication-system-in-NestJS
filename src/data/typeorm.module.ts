import { DataSource } from 'typeorm'
import { Global, Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: DataSource,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const logger = new Logger(TypeORMModule.name)
                try {
                    const datasource = new DataSource({
                        type: 'mysql',
                        host: configService.get('database.host'),
                        port: configService.get<number>('database.port'),
                        username: configService.get('database.user'),
                        password: configService.get('database.password'),
                        database: configService.get('database.name'),
                        synchronize: true,
                        entities: [`${__dirname}/../**/**.entity{.ts,.js}`]
                    });
                    await datasource.initialize();
                    logger.log('Database successfully connected')
                    return datasource;
                } catch (error) {
                    // Add a custom logger that would log to stdout, stderr, or any other stream/writer.
                    logger.error('An error occurred while trying to connect to the database!')
                    throw error
                }
            }
        }
    ],
    exports: [DataSource]
})
export class TypeORMModule { }