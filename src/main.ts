import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEc4eKekvO521aCtXVTmBApSpLKMPlsjc",
  authDomain: "miausicbox27.firebaseapp.com",
  projectId: "miausicbox27",
  storageBucket: "miausicbox27.appspot.com",
  messagingSenderId: "1097843100087",
  appId: "1:1097843100087:web:279baa0854b197f9c98032"
};


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));
