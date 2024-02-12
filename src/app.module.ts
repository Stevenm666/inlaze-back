import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { auth } from './common/middlewares/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PostModule, MongooseModule.forRoot('mongodb+srv://reyesmbrians:stevenm666@inlaze.bzxtppq.mongodb.net/'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(auth)
    .forRoutes('user')
  }
}
