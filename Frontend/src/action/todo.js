import axios from 'axios';
const servalUrl = 'http://192.168.1.7:3000/api/';

const addTask = async params => {
  try {
    const response = await axios.post(`${servalUrl}tasks/add`, params);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

const viewAllTodo = async id => {
  try {
    const response = await axios.get(`${servalUrl}tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

const TaskDelete = async id => {
  try {
    const response = await axios.delete(`${servalUrl}tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

const markTaskCompleted = async id => {
  try {
    const response = await axios.put(`${servalUrl}tasks/${id}/complete`);
    return response.data;
  } catch (error) {
    console.error('Error marking todo as completed:', error);
    throw error;
  }
};

export {addTask, viewAllTodo, TaskDelete, markTaskCompleted};
