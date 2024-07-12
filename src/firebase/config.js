import { tab } from '@testing-library/user-event/dist/tab'
import firestore, { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'

const data =
    [
        {
            "id": "1",
            "title": "Veggie Stew",
            "ingredients": [
                "1 Carrot",
                "1 Leek",
                "200g Tofu",
                "300ml Veg stock"
            ],
            "method": "1. Pre-heat the oven to 200C/3C/gas 5. Place the carrot, leek and tofu in a large bowl. Add the stock and mix well. 2. Add the rest of the ingredients and mix well. 3. Place the mixture in a large bowl and cover with a lid. 4. Place the lid on the oven and cook for 40 minutes. 5. Serve with a slaw of your choice",
            "cookingTime": "45 minutes"
        },
        {
            "id": "2",
            "title": "Veggie Pizza",
            "ingredients": [
                "1 Base",
                "Tomata pasata",
                "1 Green pepper",
                "100g Mushrooms"
            ],
            "method": "1. Pre-heat the oven to 200C/3C/gas 5. Add the pasata, green pepper and mushrooms to the base. Place the lid on the oven and cook for 30 minutes. 5. Serve with a slaw of your choice",
            "cookingTime": "35 minutes"
        },
        {
            "id": "3",
            "title": "Greek Salad",
            "ingredients": [
                "1 Onion",
                "1 Block of Feta",
                "Olives",
                "Tomatoes",
                "Olive Oil"
            ],
            "method": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse minima ex rem quis similique eum ratione quaerat, voluptas molestias ut repudiandae delectus voluptates. Eius esse at tenetur ab accusamus excepturi?",
            "cookingTime": "35 minutes"
        }
    ]

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
const db = getFirestore(app)

// add data
export async function addData(tableName, data) {
    try {
        const docRef = await addDoc(collection(db, tableName), data)
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        throw new Error("Error adding document: ", e);
    }
}

export function addRecipts() {
    data.forEach(recipe => {
        addData("recipes", recipe)
    })
}

// get all data
export async function getData(tableName) {
    try {
        const queryData = await getDocs(collection(db, tableName));
        return queryData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
    } catch (e) {
        throw new Error("Can not search the data");
    }
}

// get data by id
export async function getDataById(tableName, id) {
    try {
        const queryDataById = await getDoc(doc(db, tableName, id));
        return queryDataById.data()
    } catch (e) {
        throw new Error("Can not search the data");
    }
}

// updata data by id
export async function updateById(tableName, id, data) {
    try {
        const updateData = await updateDoc(doc(db, tableName, id), data)
        return updateData;
    } catch (error) {
        throw new Error("Can not update the data")
    }
}

// delete data by id
export async function deleteData(tableName, id) {
    try {
        await deleteDoc(doc(db, tableName, id))
    }
    catch (e) {
        throw new Error("Can not search the data");
    }
}