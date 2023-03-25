export interface GlobalConfig {
    azure: {
        container: string;
        connectionString: string;
    };
}
export declare const globalConfig: (() => GlobalConfig) & import("@nestjs/config").ConfigFactoryKeyHost<GlobalConfig>;
//# sourceMappingURL=config.d.ts.map