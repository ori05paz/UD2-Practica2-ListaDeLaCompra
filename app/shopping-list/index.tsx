import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import { theme } from "../../styles/Colors";
import { Link } from "expo-router";
import 'react-native-get-random-values';


type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  inCart: boolean;
};

const categories = [
  { name: "Panadería", image: require("../../assets/img/panaderia.png") },
  { name: "Bebidas", image: require("../../assets/img/bebidas.png") },
  { name: "Enlatados", image: require("../../assets/img/enlatados.png") },
  { name: "Carnes", image: require("../../assets/img/carnes.png") },
  { name: "Pescados", image: require("../../assets/img/pescados.png") },
  { name: "Frutas/Verduras", image: require("../../assets/img/frutas.png") },
  { name: "Otros", image: require("../../assets/img/otros.png") },
];

const ShoppingList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Panadería",
    quantity: "",
    unitPrice: "",
  });
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const currentTheme = isDarkTheme ? theme.dark : theme.light;

  const totalPrice = products.reduce(
    (total, product) =>
      product.inCart ? total + product.quantity * product.unitPrice : total,
    0
  );

  const openModal = (product: Product | null = null) => {
    setEditingProduct(product);
    if (product) {
      setNewProduct({
        name: product.name,
        category: product.category,
        quantity: product.quantity.toString(),
        unitPrice: product.unitPrice.toString(),
      });
    } else {
      setNewProduct({ name: "", category: "Panadería", quantity: "", unitPrice: "" });
    }
    setModalVisible(true);
  };

  const addOrEditProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.quantity ||
      !newProduct.unitPrice
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...editingProduct,
                name: newProduct.name,
                category: newProduct.category,
                quantity: parseInt(newProduct.quantity),
                unitPrice: parseFloat(newProduct.unitPrice),
              }
            : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: uuidv4(),
          name: newProduct.name,
          category: newProduct.category,
          quantity: parseInt(newProduct.quantity),
          unitPrice: parseFloat(newProduct.unitPrice),
          inCart: false,
        },
      ]);
    }

    setModalVisible(false);
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const toggleInCart = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, inCart: !product.inCart } : product
      )
    );
  };

  const clearList = () => {
    setProducts([]);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.background },
      ]}
    >

      <View style={styles.headerBar}>
        <TouchableOpacity>
          <Link href="/" style={styles.backButton}>
            <MaterialCommunityIcons
              name="rocket"
              size={24}
              color={currentTheme.text}
            />
          </Link>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsDarkTheme(!isDarkTheme)}>
          <Entypo name="star" size={24} color={currentTheme.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: currentTheme.text }]}>
          Lista de Compra
        </Text>
        <Text style={[styles.totalPrice, { color: currentTheme.text }]}>
          Total: €{totalPrice.toFixed(2)}
        </Text>
      </View>

      {products.length === 0 ? (
        <Text style={[styles.emptyMessage, { color: currentTheme.text }]}>
          These aren’t the droids you’re looking for...{"\n"}Lista Vacía
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const categoryImage = categories.find(
              (c) => c.name === item.category
            )?.image;
            return (
              <View style={[styles.product, { borderColor: currentTheme.text }]}>
                {categoryImage && (
                  <Image source={categoryImage} style={styles.productImage} />
                )}
                <View style={styles.productInfo}>
                  <Text style={[styles.productName, { color: currentTheme.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.productDetails, { color: currentTheme.text }]}>
                    {item.quantity} x €{item.unitPrice.toFixed(2)}
                  </Text>
                  <Text
                    style={[styles.productCategory, { color: currentTheme.text }]}
                  >
                    {item.category}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => toggleInCart(item.id)}>
                  <Text
                    style={[
                      styles.inCartStatus,
                      { color: item.inCart ? "green" : "red" },
                    ]}
                  >
                    {item.inCart ? "Obtenido" : "Pendiente"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                  <Text style={styles.deleteButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.clearButton,
            {
              backgroundColor: products.length === 0 ? "#ccc" : currentTheme.button,
            },
          ]}
          onPress={clearList}
          disabled={products.length === 0}
        >
          <Text style={styles.clearButtonText}>Vaciar Lista</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: currentTheme.button }]}
          onPress={() => openModal()}
        >
          <Text style={[styles.addButtonText, { color: currentTheme.buttonText }]}>
            Añadir Producto
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            {editingProduct ? "Editar Producto" : "Añadir Producto"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={newProduct.name}
            onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
          />
          <Picker
            selectedValue={newProduct.category}
            onValueChange={(value) =>
              setNewProduct({ ...newProduct, category: value })
            }
          >
            {categories.map((category) => (
              <Picker.Item
                key={category.name}
                label={category.name}
                value={category.name}
              />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={newProduct.quantity}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, quantity: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Precio por Unidad"
            keyboardType="numeric"
            value={newProduct.unitPrice}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, unitPrice: text })
            }
          />

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: currentTheme.button }]}
            onPress={addOrEditProduct}
          >
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "red", textAlign: "center" }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
 },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 10,
  },
  headerContainer: { 
    alignItems: "center", 
    marginVertical: 20 
 },
  header: { 
    fontSize: 24, 
    fontWeight: "bold" 
 },
  totalPrice: { 
    fontSize: 16, 
    marginTop: 5 
 },
  emptyMessage: { 
    textAlign: "center", 
    marginTop: 50, 
    fontSize: 18 
 },
  product: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  productImage: { 
    width: 40, 
    height: 40, 
    marginRight: 10 
 },
  productInfo: { 
    flex: 1 
 },
  productName: { 
    fontSize: 16, 
    fontWeight: "bold" 
 },
  productDetails: { 
    fontSize: 14 
 },
  productCategory: { 
    fontSize: 12, 
    color: "#888" 
 },
  inCartStatus: { 
    fontSize: 14, 
    fontWeight: "bold" 
 },
  deleteButton: { 
    color: "red", 
    marginLeft: 10 
 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  clearButton: { 
    flex: 1, 
    marginRight: 5, 
    padding: 10, 
    borderRadius: 5 
 },
  clearButtonText: { 
    textAlign: "center", 
    color: "#fff" 
 },
  addButton: { 
    flex: 1, 
    marginLeft: 5, 
    padding: 10, 
    borderRadius: 5 
 },
  addButtonText: { 
    textAlign: "center", 
    color: "#fff" 
 },
  modalContainer: { 
    flex: 1, 
    padding: 20, 
    justifyContent: "center" 
 },
  modalHeader: { 
    fontSize: 20, 
    marginBottom: 20 
 },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 10, 
    marginVertical: 10 
 },
  saveButton: { 
    padding: 10, 
    borderRadius: 5 
 },
  saveButtonText: { 
    textAlign: "center", 
    color: "#fff" 
 },
});
