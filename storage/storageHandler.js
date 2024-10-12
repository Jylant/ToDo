import AsyncStorage from '@react-native-async-storage/async-storage';

const storageHandler = {
    async getToDoList() {
        const jsonValue = await AsyncStorage.getItem('todoList');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    },
    async saveToDoList(todoList) {
        const jsonValue = JSON.stringify(todoList);
        await AsyncStorage.setItem('todoList', jsonValue);
    },
    async removeToDoItem(taskId) {
        const todoList = await this.getToDoList();
        const updatedList = todoList.filter(task => task.id !== taskId);
        await this.saveToDoList(updatedList);
    }
};

export default storageHandler;