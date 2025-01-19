import React, {useEffect, useState} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {markTaskCompleted, TaskDelete, viewAllTodo} from '../action/todo';
import {deleteTodo, markCompleted, replaceTodos} from '../store/todoSlice';

const TaskListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const uid = useSelector(state => state.user?.user?.uid);
  const tasks = useSelector(state => state.todo.todo);

  const markAsCompleted = async id => {
    try {
      const response = await markTaskCompleted(id);
      console.log(response, 'response.....');
      dispatch(markCompleted(id));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async id => {
    try {
      const response = await TaskDelete(id);
      console.log(response, 'response.....');
      dispatch(deleteTodo(id));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = id => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: deleteHandler.bind(null, id),
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

  useEffect(() => {
    viewAllTodo(uid)
      .then(res => {
        dispatch(replaceTodos(res));
        console.log(res, 'res.....');
      })
      .catch(e => {
        console.log(e, 'error');
      });
  }, []);

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
            onPress={() => markAsCompleted(item._id)}>
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item._id)}>
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
          keyExtractor={item => item._id}
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
