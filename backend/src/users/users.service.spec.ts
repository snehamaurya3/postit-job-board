import { Injectable } from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';

import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private firebaseService: FirebaseService) {}

  async createUser(user: User): Promise<User> {
    const docRef = await this.firebaseService.db
      .collection('users')
      .add(user);

    return {
      id: docRef.id,
      ...user,
    };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const snapshot = await this.firebaseService.db
      .collection('users')
      .where('email', '==', email)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];

    const data = doc.data() as User;

    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: data.createdAt,
    };
  }
}