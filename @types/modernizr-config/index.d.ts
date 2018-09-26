interface ModernizrConfig {
    minify: boolean;
    options: string[];
    "feature-detects": string[];
}

declare module ".modernizrrc.ts" {
    export = ModernizrConfig;
}
