import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { apps, auth, credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

import { FIREBASE_CONFIG } from '../../common/config/firebase.config';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    if (!apps.length) {
      initializeApp(
        {
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
        },
        'notes-rag-firebase-admin',
      );
    }
  }

  async verifyIdToken(token: string) {
    try {
      return auth().verifyIdToken(token);
    } catch (error) {
      throw new Error(`Error verifying token: ${error}`);
    }
  }
}
