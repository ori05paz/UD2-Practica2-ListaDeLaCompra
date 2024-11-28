import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scrolls } from "../data/Cards";

export default function Cards() {
  return (
    <View style={styles.container}>
      {scrolls.map((hobby, index) => (
        <Text key={index} style={styles.hobby}>
          {hobby}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  hobby: {
    fontSize: 18,
    marginVertical: 10,
  },
});

