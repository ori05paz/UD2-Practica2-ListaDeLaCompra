import { Modal, Text, TextInput, View, Button, StyleSheet } from "react-native";
import { useState } from "react";

const AddProductModal = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = () => {
    if (name && category && quantity && price) {
      onSave({ name, category, quantity: parseInt(quantity), price: parseFloat(price) });
      onClose();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <Text>Agregar Producto</Text>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Categoría"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />
        <TextInput
          placeholder="Cantidad"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Precio por unidad"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Guardar" onPress={handleSave} />
        <Button title="Cerrar" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default AddProductModal;
