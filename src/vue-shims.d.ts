declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module "*.jpg" {
    const content: any;
    export default content;
}

declare module "*.mp4" {
    const content: any;
    export default content;
}

declare module "*.webm" {
    const content: any;
    export default content;
}

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};