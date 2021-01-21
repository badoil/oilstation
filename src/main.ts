import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import * as dotenv from 'dotenv';
import passport from 'passport';
import session from 'cookie-session';
import flash from 'connect-flash';
import * as Sentry from '@sentry/node';

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

  // Sentry 설정
  Sentry.init({
    dsn:
      'https://25196d056a8f4360a2ef1cc271ccf536@o489321.ingest.sentry.io/5597767',
  });

  const prod: boolean = process.env.NODE_ENV === 'production';

  if (prod) {
    app.set('trust proxy', 1);
  }
  // Passport 로그인
  app.use(
    session({
      secret: 'changelater', // TODO: 나중에 .env 에 넣어줘야함
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: prod ? true : false,
        sameSite: prod ? 'none' : 'lax',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // 전역 Http 예외 처리 필터
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
  console.log('server listening on port ' + (process.env.PORT || 3000));
}
bootstrap();
