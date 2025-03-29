import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

import Footer from '@/components/Footer';
import WeekList from '@/components/WeekList';
import WeekContainer from '@/components/WeekContainer'


// Type definitions
type RootStackParamList = {
  HomeTabs: undefined;
  SecondScreen: undefined;
  ThirdScreen: undefined;
};

// Screens
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <WeekList />
      <Footer />
      
    </View>
  );
}

function SecondScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SecondScreen Screen</Text>
      <WeekList />
      <Footer />
    </View>
  );
}

function ThirdScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ThirdScreen Screen</Text>
      <WeekList />
    </View>
  );
}

function WeekScreenBase() {
  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <WeekContainer />
      <WeekContainer />
    </View>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'white'
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Second" component={SecondScreen} />
      <Tab.Screen name="Third" component={ThirdScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator //
const Stack = createNativeStackNavigator();



console.log(Stack.Screen)

export default function App() {
  
  return (

      <Stack.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right' // Optional: adds nice transition
        }}
      >
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen name="ThirdScreen" component={ThirdScreen} />

        <Stack.Screen 
          name="WeekDetails" 
          component={WeekScreenBase} 
        />
      </Stack.Navigator>

  );
}

