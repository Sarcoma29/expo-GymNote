import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StatusBar , Text } from 'react-native';


import Footer from '@/components/Footer';
import WeekList from '@/components/WeekList';
import WeekContainer from '@/components/WeekContainer'
import useAsyncStorage from '@/hooks/useAsyncStorage';
import React, {useEffect} from 'react';

useEffect(() => {
  StatusBar.setHidden(true);
  return () => StatusBar.setHidden(false);
}, []);

// Type definitions
type RootStackParamList = {
  HomeTabs: undefined;
  SecondScreen: undefined;
  ThirdScreen: undefined;
};

function WeekScreenBase() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
      <WeekContainer />
    </View>
  );
}

// Stack Navigator //
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 64 },
        headerShown: false
      }}
  >
      <Tab.Screen name="Home">
        {() => <TabContent storageKey="home_data" />}
      </Tab.Screen>
      <Tab.Screen name="Second">
        {() => <TabContent storageKey="second_data" />}
      </Tab.Screen>
      <Tab.Screen name="Third">
        {() => <TabContent storageKey="third_data" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function TabContent({ storageKey }: {storageKey:string}) {
  return (
    <View style={{ flex: 1 }}>
      <WeekList storageKey={storageKey} />
    </View>
  );
}

export default function App() {
  
  return (
    <>
      <StatusBar
        backgroundColor="#ffffff" // Android
        barStyle="dark-content"   // iOS: 'dark-content' | 'light-content'
        translucent={true}       // Полупрозрачный фон (Android)
        animated={true}         // Анимированные изменения
      />
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainTabs}
          options={{
            headerShown: false,
          }}
          
        />
        <Stack.Screen  name="WeekDetails" component={WeekScreenBase}  />
      </Stack.Navigator>
    </>
      
  );
}

