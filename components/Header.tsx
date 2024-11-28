import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { cards } from "../data/Header";

export default function Header() {
  const { title, body, imgSource } = cards[0];
  return (
    <View style={styles.container}>
      <Image source={imgSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
