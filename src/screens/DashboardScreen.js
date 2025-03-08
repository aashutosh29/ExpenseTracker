import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import moment from 'moment';
import AddTransactionForm from '../components/AddTransactionForm';

// Sample data for charts 
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [{ data: [20, 45, 28, 80, 99], color: (opacity = 1) => `rgba(29, 161, 242, ${opacity})` }],
};

const pieData = [
  { name: 'Shopping', population: 45, color: '#1DA1F2', legendFontColor: '#FFFFFF', legendFontSize: 12 },
  { name: 'Travel', population: 25, color: '#E0245E', legendFontColor: '#FFFFFF', legendFontSize: 12 },
  { name: 'Utility', population: 30, color: '#28a745', legendFontColor: '#FFFFFF', legendFontSize: 12 },
];

const DashboardScreen = () => {
  const [transactions, setTransactions] = useState([
    { id: '1', Date: '2025-03-01', Amount: 45.99, Description: 'Grocery Shopping', Location: 'Walmart', TransactionType: 'Debit', Category: 'Shopping' },
    { id: '2', Date: '2025-03-02', Amount: 120.50, Description: 'Flight to New York', Location: 'Airport', TransactionType: 'Credit', Category: 'Travel' },
    { id: '3', Date: '2025-03-03', Amount: 65.00, Description: 'Electricity Bill', Location: 'Home', TransactionType: 'Debit', Category: 'Utility' },
    { id: '4', Date: '2025-03-04', Amount: 15.99, Description: 'Coffee with Friends', Location: 'Starbucks', TransactionType: 'Debit', Category: 'Shopping' },
    { id: '5', Date: '2025-03-05', Amount: 25.00, Description: 'Refund for Returned Item', Location: 'Online Store', TransactionType: 'Refund', Category: 'Shopping' },
  ]);

  const [filter, setFilter] = useState('All');
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.replace('SignIn');
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { id: Date.now().toString(), ...transaction }]);
  };

  const viewTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    navigation.navigate('TransactionDetail', { transaction });
  };

  // Calculate summary statistics
  const totalExpenses = transactions
    .filter(t => t.TransactionType === 'Debit')
    .reduce((sum, t) => sum + t.Amount, 0)
    .toFixed(2);

  const totalIncome = transactions
    .filter(t => t.TransactionType === 'Credit')
    .reduce((sum, t) => sum + t.Amount, 0)
    .toFixed(2);

  const totalSavings = (totalIncome - totalExpenses).toFixed(2);

  // Filter transactions
  const filteredTransactions = filter === 'All'
    ? transactions
    : transactions.filter(t => t.TransactionType === filter);

  const chartConfig = {
    backgroundColor: '#14171A',
    backgroundGradientFrom: '#14171A',
    backgroundGradientTo: '#25282B',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(29, 161, 242, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: '6', strokeWidth: '2', stroke: '#1DA1F2' },
  };

  const screenWidth = 350; 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => viewTransaction(item.id)} style={styles.item}>
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
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Dashboard</Text>
            <View style={styles.logoutButton}>
              <Button title="Logout" onPress={handleLogout} color="#1DA1F2" />
            </View>
          </View>

          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.cardTitle}>Total Expenses</Text>
              <Text style={styles.cardValue}>${totalExpenses}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.cardTitle}>Total Income</Text>
              <Text style={styles.cardValue}>${totalIncome}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.cardTitle}>Savings</Text>
              <Text style={styles.cardValue}>${totalSavings}</Text>
            </View>
          </View>

          {/* Charts Section */}
          <View style={styles.chartContainer}>
            <Text style={styles.sectionTitle}>Spending Trend</Text>
            <LineChart
              data={chartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
            <Text style={styles.sectionTitle}>Category Breakdown</Text>
            <PieChart
              data={pieData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={styles.chart}
            />
          </View>

          {/* Filter Controls */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'All' && styles.activeFilter]}
              onPress={() => setFilter('All')}
            >
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'Debit' && styles.activeFilter]}
              onPress={() => setFilter('Debit')}
            >
              <Text style={styles.filterText}>Debit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'Credit' && styles.activeFilter]}
              onPress={() => setFilter('Credit')}
            >
              <Text style={styles.filterText}>Credit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'Refund' && styles.activeFilter]}
              onPress={() => setFilter('Refund')}
            >
              <Text style={styles.filterText}>Refund</Text>
            </TouchableOpacity>
          </View>

          {/* Transaction Form */}
          <AddTransactionForm onAddTransaction={addTransaction} />
        </>
      }
      data={filteredTransactions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListFooterComponent={
        <View style={styles.refreshContainer}>
          <Button title="Refresh" onPress={() => {}} color="#1DA1F2" />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14171A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#25282B',
    borderBottomWidth: 1,
    borderBottomColor: '#AAB8C2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoutButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  summaryCard: {
    backgroundColor: '#25282B',
    padding: 15,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    borderColor: '#AAB8C2',
    borderWidth: 0.5,
  },
  cardTitle: {
    fontSize: 16,
    color: '#AAB8C2',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chartContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#25282B',
    borderRadius: 10,
    margin: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#AAB8C2',
  },
  activeFilter: {
    backgroundColor: '#1DA1F2',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  item: {
    backgroundColor: '#25282B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#AAB8C2',
    borderWidth: 0.5,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#AAB8C2',
    marginTop: 5,
  },
  refreshContainer: {
    padding: 10,
    alignItems: 'center',
  },
});

export default DashboardScreen;