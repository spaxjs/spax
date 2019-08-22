declare const _default: {
    key(key: string, scope: string): string;
    get(key: string, scope: string): any;
    set(key: string, value: any, scope: string): Map<string, any>;
    has(key: string, scope: string): boolean;
    on(key: string, listener: any, scope: string): void;
    off(key: string, listener: any, scope: string): void;
    emit(key: string, scope: string): void;
};
export default _default;
