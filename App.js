import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNaviagtion from './navigation/AppNaviagtion';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNaviagtion/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Use backgroundColor to set background color
  },
});
