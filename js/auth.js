import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.login = async function () {
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  msg.innerText = "";

  if (!phone || !password) {
    msg.innerText = "সব তথ্য পূরণ করুন";
    return;
  }

  try {
    // phone → fake email বানানো
    const email = phone + "@biniyog.com";

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Firestore user check (optional but safe)
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      msg.innerText = "ইউজার ডাটা পাওয়া যায়নি";
      return;
    }

    // ✅ LOGIN SUCCESS → DASHBOARD
    window.location.href = "dashboard.html";

  } catch (error) {
    msg.innerText = "ভুল মোবাইল বা পাসওয়ার্ড";
    console.error(error);
  }
};
