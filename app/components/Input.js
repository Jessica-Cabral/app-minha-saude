import React from 'react';
import { TextInput, View } from 'react-native';

export default function Input({ placeholder, secureTextEntry, value, onChangeText }) {
  return (
    <View style={{ marginBottom: 15 }}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          backgroundColor: '#fff',
        }}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}