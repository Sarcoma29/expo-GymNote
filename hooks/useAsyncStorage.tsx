import { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAsyncStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const  getData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key)
        if (storedValue !== null){
          setValue(JSON.parse(storedValue));
          console.log("Данные получены:")
        }
      } catch (e) {
        console.log("Ошибка при получении данных", e)
      } finally {
        setIsLoading(false);
      }
  
    }
    getData();
  }, [key])

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log("Данные записаны:")
      } catch (e) {
        console.log("Ошибка при записи данных", e)
      }
    }
    storeData();
  }, [value])

  return [value, setValue] as const;
}

