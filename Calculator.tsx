import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Pressable, FlatList,} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Calculator'>;

export default function Calculator({ navigation }: Props) {

  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("0");
  const [symbol, setSymbol] = useState("+");
  const [history, setHistory] = useState<string[]>([]);

  function calculate(){
    if(number1 === '' || number2 === ''){
      return;
    }

    const n1 = parseFloat(number1);
    const n2 = parseFloat(number2);
    let newResult = 0;
    
    switch(symbol){
      case '+': newResult = n1 + n2;
        break;
      case '-': newResult = n1 - n2;
       break;
      case 'x': newResult = n1 * n2;
      break;
      case '/': 
      if(n2 !== 0){
        newResult = n1 / n2;
      }else{
        Alert.alert("Division by 0 is impossible");
        return;
      }
      
      break;
    }
    setResult(newResult.toString());
    addToHistory(symbol,number1,number2,newResult.toString());
  }
  function addToHistory(symbol: string, number1: string, number2: string, result: string){
    setHistory([number1 + " "+ symbol + " " + number2 + " = " + result, ...history].slice(0, 10));
  }

  function resetCalculator(){
    setNumber1("");
    setNumber2("");
    setResult("0");
    setSymbol("+");
    setHistory([]);
  }
    



return (
    
  <View style={styles.container}>
    {/* The title of the app */}
    <View style={styles.header}>
      <Pressable 
  style={({ pressed }) => [
    styles.historyButton,
    pressed && styles.historyButtonPressed,
  ]}
  onPress={() => navigation.navigate('History', { history })}
>
  <Text style={styles.historyButtonText}>Voir l'historique</Text>
</Pressable>
      

    </View>

    {/* Calculator */}
    <View style={styles.calculatorCard}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Result</Text>
        <Text style={styles.resultText}>{result}</Text>
        
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          onChangeText={text => setNumber1(text)}
          value={number1}
        />
        <Text style={styles.symbolText}>{symbol}</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          onChangeText={text => setNumber2(text)}
          value={number2}
        />
      </View>

      <View style={styles.operatorsRow}>
        {['+', '-', 'x', '/'].map(op => (
          <Pressable
            key={op}
            style={[
              styles.operatorButton,
              symbol === op && styles.operatorButtonActive,
            ]}
            onPress={() => setSymbol(op)}
          >
            <Text
              style={[
                styles.operatorButtonText,
                symbol === op && styles.operatorButtonTextActive,
              ]}
            >
              {op}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.resetButton} onPress={resetCalculator}>
          <Text style={styles.actionButtonText}>AC</Text>
        </Pressable>
        <Pressable style={styles.equalsButton} onPress={calculate}>
          <Text style={styles.actionButtonText}>=</Text>
        </Pressable>
      </View>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  subTitle:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  historyList: {
  width: '100%',
  maxHeight: 150,
},
historyListContent: {
  paddingHorizontal: 20,
  gap: 6,
},
historyItem: {
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  paddingVertical: 8,
  paddingHorizontal: 14,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 1,
},
historyItemText: {
  fontSize: 14,
  color: '#3A3A3C',
  textAlign: 'center',
},
  header: {
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  calculatorCard: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 18,
    textAlign: 'center',
  },
  symbolText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9500',
    width: 30,
    textAlign: 'center',
  },
  operatorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 20,
  },
  operatorButton: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  operatorButtonActive: {
    backgroundColor: '#FF9500',
  },
  operatorButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  operatorButtonTextActive: {
    color: '#FFFFFF',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  equalsButton: {
    flex: 2,
    backgroundColor: '#34C759',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyButton: {
  backgroundColor: '#FF9500',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},
historyButtonPressed: {
  opacity: 0.7,
},
historyButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
},
});
