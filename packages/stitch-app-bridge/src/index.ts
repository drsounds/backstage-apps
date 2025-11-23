export class StitchAppBridge {
    private listeners: { [key: string]: ((data: any) => void)[] } = {};

    constructor() {
        if (typeof window !== 'undefined') {
            window.addEventListener('message', this.handleMessage.bind(this));
        }
    }

    private handleMessage(event: MessageEvent) {
        const { action, ...data } = event.data;
        if (action && this.listeners[action]) {
            this.listeners[action].forEach(callback => callback(data));
        }
    }

    public on(action: string, callback: (data: any) => void) {
        if (!this.listeners[action]) {
            this.listeners[action] = [];
        }
        this.listeners[action].push(callback);
    }

    public off(action: string, callback: (data: any) => void) {
        if (this.listeners[action]) {
            this.listeners[action] = this.listeners[action].filter(cb => cb !== callback);
        }
    }

    public navigate(path: string) {
        this.postMessage('navigate', { path });
    }

    public ready() {
        this.postMessage('load', { value: 120 });
    }

    private postMessage(action: string, data: any = {}) {
        if (window.parent) {
            window.parent.postMessage({ action, ...data }, '*');
        }
    }
}

export const stitchAppBridge = new StitchAppBridge();
