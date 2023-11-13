// import { useReducer, useEffect, useState } from 'react';
// import { projectFirestore, timestamp } from '../config';

// let initialState = {
//   document: null,
//   isPending: false,
//   error: null,
//   success: null,
// };

// const firestoreReducer = (state, action) => {
//   switch (action.type) {
//     case 'IS_PENDING':
//       return { isPending: true, document: null, success: false, error: null };
//     case 'ADDED_DOCUMENT':
//       return {
//         isPending: false,
//         document: action.payload,
//         success: true,
//         error: null,
//       };
//     case 'DELETED_DOCUMENT':
//       return { isPending: false, document: null, success: true, error: null };
//     case 'UPDATED_DOCUMENT':
//       return {
//         isPending: false,
//         document: action.payload,
//         success: true,
//         error: null,
//       };
//     case 'ERROR':
//       return {
//         isPending: false,
//         document: null,
//         success: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const useFirestore = (collection) => {
//   const [response, dispatch] = useReducer(firestoreReducer, initialState);
//   const [isCancelled, setIsCancelled] = useState(false);

//   // collection ref
//   const ref = projectFirestore.collection(collection);

//   // only dispatch is not cancelled
//   const dispatchIfNotCancelled = (action) => {
//     if (!isCancelled) {
//       dispatch(action);
//     }
//   };

//   // add a document
//   const addDocument = async (doc) => {
//     dispatch({ type: 'IS_PENDING' });

//     try {
//       const createdAt = timestamp.fromDate(new Date());
//       const addedDocument = await ref.add({ ...doc, createdAt });
//       dispatchIfNotCancelled({
//         type: 'ADDED_DOCUMENT',
//         payload: addedDocument,
//       });
//     } catch (err) {
//       dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
//     }
//   };

//   // delete a document
//   const deleteDocument = async (id) => {
//     dispatch({ type: 'IS_PENDING' });

//     try {
//       await ref.doc(id).delete();
//       dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
//     } catch (err) {
//       dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' });
//     }
//   };
//   //update document
//   const updateDocument = async (id, updates) => {
//     dispatch({ type: 'IS_PENDING' });
//     try {
//       const updatedDocument = await ref.doc(id).update(updates);
//       dispatchIfNotCancelled({
//         type: 'UPDATED_DOCUMENT',
//         payload: updatedDocument,
//       });
//       return updatedDocument;
//     } catch (err) {
//       dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
//       return null;
//     }
//   };

//   useEffect(() => {
//     return () => setIsCancelled(true);
//   }, []);

//   return { addDocument, deleteDocument, updateDocument, response };
// };

import { useReducer, useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { projectFirestore } from '../config';
import { Timestamp } from 'firebase/firestore';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null };
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // Firestore collection reference
  const collectionRef = collection(projectFirestore, collectionName);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(collectionRef, { ...doc, createdAt });
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await deleteDoc(doc(collectionRef, id));
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' });
    }
  };

  // update document
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const updatedDocument = await updateDoc(doc(collectionRef, id), updates);
      dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
