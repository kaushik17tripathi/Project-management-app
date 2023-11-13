
import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword as createUserWithEmailAndPasswordV9,
  updateProfile,
} from 'firebase/auth';
import {  setDoc, doc } from 'firebase/firestore';
import { useAuthContext } from './useAuthContext';
import { projectAuth, projectFirestore } from '../config';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // Signup
      const res = await createUserWithEmailAndPasswordV9(projectAuth, email, password);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      // Add display name to user
      await updateProfile(projectAuth.currentUser, { displayName,// photoURL: imgURL 
    });

      // Create user document
      const userDocRef = doc(projectFirestore, 'users', res.user.uid);
      await setDoc(userDocRef, {
        online: true,
        displayName,
      });

      // Dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};

