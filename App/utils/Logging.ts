import { ENV } from '@env';

export const logging = (message: any) => {
    const Mode: "dev" | "prod" = ENV;
    if (Mode === "dev") {
        console.log(message)
    }
}