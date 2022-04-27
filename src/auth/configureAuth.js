import firebaseApp from "../lib/configureFirebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default auth;
