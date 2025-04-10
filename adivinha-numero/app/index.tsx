import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [numeroSorteado, setNumeroSorteado] = useState<number>(0);
  const [palpite, setPalpite] = useState<string>('');
  const [tentativas, setTentativas] = useState<number>(5);

  useEffect(() => {
    sortearNumero();
  }, []);

  const sortearNumero = () => {
    const numero = Math.floor(Math.random() * 100) + 1;
    setNumeroSorteado(numero);
  };

  const verificarPalpite = () => {
    const numero = parseInt(palpite);
  
    if (isNaN(numero) || numero < 1 || numero > 100) {
      Alert.alert('Erro', 'Digite um número entre 1 e 100!');
      return;
    }
  
    if (numero === numeroSorteado) {
      Alert.alert('Parabéns!', `Você acertou o número ${numeroSorteado}!`);
      resetarJogo();
    } else if (tentativas - 1 === 0) {
      Alert.alert('Fim de jogo', `Você perdeu! O número era ${numeroSorteado}`);
      resetarJogo();
    } else {
      const diferenca = numero - numeroSorteado;
      let dica = '';
  
      if (diferenca >= 20) {
        dica = 'Chutou MUITO alto!';
      } else if (diferenca <= -20) {
        dica = 'Chutou MUITO baixo!';
      } else if (diferenca > 0) {
        dica = 'Passou um pouco do número.';
      } else {
        dica = 'Faltou pouco pra acertar.';
      }
  
      Alert.alert('Tente novamente', dica);
      setTentativas(tentativas - 1);
      setPalpite('');
    }
  };  

  const resetarJogo = () => {
    sortearNumero();
    setTentativas(5);
    setPalpite('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Qual o número de 1 a 100?</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={palpite}
        onChangeText={setPalpite}
        placeholder="Digite seu palpite"
      />

      <Pressable style={styles.botao} onPress={verificarPalpite}>
        <Text style={styles.botaoTexto}>Verificar</Text>
      </Pressable>

      <Text style={styles.tentativas}>Tentativas restantes: {tentativas}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#03484c',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  tentativas: {
    fontSize: 18,
  },
});
