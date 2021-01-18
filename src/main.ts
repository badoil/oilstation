import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import * as dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger 설정
  const options = new DocumentBuilder()
    .setTitle('Oil Station API 서버입니다.')
    .setDescription('Created by OhPick')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  dotenv.config();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  // Passport 로그인
  app.use(
    session({
      secret: 'changelater', // 나중에 .env 에 넣어줘야함
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // 전역 Http 예외 처리 필터
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
