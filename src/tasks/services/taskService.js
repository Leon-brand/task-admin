

import { db } from "../../firebase/config";
import { collection, query, where, getDocs, addDoc, deleteDoc, serverTimestamp, doc, updateDoc} from "firebase/firestore";

export const getUserTasks = async (userId) => {
  try {
    const tasksRef = collection(db, "tasks");
    // Filtramos donde el campo userId sea igual al UID del usuario logueado
    const q = query(tasksRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()

    }));
  } catch (error) {
    console.error("Error fetching tasks:", error)

    throw error;
  }
};


export const createTask = async (taskData) => {
  try {
    const tasksRef = collection(db, "tasks");
    // Añadimos campos fijos de sistema antes de enviar a Firestore
    const docRef = await addDoc(tasksRef, {
      ...taskData,
      status: "Creada",

      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}


export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}



export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { status: newStatus });
  } catch (error) {


    console.error("Error updating status:", error);
    throw error;
  }
}
