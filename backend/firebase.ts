import React from "react";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  DocumentSnapshot,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  DocumentReference,
  setDoc,
  arrayRemove,
} from "firebase/firestore";
import Constants from "expo-constants";
import "firebase/auth";
import { getStorage, ref, uploadString } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCARQ2_GiH2DVI0noABC9v-CXreTO8XHmw",
  authDomain: "goodneighbor-d078e.firebaseapp.com",
  projectId: "goodneighbor-d078e",
  storageBucket: "goodneighbor-d078e.appspot.com",
  messagingSenderId: "632494012296",
  appId: "1:632494012296:web:8c72ca91c108851b6c6c3d",
  measurementId: "G-F7FG2ZXV04"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);


// AUTHENTICATION // ---------------------------------------------------------
let user = auth.currentUser;

//check if user is logged in
export const checkUser = () => {
  user = auth.currentUser;
  console.log(user);
  return user;
};

export const signUpWithEmail = async (
  fName: string,
  email: string,
  password: string
) => {
  try {
    let result = await createUserWithEmailAndPassword(auth, email, password);
    user = result.user;
    await updateProfile(user, {
      displayName: fName,
    });
    console.log(user);
    let userID = await addNewUser(fName, email);
    await updateProfile(user, {
      photoURL: userID,
    });
    return "success";
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const logInWithEmail = async (email: string, password: string) => {
  try {
    let result = await signInWithEmailAndPassword(auth, email, password);
    user = result.user;
    return "success";
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    user = auth.currentUser;
    console.log(user);
    return "success";
  } catch (e) {
    console.log(e);
  }
};


export const getEmail = async () => {
  let email = user?.email;
  let email_one = "this";

  if (email == null) {
      email_one = 'null'
  }
  else if (email == undefined) {
      email_one = 'undefined'
  }
  else {
      email_one = email;
  }

  console.log("EMAILLLL:" + email_one)

  return email_one;
}


// FIRESTORE // --------------------------------------------------------------
const addNewUser = async (fName: string, email: string) => {
  try {
    const userData = {
      full_name: fName,
      email: email,
      admin: false,
    };
    const docRef = await addDoc(collection(firestore, "users"), userData);
    await updateDoc(docRef, {
      userID: docRef.id,
    });
    return docRef.id;
  } catch (e) {
    console.log(e);
  }
};

export const getCommunities = async () =>  {
  let communities: Object[] = [];
  try {
      const q = query(
          collection(firestore, "Communities")
      );
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
          let data = doc.data();
          communities.push({
              id: doc.id,
              name: data['name'],
          });

      });
      
  } catch (e) {
      console.log(e);
  }
  return communities;
}

export const getPosts = async (id) =>  {
  let posts: Object[] = [];
  try{
      const q = query(
          collection(firestore, "Communities", id, "Posts")
      );
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
          let data = doc.data();
          posts.push({
              id: doc.id,
              title: data['title'],
              category: data['category'],
              initialUpdate: data['initialUpdate'],
              location: data["location"],
          });

      });
      
  } catch (e) {
      console.log(e);
  }
  return posts;
}

export const submitPost = async (title, category, initialUpdate, usersEmail, location) => {
  try {
      const post = {
          title: title,
          category: category,
          initialUpdate: initialUpdate,
          postedBy: usersEmail,
          location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
          }
      };
      const docRef = await addDoc(collection(firestore, "Communities", 'e6G7JeaGgmdsUKcOqnaO', "Posts"), post);
      await updateDoc(docRef, {
          postID: docRef.id,
      });
      return docRef.id;
  } catch (e) {
      console.log(e);
  }
}
