import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//Esta es la entrada y creacion de nustra aplicion en nest
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configurando los pipes a nivel global de la aplicacion
  //Se pueden importar los Pipes que se quieran
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      })
  );

  await app.listen(3000);
}
bootstrap();
