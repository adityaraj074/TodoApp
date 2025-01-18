import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles/TaskListStyle';
import auth from '@react-native-firebase/auth';

const TaskListScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Buy groceries',
      description: 'Milk, Bread, Eggs',
      completed: false,
      priority: 'High',
      deadline: '2025-01-20',
    },
    {
      id: '2',
      title: 'Complete report',
      description: 'Monthly sales report',
      completed: true,
      priority: 'Medium',
      deadline: '2025-01-18',
    },
    {
      id: '3',
      title: 'Complete project report',
      description: 'Finalize and submit the project report',
      completed: false,
      priority: 'Medium',
      deadline: '2025-01-18',
    },
  ]);

  const markAsCompleted = id => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, completed: true} : task,
      ),
    );
  };

  const deleteTask = id => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        },
      },
    ]);
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('LoginScreen');
      });
  };

  const handleAddTask = () => {
    navigation.navigate('AddTaskList');
  };

  const renderTask = ({item}) => (
    <ScrollView style={styles.taskItem}>
      <Text style={[styles.taskTitle, item.completed && styles.completed]}>
        {item.title}
      </Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      <Text style={styles.taskMeta}>
        Priority: {item.priority} | Deadline: {item.deadline}
      </Text>
      <View style={styles.actions}>
        {!item.completed && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => markAsCompleted(item.id)}>
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Task List</Text>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.taskList}
        />
      ) : (
        <Text style={styles.noTasksText}>
          No tasks available. Add some tasks!
        </Text>
      )}
      {/* Fixed Add Task Button */}
      <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
        <Text style={styles.addTaskButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskListScreen;
