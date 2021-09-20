import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SongModule } from './modules/song/song.module';
import { FriendModule } from './modules/friend/friend.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    PrismaModule,
    AuthModule,
    SongModule,
    FriendModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
