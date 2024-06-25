import app from 'firebase.config';
import { getDatabase, ref, child, get, set, update } from 'firebase/database';

const dbRef = ref(getDatabase(app));

export const readData = (collection: string, id?: string) => {
  const result = get(child(dbRef, `${collection}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        if (id) {
          return snapshot.val()[id];
        }
        console.log(snapshot.val());
        return snapshot.val();
      }
      return { data: null };
    })
    .catch((error) => {
      console.error(error);
      return { error: 'Failed To Retrive Data' };
    });
  return result;
};

export const writeData = <T>(collection: string, data: T, id: string) => {
  set(child(dbRef, `${collection}/${id}`), {
    ...data,
  });
};

export const updateData = <T>(collection: string, data: T, id: string) => {
  get(child(dbRef, `${collection}/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let updateData = snapshot.val();
        updateData = { ...updateData, ...data };
        update(child(dbRef, `${collection}/${id}`), updateData)
          .then(() => {
            console.log('Succesfully Updated');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
