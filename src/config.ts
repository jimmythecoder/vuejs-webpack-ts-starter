///<reference path="config.d.ts"/>

const ENV_HOSTS =  <HostConfig>{
    'localhost': 'local',
    'dev.example.com': 'development',
    'example.com': 'production'
};

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const hostName          = window.location.hostname;
const env               = ENV_HOSTS.hasOwnProperty(hostName) ? ENV_HOSTS[hostName] : 'production';

const urlsEnv = {
    'local': {

    },
    'development': {

    },
    'production': {

    },
    'common': {

    }
} as UrlHostConfig;

const Urls = urlsEnv[env];
 
// Merge common Urls into our config
for(var url in urlsEnv.common) {
    Urls[url] = urlsEnv.common[url];
}   

const config = {
    Urls,
    ENV_HOSTS,
    EMAIL_REGEX
};

Object.freeze(config);
Object.freeze(Urls);
Object.freeze(ENV_HOSTS);

export {Urls, ENV_HOSTS, EMAIL_REGEX};
export default config;
