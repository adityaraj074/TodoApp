import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

const AddTaskScreen = ({navigation, route}) => {
  const uid = useSelector(state => state.user.user.uid);
  console.log(uid, 'uid');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const handleAddTask = () => {
    if (title && description && deadline && priority) {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        deadline,
        priority,
        completed: false,
      };

      // Navigate back to TaskListScreen and pass the new task data
      navigation.navigate('TaskList', {newTask});
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Deadline (e.g., YYYY-MM-DD)"
        value={deadline}
        onChangeText={setDeadline}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Priority (Low, Medium, High)"
        value={priority}
        onChangeText={setPriority}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
