import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AddTodo } from './src/AddTodo';

import {Navbar} from './src/Navbar'


export default function App() {
  return (
    <View style={styles.container}>
      <Navbar title="Todo App"/>
      <AddTodo/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
