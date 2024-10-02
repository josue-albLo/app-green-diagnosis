import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'

// Updated simulated data for the analysis history
const historyData = [
  { 
    id: '1', 
    plant: 'Tomato', 
    date: '2024-09-25', 
    disease: 'Leaf Spot', 
    description: 'Circular brown spots on leaves, potentially causing defoliation.',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRvbWF0byUyMHBsYW50fGVufDB8fDB8fHww' 
  },
  { 
    id: '2', 
    plant: 'Potato', 
    date: '2024-09-24', 
    disease: 'Late Blight', 
    description: 'Water-soaked spots on leaves, stems, and tubers, leading to rapid plant death.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90YXRvJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D' 
  },
  { 
    id: '3', 
    plant: 'Strawberry', 
    date: '2024-09-23', 
    disease: 'Powdery Mildew', 
    description: 'White powdery coating on leaves, reducing plant vigor and fruit quality.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyYXdiZXJyeSUyMHBsYW50fGVufDB8fDB8fHww' 
  },
  { 
    id: '4', 
    plant: 'Cucumber', 
    date: '2024-09-22', 
    disease: 'Downy Mildew', 
    description: 'Yellow spots on leaf surfaces with fuzzy gray growth underneath.',
    image: 'https://images.unsplash.com/photo-1628784230353-5bee16e2f005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VjdW1iZXIlMjBwbGFudHxlbnwwfHwwfHx8MA%3D%3D' 
  },
  { 
    id: '5', 
    plant: 'Pepper', 
    date: '2024-09-21', 
    disease: 'Bacterial Spot', 
    description: 'Small, dark, raised spots on leaves, stems, and fruits.',
    image: 'https://images.unsplash.com/photo-1635178792420-c9eda4e3d2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVwcGVyJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D' 
  },
]

export default function AnalysisHistoryScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const renderHistoryItem = ({ item }: any) => {
    const isSelected = item.id === selectedId
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(isSelected ? null : item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.plantImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.plant}</Text>
          <Text style={styles.cardDate}>{item.date}</Text>
          <Text style={styles.cardDisease}>{item.disease}</Text>
          {isSelected && (
            <View>
              <Text style={styles.descriptionText}>{item.description}</Text>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Full Analysis</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {isSelected && (
          <View style={styles.selectedIndicator} />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={['#e8f5e9', '#c8e6c9']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#2e7d32" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Analysis History</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="filter" size={24} color="#2e7d32" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  filterButton: {
    padding: 10,
  },
  listContent: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  selectedCard: {
    borderColor: '#4caf50',
    borderWidth: 2,
  },
  plantImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardDisease: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: '500',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#4caf50',
  },
})