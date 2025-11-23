import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const isProduction = process.env.NODE_ENV === 'production';
  const port = process.env.PORT || 3000;

  console.log('==========================================');
  console.log('🚀 Démarrage de l\'application');
  console.log('📍 Environnement:', process.env.NODE_ENV);
  console.log('🌐 Port:', port);
  console.log('🏭 Mode Production:', isProduction);
  console.log('==========================================');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  if (isProduction) {
    console.log('✅ Serving React from /build folder');
    
    // Récupérer l'instance Express
    const expressApp = app.getHttpAdapter().getInstance();
    
    // Servir les fichiers statiques React
    expressApp.use(express.static(join(__dirname, '..', 'build')));
    
    // Middleware catch-all pour React (après les routes NestJS)
    expressApp.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Si c'est une route API, laisser NestJS gérer
      if (req.url.startsWith('/api')) {
        return next();
      }
      
      // Sinon, servir index.html pour React Router
      console.log('📄 Serving React for:', req.url);
      res.sendFile(join(__dirname, '..', 'build', 'index.html'), (err) => {
        if (err) {
          console.error('❌ Error serving index.html:', err);
          res.status(500).send('Error loading page');
        }
      });
    });
  } else {
    console.log('✅ CORS activé pour http://localhost:3001');
    app.enableCors({
      origin: 'http://localhost:3001',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    });
  }

  await app.listen(port);
  console.log(`🎉 Application lancée sur http://localhost:${port}`);
}

bootstrap();