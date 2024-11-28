import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../../styles/Colors";
import React, { useState } from "react";

const WelcomePage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const currentTheme = isDarkTheme ? theme.dark : theme.light;

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <TouchableOpacity
        style={styles.themeToggle}
        onPress={() => setIsDarkTheme(!isDarkTheme)}
      >
        <Entypo name="star" size={24} color={currentTheme.text} />
      </TouchableOpacity>

      <Text style={[styles.message, { color: currentTheme.text }]}>
        {isDarkTheme
          ? "El lado oscuro te ofrece más poder."
          : "Que la Fuerza te acompañe."}
      </Text>

      <Image
        style={styles.logo}
        source={
          isDarkTheme
            ? require("../../assets/img/sithlogo.png")
            : require("../../assets/img/jedilogo.png")
        }
      />

      <Image
        style={styles.saber}
        source={
          isDarkTheme
            ? require("../../assets/img/Red-Lightsaber-Transparent-PNG.png")
            : require("../../assets/img/Blue-Lightsaber-Transparent.png") 
        }
      />

      <Link
        href="/(tabs)/cards"
        style={[styles.button, { backgroundColor: currentTheme.button }]}
      >
        <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
          Bienvenido
        </Text>
      </Link>

      <Link
        href="/shopping-list"
        style={[styles.button, { backgroundColor: currentTheme.button }]}
      >
        <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
          Ir a la Lista de Compras
        </Text>
      </Link>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  themeToggle: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  saber: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
});
