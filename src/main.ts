import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS seulement en développement
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: 'http://localhost:3001',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    });
  }

  app.useGlobalPipes(new ValidationPipe());

  // Servir les fichiers statiques React (en production)
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '..', 'build')));

    // Toutes les routes non-API → React
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.get('*', (req: express.Request, res: express.Response) => {
      // Ignorer les routes API
      if (!req.url.startsWith('/api')) {
        res.sendFile(join(__dirname, '..', 'build', 'index.html'));
      }
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();