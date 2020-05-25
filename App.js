import React from 'react';
import Navigation from './App/Navigation/Navigation'
import { YellowBox } from 'react-native'
import { decode, encode } from "base-64";

YellowBox.ignoreWarnings(["Setting a timer"])
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return (
    <Navigation />
  );
}