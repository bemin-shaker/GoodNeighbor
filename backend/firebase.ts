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
  Timestamp
} from "firebase/firestore";
import Constants from "expo-constants";
import "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
      email: email.toLowerCase(),
      joined_communities: [],
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
  let user = await getUser(await getEmail());
  let userCommunities = user[0]["joined_communities"]
  let communities: Object[] = [];
  let array = []

  try {
      const q = query(
          collection(firestore, "Communities")
      );
      const querySnapshot = await getDocs(q);
      
      userCommunities.forEach((community) => {
        array.push(community.communityId)
      })

      querySnapshot.forEach((doc) => {
          let data = doc.data();
          if (!array.includes(doc.id)) {
           
          communities.push({
              id: doc.id,
              name: data['name'],
              members_list: data['members_list'],
              type: data['type'],
          });
        }
      })


      
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
              updates: data["updates"],
              initialTimestamp: data["initialTimestamp"],
              imageUrl: data["imageUrl"],
              postedBy: data["postedBy"]["usersEmail"],
          });

      });

  } catch (e) {
      console.log(e);
  }
  return posts;
}

//Get the categories array within the communities collection
export const getCategories = async (id) =>  {
  console.log("hi", id)
  const docRef = doc(firestore, "Communities", id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().categories
}


export const submitPost = async (communityId, title, category, initialUpdate, usersEmail, location, image) => {
  
  try {
      const post = {
          title: title,
          category: category,
          initialUpdate: initialUpdate,
          postedBy: {
            usersEmail: usersEmail
          },
          location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
          },
          updates: [],
          initialTimestamp: new Timestamp(new Date().getTime() / 1000, new Date().getMilliseconds() * 100000)
       
      };
      const docRef = await addDoc(collection(firestore, "Communities", communityId, "Posts"), post);
      await uploadImage(image, docRef.id + "/" + "initialImage");
      const imageUrl = await getDownloadURL(ref(storage, docRef.id + "/" + "initialImage"))
      await updateDoc(docRef, {
          postID: docRef.id,
          imageUrl: imageUrl
      });
      return {"success": true, "postID": docRef.id};
  } catch (e) {
      console.log(e);
  }
}


export const makeUpdate = async (title, usersEmail, postId, communityId, image ) =>  {
  let posts: Object[] = [];
  try{
      let imageUrl = "";
      const documentRef = doc(firestore,  "Communities", communityId, "Posts", postId);
      if (image == null) {
        imageUrl = "Null"
      } else {
        let randomUpdateId = Math.floor(Math.random() * 100000)
        await uploadImage(image, postId + "/" + randomUpdateId);
        imageUrl = await getDownloadURL(ref(storage, postId + "/" + randomUpdateId))
  
      }
     
      const update = {
        title: title,
        postedBy: {
          usersEmail: usersEmail
        },
        timestamp: new Timestamp(new Date().getTime() / 1000, new Date().getMilliseconds() * 100000),
        imageUrl: imageUrl
      };

      await updateDoc(documentRef, {
          updates: arrayUnion(update),
      });
      
    return "success";
      
  } catch (e) {
      console.log(e);
  }
  return posts;
}


export const getUser = async (email) =>  {
  let userInfo: Object[] = [];
  try{
    const citiesRef = collection(firestore, "users");
    const q = query(citiesRef, where("email", "==", email));

      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
    
          let data = doc.data();
          userInfo.push({
              id: doc.id,
              full_name: data['full_name'],
              joined_communities: data['joined_communities'],
              email: data['email'],
          });

      });
      
  } catch (e) {
      console.log(e);
  }

  return userInfo;
}



export const joinCommunity = async (usersEmail, communityId, communityName, userId) =>  {
  try{
    const update = {
      email: usersEmail,
      id: userId, 
      admin: false
    };
      const documentRef = doc(firestore,  "Communities", communityId);
      await updateDoc(documentRef, {
        members_list: arrayUnion(update)
      });
      const documentRef2 = doc(firestore,  "users", userId);
      await updateDoc(documentRef2, {
        joined_communities: arrayUnion({
          communityId: communityId,
          communityName: communityName,
          admin: false
        })
      });
    return "success";
      
  } catch (e) {
      console.log(e);
  }
}

export const getCommunityMembers = async (id) =>  {
  const docRef = doc(firestore, "Communities", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data().members_list
}



export const makeAdmin = async ( communityId, communityName, userId, email ) =>  {
  let posts: Object[] = [];
  try{
    const update = {
      id: userId,
      admin: true,
      email: email
   
    };
    const documentRef = doc(firestore,  "Communities", communityId);
    await updateDoc(documentRef, {
        members_list: arrayRemove({
          id: userId,
          admin: false,
          email: email
        })
    });
    await updateDoc(documentRef, {
      members_list: arrayUnion(update),
    });
    const update2 = {
      admin: true,
      communityName: communityName,
      communityId: communityId
    };
    const documentRef2 = doc(firestore,  "users", userId);
    await updateDoc(documentRef2, {
        joined_communities: arrayRemove({
          admin: false,
          communityName: communityName,
          communityId: communityId
        })
    });
    await updateDoc(documentRef2, {
      joined_communities: arrayUnion(update2),
    });
    return "success";  
  } catch (e) {
      console.log(e);
  }
  return posts;
}


export const removeMember = async ( communityId, communityName, userId, email, admin ) =>  {
  let posts: Object[] = [];
  try{
    const documentRef = doc(firestore,  "Communities", communityId);
    await updateDoc(documentRef, {
        members_list: arrayRemove({
          id: userId,
          admin: admin,
          email: email
        })
    });
    const documentRef2 = doc(firestore,  "users", userId);
    await updateDoc(documentRef2, {
        joined_communities: arrayRemove({
          admin: admin,
          communityName: communityName,
          communityId: communityId
        })
    });
    return "success";
  } catch (e) {
      console.log(e);
  }
  return posts;
}


export const uploadImage = async (uri, imageName) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref1 = ref(storage, imageName);
  await uploadBytes(ref1, blob);
  return "success";
}

export const getImage = async (imageName) => {
  return await getDownloadURL(ref(storage, imageName));

}
