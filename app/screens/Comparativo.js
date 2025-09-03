import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Comparativos = () => {
    
    const data = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Cor da linha
                strokeWidth: 2, // Largura da linha
            },
        ],
        legend: ['Últimos Registros'], // Legenda
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Comparativo dos Últimos Registros</Text>
            
            <Text style={styles.chartTitle}>Gráfico de Linha</Text>
            <LineChart
                data={data}
                width={screenWidth - 20}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
            />

            <Text style={styles.chartTitle}>Gráfico de Barras</Text>
            <BarChart
                data={data}
                width={screenWidth - 20}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
            />
        </ScrollView>
    );
};

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 1,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    chart: {
        marginVertical: 10,
        borderRadius: 10,
    },
});

export default Comparativo;