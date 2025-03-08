import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddTransactionForm = ({ onAddTransaction }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [transactionType, setTransactionType] = useState('Debit');
  const [category, setCategory] = useState('Shopping');

  const handleAddTransaction = () => {
    if (!date || !amount || !description || !location) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Amount must be a positive number.');
      return;
    }
    const transaction = {
      Date: date,
      Amount: parseFloat(amount),
      Description: description,
      Location: location,
      TransactionType: transactionType,
      Category: category,
    };
    onAddTransaction(transaction);
    setDate('');
    setAmount('');
    setDescription('');
    setLocation('');
    setTransactionType('Debit');
    setCategory('Shopping');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Add New Transaction</Text>
      <TextInput
        style={styles.input}
        placeholder="Date (e.g., 2025-03-06)"
        placeholderTextColor="#AAB8C2"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount (e.g., 50.00)"
        placeholderTextColor="#AAB8C2"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description (e.g., Groceries)"
        placeholderTextColor="#AAB8C2"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Location (e.g., Store)"
        placeholderTextColor="#AAB8C2"
        value={location}
        onChangeText={setLocation}
      />
      <Picker
        selectedValue={transactionType}
        onValueChange={setTransactionType}
        style={styles.picker}
      >
        <Picker.Item label="Debit" value="Debit" />
        <Picker.Item label="Credit" value="Credit" />
        <Picker.Item label="Refund" value="Refund" />
      </Picker>
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Travel" value="Travel" />
        <Picker.Item label="Utility" value="Utility" />
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Add Transaction" onPress={handleAddTransaction} color="#1DA1F2" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#25282B',
    borderRadius: 10,
    borderColor: '#AAB8C2',
    borderWidth: 0.5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  input: {
    height: 50,
    backgroundColor: '#14171A',
    borderColor: '#AAB8C2',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 16,
  },
  picker: {
    height: 50,
    backgroundColor: '#14171A',
    borderColor: '#AAB8C2',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default AddTransactionForm;