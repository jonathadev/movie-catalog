import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
//import { RedisModule } from 'nestjs-redis'; // Importando corretamente
import { PassportModule } from '@nestjs/passport';

import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'movie_catalog',
      entities: [],
      synchronize: true,
    }),
    RedisModule.forRoot({
      type: 'single', // Adicionando a propriedade 'type'
      url: 'redis://localhost:6379',
    }),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
