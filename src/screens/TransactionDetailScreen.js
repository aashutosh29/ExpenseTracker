import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TransactionDetailScreen = () => {
  const route = useRoute();
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>
      <View style={styles.card}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{transaction.Date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={[styles.value, { color: transaction.TransactionType === 'Refund' ? '#28a745' : '#E0245E' }]}>
            {transaction.TransactionType === 'Refund' ? '+' : '-'} ${transaction.Amount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{transaction.Description}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{transaction.Location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{transaction.TransactionType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{transaction.Category}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#14171A', //Darker background
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#FFFFFF', // White text
    marginBottom: 20,
  },
  card: { 
    backgroundColor: '#25282B', // Slightly lighter gray for card
    borderRadius: 10, 
    padding: 15, 
    borderColor: '#AAB8C2', 
    borderWidth: 0.5,
  },
  detailRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10,
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFFFFF', // White text
  },
  value: { 
    fontSize: 16, 
    color: '#AAB8C2', // Light gray for values
  },
});

export default TransactionDetailScreen;