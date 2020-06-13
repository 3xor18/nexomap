import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import ListProducts from '../Components/Home/ListProducts';
import firebase from 'firebase/app'
import { firebaseApp } from '../Utils/FirebaseConfig'
import { useFocusEffect } from "@react-navigation/native";
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export default function HomeScreen() {
    const [products, setproducts] = useState([]);
    const [startProduct, setStartProduct] = useState(null)
    const [user, setUser] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const limitProducts = 10;

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo);
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            db.collection("abarrotes")
                .get()
                .then((snap) => {
                    setTotalProducts(snap.size);
                });

            const resultProducts = [];

            db.collection("abarrotes")
                .orderBy("createAt", "desc")
                .limit(limitProducts)
                .get()
                .then((response) => {
                    setStartProduct(response.docs[response.docs.length - 1]);
                    response.forEach((doc) => {
                        const product = doc.data();
                        product.id = doc.id;
                        resultProducts.push(product);
                    });
                    setproducts(resultProducts);
                });
        }, [])
    );

    return (
        <View>
            <ListProducts products={products} />
        </View>
    );
}
