import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("sys")
export class SysController {
    /**
     * @summary health check
     * @tag system
     */
    @core.TypedRoute.Get("health")
    async health(): Promise<"health check"> {
        return "health check";
    }
}
