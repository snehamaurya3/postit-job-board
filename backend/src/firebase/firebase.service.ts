import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

@Injectable()
export class FirebaseService {

  private firebaseApp: admin.app.App

  constructor() {

    if (!admin.apps.length) {

      this.firebaseApp =
        admin.initializeApp({
          credential:
            admin.credential.cert({
              projectId:
                process.env
                  .FIREBASE_PROJECT_ID,

              clientEmail:
                process.env
                  .FIREBASE_CLIENT_EMAIL,

              privateKey:
                process.env
                  .FIREBASE_PRIVATE_KEY
                  ?.replace(/\\n/g, '\n'),
            }),
        })

    } else {

      this.firebaseApp =
        admin.app()
    }
  }

  getAuth() {
    return admin.auth()
  }

  getFirestore() {
    return admin.firestore()
  }
}



// import { Injectable } from '@nestjs/common';
// import * as admin from 'firebase-admin';
// import * as serviceAccount from '../../firebase-service-account.json';


// @Injectable()
// export class FirebaseService {
//   public db: FirebaseFirestore.Firestore;

//   constructor() {
//     if (!admin.apps.length) {
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//       });
//     }

//     this.db = admin.firestore();
//   }
// }