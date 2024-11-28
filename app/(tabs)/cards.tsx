import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { theme } from "../../styles/Colors";
import Header from "../../components/Header";
import { scrolls } from "../../data/Cards";
import { Link } from "expo-router";

export default function CardsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const currentTheme = isDarkTheme ? theme.dark : theme.light;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <ScrollView style={styles.scrollView}>
        <Header />
        {scrolls.map((hobby, index) => (
          <Text key={index} style={styles.hobby}>
            {hobby}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setIsDarkTheme(!isDarkTheme)} style={styles.icon}>
          <Entypo name="star" size={30} color={currentTheme.text} />
        </TouchableOpacity>

        <Link href="/(tabs)/cards" style={styles.icon}>
          <Ionicons name="planet" size={30} color={currentTheme.text} />
        </Link>

        <Link href="/welcome" style={styles.icon}>
          <Ionicons name="person-circle" size={30} color={currentTheme.text} />
        </Link>

        <Link href="/(tabs)/repository" style={styles.icon}>
          <Ionicons name="logo-github" size={30} color={currentTheme.text} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  hobby: {
    fontSize: 18,
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 16,
  },
  icon: {
    padding: 10,
  },
});
