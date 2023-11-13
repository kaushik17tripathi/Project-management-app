// import { useEffect, useState } from 'react';
// import { projectAuth, projectFirestore } from '../config';
// import { useAuthContext } from './useAuthContext';

// export const useLogout = () => {
//   const [isCancelled, setIsCancelled] = useState(false);
//   const [error, setError] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const { dispatch, user } = useAuthContext();

//   const logout = async () => {
//     setError(null);
//     setIsPending(true);

//     try {
//       const { uid } = user;
//       await projectFirestore
//         .collection('users')
//         .doc(uid)
//         .update({ online: false });
//       // sign the user out
//       await projectAuth.signOut();

//       // dispatch logout action
//       dispatch({ type: 'LOGOUT' });

//       // update state
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

//   return { logout, error, isPending };
// };

import { useEffect, useState } from 'react';
import {  doc, updateDoc } from 'firebase/firestore';
import {  signOut } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';
import { projectFirestore, projectAuth } from '../config';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const { uid } = user;
      
      // Update online state in Firestore
      // const userDocRef = doc(projectFirestore, 'users', uid);
      // await updateDoc(userDocRef, { online: false });
      console.log(user)

      // Sign the user out
      console.log(user)
      await signOut(projectAuth);

      // Dispatch logout action
      dispatch({ type: 'LOGOUT' });

      console.log(user)

      // Update state
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

  return { logout, error, isPending };
};
