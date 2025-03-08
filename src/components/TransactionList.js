import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionList = ({ transactions, onSelectTransaction }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectTransaction(item.id)} style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.description}>{item.Description}</Text>
        <Text style={[styles.amount, { color: item.TransactionType === 'Refund' ? '#28a745' : '#E0245E' }]}>
          {item.TransactionType === 'Refund' ? '+' : '-'} ${item.Amount.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.subText}>{item.Date} | {item.Category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No transactions yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#FFFFFF' },
  item: { backgroundColor: '#25282B', padding: 15, borderRadius: 10, marginBottom: 10, borderColor: '#AAB8C2', borderWidth: 0.5 },
  itemContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  description: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  amount: { fontSize: 16, fontWeight: 'bold' },
  subText: { fontSize: 14, color: '#AAB8C2', marginTop: 5 },
  emptyText: { fontSize: 16, color: '#AAB8C2', textAlign: 'center', marginTop: 20 },
});

export default TransactionList;