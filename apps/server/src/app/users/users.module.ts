import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthGuard } from '../../common/guards/firebase-auth.guard';
import { SignOutGuard } from '../../common/guards/sign-out.guard';
import { User, UserSchema } from '../../common/schemas/user.schema';
import { FirebaseModule } from '../firebase/firebase.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, SignOutGuard, AuthGuard],
})
export class UsersModule {}
