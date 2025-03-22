import {useState, useEffect} from "react";
import { Text, View, Button } from "react-native";
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage';



import MyButton from "@/components/myButton";

const StyledHeader = styled.View`
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: row;
  `

export default function Index() {

  const [count, setCount] = useState(0);



  useEffect(() => {
    const getData = async () => {
      try {
        let value = await AsyncStorage.getItem('myAppCounter')
        if (value !== null) {
          setCount(JSON.parse(value))
          console.log("данные получены")
        }
      } catch (e) {
        console.log(" error getting counter in DATA", e)
      }  
    }
    getData()
  }, [])

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('myAppCounter', JSON.stringify(count))
        console.log("данные записаны")
      } catch (e) {
        console.log("error setter counter in DATA", e)
      }
    };
    storeData()
  }, [count]);

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
      <Text>Click clack test million ready</Text>

        <StyledHeader>
          <MyButton count={count} onClick={handleClick} />
          <MyButton count={count} onClick={handleClick} />
          <MyButton count={count} onClick={handleClick} />
        </StyledHeader>

        <Button
          title="Проверить хранилище"
          onPress={async () => {
            const value = await AsyncStorage.getItem('counter');
            console.log('Текущее значение в хранилище:', value);
          }}
        />

      </View>


      
  );
}