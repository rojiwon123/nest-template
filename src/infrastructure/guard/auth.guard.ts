import { IS_PUBLIC_KEY } from "@lib/decorator/is-public.decorator";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;
        const hostType = context.getType();
        if (hostType === "rpc") return true;
        if (hostType === "http") {
            return true;
        }
        return false;
    }
}
