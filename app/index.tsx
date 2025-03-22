import {useState} from "react";
import { Text, View } from "react-native";
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage';



import MyButton from "@/components/myButton";

export default function Index() {

  const StyledHeader = styled.View`
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: row;
  `

  const [count, setCount] = useState(0);

  const storeData = async (value : string) => {
    try {
      await AsyncStorage.setItem('counter', value)
    } catch (e) {
      console.log(e)
    }
  }
  

  function HandleClick() {
    setCount(count + 1);
    storeData(JSON.stringify(count))
  }




  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('counter')
      if (value !== null) {
        setCount(JSON.parse(value))
      }
    } catch (e) {
      console.log(" error getting counter in DATA")
    }
  }



  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Click clack</Text>

        <StyledHeader>
          <MyButton count={count} onClick={HandleClick} />
          <MyButton count={count} onClick={HandleClick} />
          <MyButton count={count} onClick={HandleClick} />
        </StyledHeader>

      </View>
      
  );
}
