import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/Colors";

const ShoppingListPage = () => {
  const priceTotal = 0; 
  const products = []; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de la Compra</Text>
      {products.length === 0 ? (
        <Text style={styles.emptyMessage}>Lista vacía</Text>
      ) : (
        <Text style={styles.price}>Precio total: {priceTotal} €</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: "gray",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default ShoppingListPage;
