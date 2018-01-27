export enum EventType{
    loading = 'loading',
    error = 'error',
    navigate = 'nav',
    toast = 'toast',
    map = 'map'
}

export enum LoadingAction{
    show = 'show',
    hide = 'hide',
    hideAll = 'hide-all'
}

export enum MapAction{
    zoomChanged = 'zoom-changed'
}
