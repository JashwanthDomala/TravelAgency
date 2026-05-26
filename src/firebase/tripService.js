import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";

const LOCAL_KEY = "tripcraft_saved_trips";
const LOCAL_BOOKINGS = "tripcraft_bookings";

const localGet = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const localSet = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export async function saveTrip(userId, tripData) {
  const payload = { ...tripData, userId, createdAt: new Date().toISOString() };

  if (!isFirebaseConfigured() || !db) {
    const trips = localGet(LOCAL_KEY);
    trips.unshift({ id: `local-${Date.now()}`, ...payload });
    localSet(LOCAL_KEY, trips);
    return trips[0];
  }

  const ref = await addDoc(collection(db, "savedTrips"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, ...payload };
}

export async function getSavedTrips(userId) {
  if (!isFirebaseConfigured() || !db) {
    return localGet(LOCAL_KEY).filter((t) => t.userId === userId);
  }

  const q = query(
    collection(db, "savedTrips"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createBooking(userId, bookingData) {
  const payload = { ...bookingData, userId, status: "confirmed", bookedAt: new Date().toISOString() };

  if (!isFirebaseConfigured() || !db) {
    const bookings = localGet(LOCAL_BOOKINGS);
    bookings.unshift({ id: `booking-${Date.now()}`, ...payload });
    localSet(LOCAL_BOOKINGS, bookings);
    return bookings[0];
  }

  const ref = doc(collection(db, "bookings"));
  await setDoc(ref, { ...payload, createdAt: serverTimestamp() });
  return { id: ref.id, ...payload };
}

export async function getBookings(userId) {
  if (!isFirebaseConfigured() || !db) {
    return localGet(LOCAL_BOOKINGS).filter((b) => b.userId === userId);
  }

  const q = query(
    collection(db, "bookings"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
