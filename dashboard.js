import { auth, db } from "./firebase.js";
import { doc, onSnapshot, collection, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(user => {
  if (!user) return;

  // Balance realtime
  onSnapshot(doc(db, "users", user.uid), snap => {
    document.getElementById("balance").innerText = snap.data().balance;
  });

  // Transaction realtime
  const q = query(
    collection(db, "transactions"),
    where("uid", "==", user.uid)
  );

  onSnapshot(q, snap => {
    console shows("Transaction updated", snap.size);
  });
});
