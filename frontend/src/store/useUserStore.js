import {create} from 'zustand'

const useUserStore = create((set) => ({
    user : null,
    setUser: (user) => set({user}),
}))

const useTaskFormDataStore = create((set) => ({
  taskFormData: null,
  setTaskFormData: (formData) => set({ taskFormData: formData }),
}));

const useLoadingStore = create((set) => ({
  loading: false,
  setLoading: (value) => set({loading: value})
}));

const useTaskListStore = create((set) => ({
  taskList: [],
  setTaskList: (newTaskList) => set({taskList: newTaskList}),
}))

const useCurrEditIdStore = create((set) => ({
    currnEditId : null,
    setCurrnEditId: (id) => set({currnEditId:id}),
}))

export {useUserStore,useTaskFormDataStore,useLoadingStore,useTaskListStore,useCurrEditIdStore}