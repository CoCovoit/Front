export interface Notification{
    icon: string;
    title: string;
    description: string;
    type: 'success' | 'error' | 'info' | 'warn';
}