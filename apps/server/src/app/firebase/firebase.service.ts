import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { auth, credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

import { FIREBASE_CONFIG } from '../../common/config/firebase.config';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    initializeApp({
      credential: credential.cert({
        clientEmail: this.configService.get<string>(
          `${FIREBASE_CONFIG}.credential.clientEmail`,
        ),
        privateKey: this.configService.get<string>(
          `${FIREBASE_CONFIG}.credential.privateKey`,
        ),
        projectId: this.configService.get<string>(
          `${FIREBASE_CONFIG}.credential.projectId`,
        ),
      }),
    });
  }
  async verifyIdToken(token: string) {
    try {
      return await auth().verifyIdToken(token);
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('Cannot verify token');
    }
  }
}
