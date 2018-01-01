import { LoadingAction, MapAction } from "./Enum";

export class LoadingData {
    action: LoadingAction;
    message: string;

    constructor(action: LoadingAction, message?: string) {
        this.action = action;
        this.message = message
    }
}

export class MapEvent{
    type: MapAction;
    oldZoom: number;
    newZoom: number;

    constructor(t: MapAction){
        this.type = t;
    }

}