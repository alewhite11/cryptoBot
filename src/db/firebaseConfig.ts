// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBuAYhLVqrVDRNmVw_EbbF8s1hykIt7xc",
  authDomain: "planttoken-7e33c.firebaseapp.com",
  projectId: "planttoken-7e33c",
  storageBucket: "planttoken-7e33c.appspot.com",
  messagingSenderId: "739432368277",
  appId: "1:739432368277:web:5418f9570d0d34b714f39c",
  measurementId: "G-PYKKT3EBMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const addUser = async (userId: string, userName: string, referredById : string) => {
  try {
    // Create a reference to the document with the provided userId
    const userRef = doc(db, "users", userId);
    
    // Set the document with the given fields
    await setDoc(userRef, {
      name: userName,
      isActive: false,
      referredBy: referredById
    });
    return true;
  } catch (error) {
    return false;
  }
};

//update user status to true
export const updateUser = async (userId: string) => {
  try {
    // Create a reference to the document with the provided userId
    const userRef = doc(db, "users", userId);
    
    // Update the isActive field to true
    await updateDoc(userRef, {
      isActive: true
    });

    return true;
  } catch (error) {
    console.error("Error activating user: ", error);
    return false;
  }
};

export const updateUserToPremium = async (userId: string) => {
  try {
    // Create a reference to the document with the provided userId
    const userRef = doc(db, "users", userId);
    
    // Update the isActive field to true
    await updateDoc(userRef, {
      septemberPass: true
    });

    return true;
  } catch (error) {
    console.error("Error updating user: ", error);
    return false;
  }
};

export const getUsersReferredBy = async (userId: number) => {
  try {
    // Create a reference to the users collection
    const usersRef = collection(db, "users");

    // Create a query against the collection
    const q = query(usersRef, where("referredBy", "==", userId.toString()));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Process and return the results
    const referredUsers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      isActive: doc.data().isActive,
      name: doc.data().name,
      referredBy: doc.data().referredBy, 
      septemberPass: doc.data().septemberPass
    }));
    return referredUsers;
  } catch (error) {
    console.error("Error retrieving referred users: ", error);
    return [];
  }
};
