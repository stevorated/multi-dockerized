const { HOST, PORT, PUBLIC_PORT, SOCK_HOST, WEB_TITLE } = process.env;

module.exports = {
    title: WEB_TITLE ? WEB_TITLE : 'React Example',
    host: HOST ? HOST : '0.0.0.0',
    port: PORT ? parseInt(PORT) : 4000,
    publicPort: PUBLIC_PORT,
    sockPort: PUBLIC_PORT ? parseInt(PUBLIC_PORT) : 3050,
    sockHost: SOCK_HOST ? SOCK_HOST : 'localhost',
};
