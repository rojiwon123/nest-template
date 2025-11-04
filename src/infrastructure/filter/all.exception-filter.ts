import { ILogger } from "@lib/logger";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        @Inject(ILogger.Token) private readonly logger: ILogger,
    ) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const reply = <T>(body: T, statusCode: number): void => this.httpAdapterHost.httpAdapter.reply(res, body, statusCode);
        this.logger.error("catched httpException error", exception);
        if (this.isHttpException(exception)) return reply(exception.message, exception.getStatus());
        this.logger.error("catched unknown error", exception);
        return reply("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    isHttpException(error: unknown): error is HttpException {
        const prototype = Object.getPrototypeOf(error);
        if (typeof prototype === "object" && prototype !== null) {
            const name = prototype.constructor.name;
            if (name === "HttpException") return true;
            if (name === "Error" || name === "Object") return false; // 재귀 단축
            return this.isHttpException(prototype);
        }
        return false;
    }
}
