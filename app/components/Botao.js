import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Botao({ titulo, onPress }) {
  return (
    <TouchableOpacity 
      style={{
        backgroundColor: '#9cec',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{titulo}</Text>
    </TouchableOpacity>
  );
}