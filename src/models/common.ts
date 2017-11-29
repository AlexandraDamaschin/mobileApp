import { LoadingAction } from "./Enum";

export class LoadingData {
    action: LoadingAction;
    message: string;

    constructor(action: LoadingAction, message?: string) {
        this.action = action;
        this.message = message
    }
}