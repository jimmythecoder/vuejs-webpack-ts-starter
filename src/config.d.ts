type EnvHost = 'local' | 'development' | 'production';
 
interface UrlHostConfig {
    [host: string]: HostConfig;
}
 
interface HostConfig {
    [url: string]: string;
}