import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  const [numeroSorteado, setNumeroSorteado] = useState<number>(0);
  const [palpite, setPalpite] = useState<string>('');
  const [tentativas, setTentativas] = useState<number>(5);
  const [historico, setHistorico] = useState<string[]>([]); // Histórico de palpites

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
      const distancia = Math.abs(diferenca);

      let textoDistancia = '';
      let textoDirecao = '';

      // Parte 1: Qual a distância?
      if (distancia >= 30) {
        textoDistancia = 'Você está MUITO longe';
      } else if (distancia >= 15) {
        textoDistancia = 'Você está longe';
      } else if (distancia >= 6) {
        textoDistancia = 'Você está perto';
      } else {
        textoDistancia = 'Você está MUITO perto';
      }

      // Parte 2: Chutou pra cima ou pra baixo?
      if (diferenca >= 20) {
        textoDirecao = 'e chutou MUITO acima do número.';
      } else if (diferenca >= 1) {
        textoDirecao = 'e chutou um pouco acima do número.';
      } else if (diferenca <= -20) {
        textoDirecao = 'e chutou MUITO abaixo do número.';
      } else {
        textoDirecao = 'e chutou um pouco abaixo do número.';
      }

      Alert.alert('Tente novamente', `${textoDistancia}, ${textoDirecao}`);

      // Atualizar o histórico
      const novoHistorico = `Tentativa ${6 - tentativas}: ${numero}`;
      setHistorico([...historico, novoHistorico]);

      setTentativas(tentativas - 1);
      setPalpite('');
    }
  };

  const resetarJogo = () => {
    sortearNumero();
    setTentativas(5);
    setPalpite('');
    setHistorico([]); // Limpar o histórico ao reiniciar o jogo
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

      {/* Histórico de Palpites */}
      <Text style={styles.historicoTitulo}>Histórico de palpites:</Text>
      <ScrollView style={styles.historicoContainer}>
        {historico.map((item, index) => (
          <Text key={index} style={styles.historicoItem}>{item}</Text>
        ))}
      </ScrollView>
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
    marginTop: 20,
  },
  historicoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  historicoContainer: {
    maxHeight: 200,
    marginTop: 10,
    width: '100%',
  },
  historicoItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});
