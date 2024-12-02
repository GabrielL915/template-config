export interface ApplyConfigOptions {
    eslint?: boolean;
    prettier?: boolean;
    editorconfig?: boolean;
    [key: string]: boolean | undefined;
}  