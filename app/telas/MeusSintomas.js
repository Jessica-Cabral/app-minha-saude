import { View, Text, Button, Image } from 'react-native';

export default function MeusSintomas({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.titulo}>Tela Principal</Text>
            <Text>Bem-vindo ao sistema Chama Serviço!</Text>
            <Button
                title="Sair"
                onPress={() => navigation.replace('TelaLogin')}
                color="#9c88ff"
            />
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
        color: '#9c88ff',
    },
};
