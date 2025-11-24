const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');

let cachedApp;

async function bootstrap() {
    if (!cachedApp) {
        const app = await NestFactory.create(AppModule);
        app.setGlobalPrefix('api');
        app.enableCors();
        await app.init();
        cachedApp = app;
    }
    return cachedApp;
}

module.exports = async (req, res) => {
    const app = await bootstrap();
    const server = app.getHttpAdapter().getInstance();
    return server(req, res);
};