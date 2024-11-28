import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { theme } from "../../styles/Colors";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const sampleProducts = [
  { id: uuidv4(), name: "Pan", category: "Panadería", price: 1.2, quantity: 1, inCart: false },
  { id: uuidv4(), name: "Agua", category: "Bebidas", price: 0.8, quantity: 1, inCart: false },
];

const ShoppingListPage = () => {
  const [products, setProducts] = useState(sampleProducts);

  const categoryImages = {
    Panadería: require("../../assets/img/pan.png"),
    Bebidas: require("../../assets/img/agua.png"),
  };

  const toggleProductStatus = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, inCart: !product.inCart } : product
      )
    );
  };

  const totalPrice = products.reduce(
    (acc, product) => acc + (product.inCart ? product.price * product.quantity : 0),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de la Compra</Text>
      <Text>Precio total: {totalPrice} €</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={categoryImages[item.category]} style={styles.categoryImage} />
            <Text>{item.name}</Text>
            <Text>Cantidad: {item.quantity}</Text>
            <Text>Precio: {item.price} €</Text>
            <TouchableOpacity onPress={() => toggleProductStatus(item.id)} style={styles.toggleButton}>
              <Text>{item.inCart ? "Marcado como obtenido" : "Pendiente"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  toggleButton: {
    backgroundColor: "#00ff00",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default ShoppingListPage;
