import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch() // Catches all exceptions
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const logger = new Logger(HttpExceptionFilter.name)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        logger.error(`Error occurred: ${exception.message}`);
        logger.error(`Request method: ${request.method}`);
        logger.error(`Request URL: ${request.url}`);
        logger.error(`Request body:`, request.body);
        logger.error(`Response status: ${status}`);

        response.status(status).json({
            statusCode: status,
            message: exception.message,
            error: exception.message
        });
    }
}
