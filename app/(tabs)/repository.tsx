import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { theme } from "../../styles/Colors";
import Header from "../../components/Header";
import { Link } from "expo-router";

export default function RepositoryScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const currentTheme = isDarkTheme ? theme.dark : theme.light;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Header />
      <QRCode value="https://github.com/ori05paz" size={250} />

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
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 16,
    width: "100%",
  },
  icon: {
    padding: 10,
  },
});
