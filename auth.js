import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// LOGIN
window.login = async () => {
  const phone = document.getElementById("phone").value;
  const pass = document.getElementById("password").value;

  await signInWithEmailAndPassword(auth, phone + "@biniyog.com", pass);
  window.location.href = "dashboard.html";
};

// SIGNUP
window.signup = async () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const pass = document.getElementById("password").value;

  const user = await createUserWithEmailAndPassword(
    auth,
    phone + "@biniyog.com",
    pass
  );

  await setDoc(doc(db, "users", user.user.uid), {
    name,
    phone,
    balance: 0
  });

  window.location.href = "index.html";
};

// PROTECT DASHBOARD
onAuthStateChanged(auth, (user) => {
  if (!user && location.pathname.includes("dashboard")) {
    location.href = "index.html";
  }
});
