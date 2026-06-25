import { Injectable, signal } from '@angular/core';

export interface FlashMessage {
    type: 'success' | 'error' | 'warning' | 'info';
    text: string;
}

@Injectable({
    providedIn: 'root'
})
export class FlashMessageService {
    readonly message = signal<FlashMessage | null>(null);

    private show(message: FlashMessage, duration = 3000) {
        this.message.set(message);

        console.log(message);

        setTimeout(() => {
            if (this.message() === message) {
                this.message.set(null);
            }
        }, duration);
    }

    success(text: string) {
        this.show({ type: 'success', text });
    }

    error(text: string) {
        this.show({ type: 'error', text });
    }
}