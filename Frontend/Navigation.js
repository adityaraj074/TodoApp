import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import auth from '@react-native-firebase/auth';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setuser} from './src/store/userSlice';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const user = useSelector(state => state.user.user);

  const [initializing, setInitializing] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      dispatch(setuser(user));
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);

  if (initializing) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user?.uid ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TaskList" component={TaskListScreen} />
          <Stack.Screen name="AddTaskList" component={AddTaskScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
