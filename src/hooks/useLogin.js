// import { useState, useEffect } from 'react';
// import { projectAuth,signInWithEmailAndPassword, projectFirestore } from '../config';
// import { useAuthContext } from './useAuthContext';

// export const useLogin = () => {
//   const [isCancelled, setIsCancelled] = useState(false);
//   const [error, setError] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const { dispatch } = useAuthContext();

//   const login = async (email, password) => {
//     setError(null);
//     setIsPending(true);

//     try {
//       // login
//       const res = await signInWithEmailAndPassword(projectAuth,email, password);

//       // update online state
//       await projectFirestore
//         .collection('users')
//         .doc(res.user.uid)
//         .update({ online: true });

//       // dispatch login action
//       dispatch({ type: 'LOGIN', payload: res.user });

//       if (!isCancelled) {
//         setIsPending(false);
//         setError(null);
//       }
//     } catch (err) {
//       if (!isCancelled) {
//         setError(err.message);
//         setIsPending(false);
//       }
//     }
//   };

//   useEffect(() => {
//     return () => setIsCancelled(true);
//   }, []);

//   return { login, isPending, error };
// };

import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword as signInWithEmailAndPasswordV9,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthContext } from './useAuthContext';
import { projectAuth, projectFirestore } from '../config';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);


    try {
      // Login
      const res = await signInWithEmailAndPasswordV9(projectAuth, email, password);

      // Update online state
      const userDocRef = doc(projectFirestore, 'users', res.user.uid);
      await updateDoc(userDocRef, { online: true });

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

  return { login, isPending, error };
};

