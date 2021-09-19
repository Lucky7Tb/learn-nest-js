import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SongModule } from './modules/song/song.module';
import { FriendModule } from './modules/friend/friend.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    PrismaModule,
    AuthModule,
    TestModule,
    SongModule,
    FriendModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
