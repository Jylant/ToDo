import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button,  FlatList, StyleSheet, Pressable } from 'react-native';
import MyList from '../components/list';
import storageHandler from '../storage/storageHandler';


const TodoListScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        storageHandler.getToDoList().then(setTasks);
    }, []);

    const addTask = () => {
        if (task.trim() === '') return;

        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title: task,
            done: false,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        storageHandler.saveToDoList(updatedTasks);
        setTask('');
    };

    const toggleTaskDone = (taskId) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
                task.id === taskId ? { ...task, done: !task.done } : task
            );
            storageHandler.saveToDoList(updatedTasks);
            return updatedTasks;
        });
    };

    const removeTask = (taskId) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter(task => task.id !== taskId);
            storageHandler.saveToDoList(updatedTasks);
            return updatedTasks;
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a task"
                value={task}
                onChangeText={setTask}
            />
            <Button title="Add Task" onPress={addTask} />
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                <View style={styles.task}>
                    <Pressable onPress={() => toggleTaskDone(item.id)}>
                        <Text style={item.done ? styles.done : styles.notDone}>{item.title}</Text>
                    </Pressable>
                    <Pressable onPress={() => removeTask(item.id)}>
                        <Text style={styles.remove}>Remove</Text>
                    </Pressable>
                </View>
            )}
            keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginTop: 10,
        minWidth: 300,
    },
    done: {
        textDecorationLine: 'line-through',
        color: '#666',
    },
    notDone: {
        textDecorationLine: 'none',
    },
    remove: {
        paddingLeft: 10,
        color: 'red',
    },
});

export default TodoListScreen;