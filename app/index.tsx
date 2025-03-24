import {useState, useEffect} from "react";
import { Text, View, Button } from "react-native";
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage';



import MyButton from "@/components/myButton";
import Footer from "@/components/Footer"
import useAsyncStorage from "@/hooks/useAsyncStorage";

export default function Index() {

  const [count, setCount] = useAsyncStorage("clickCounter", 0)

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello world</Text>
      
        <Footer>
          <MyButton count={count} onClick={handleClick} />
          <MyButton count={count} onClick={handleClick} />
          <MyButton count={count} onClick={handleClick} />
        </Footer>

        <Button
          title="Проверить хранилище"
          onPress={async () => {
            const value = await AsyncStorage.getItem('clickCounter');
            console.log('Текущее значение в AsyncStorage:', value);
          }}
        />

      </View>

  );
}