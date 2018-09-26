///<reference path="config.d.ts"/>

const ENV_HOSTS =  <HostConfig>{
    'localhost': 'local',
    'dev.example.com': 'development',
    'example.com': 'production'
};

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

const urls = urlsEnv[env];
 
// Merge common Urls into our config
for(var url in urlsEnv.common) {
    urls[url] = urlsEnv.common[url];
}   

const config = {
    urls,
    ENV_HOSTS,
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
};

Object.freeze(config);

export default config;
