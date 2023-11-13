// import { useEffect, useState } from 'react';
// import { projectFirestore } from '../config';

// export function useDocument(collection, id) {
//   const [document, setDocument] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const ref = projectFirestore.collection(collection).doc(id);
//     const unsubscribe = ref.onSnapshot(
//       (snapshot) => {
//         if (snapshot.data()) {
//           setDocument({ ...snapshot.data(), id: snapshot.id });
//           setError(null);
//         } else {
//           setError('invalid document id');
//         }
//       },
//       (error) => {
//         console.log(error.message);
//         setError('cant get the document');
//       }
//     );

//     return () => unsubscribe();
//   }, [collection, id]);

//   return { document, error };
// }

import { useEffect, useState } from 'react';
import {  doc, onSnapshot } from 'firebase/firestore';
import { projectFirestore } from '../config';

export function useDocument(collection, id) {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const docRef = doc(projectFirestore, collection, id);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError('Invalid document id');
        }
      },
      (error) => {
        console.log(error.message);
        setError('Cannot get the document');
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
}
