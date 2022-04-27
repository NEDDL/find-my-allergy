import firebaseApp from "../lib/configureFirebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default db;
