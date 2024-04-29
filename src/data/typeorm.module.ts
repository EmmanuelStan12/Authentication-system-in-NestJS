import { DataSource } from 'typeorm'
import { Global, Logger, Module } from '@nestjs/common'

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: DataSource,
            inject: [],
            useFactory: async () => {
                const logger = new Logger()
                try {
                    const datasource = new DataSource({
                        type: 'mysql',
                        host: 'localhost',
                        port: 3306,
                        username: 'chat_app_user',
                        password: 'chat_app_user',
                        database: 'chat_app_db',
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