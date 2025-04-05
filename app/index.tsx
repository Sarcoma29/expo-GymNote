import 'react-native-gesture-handler';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StatusBar ,Text, Image } from 'react-native';

import WeekList from '@/components/WeekList';
import WeekContainer from '@/components/WeekContainer'
import useAsyncStorage from '@/hooks/useAsyncStorage';
import React, {useEffect} from 'react';

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
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 64 },
        headerStyle: { height: 80 },
        tabBarLabelPosition: 'beside-icon',
        tabBarIcon:  () => {
          let iconSource;
          
          if (route.name === 'Arm Day') {
            iconSource = require('@/assets/images/dumbbells.png');
          } else if (route.name === 'Back Day') {
            iconSource = require('@/assets/images/training.png');
          } else {
            iconSource = require('@/assets/images/weightlifting.png');
          }


          return (
            <Image
              source={iconSource}
              style={{width: 24, height: 24, marginBottom: -3}}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Arm Day" options={{headerTitle: "Arm Day"}}>
        {() => <TabContent storageKey="home_data" />}
      </Tab.Screen>
      <Tab.Screen name="Back Day" options={{headerTitle: "Back Day"}}>
        {() => <TabContent storageKey="second_data" />}
      </Tab.Screen>
      <Tab.Screen name="Leg Day" options={{headerTitle: "Leg Day"}}>
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
        <Stack.Screen  name="WeekDetails" component={WeekScreenBase} /> 
      </Stack.Navigator>
    </>
      
  );
}

