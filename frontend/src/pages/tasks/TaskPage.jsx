import { Fragment } from 'react'
import AddNewTask from './AddNewTask';
import { useCurrEditIdStore, useLoadingStore, useTaskListStore, useUserStore } from '../../store/useUserStore';
import { useEffect } from 'react';
import { addNewTaskApi, deleteTaskAPi, getAllTasksApi, updateTaskApi } from '../../services';
import { toast } from "sonner"
import { useForm } from 'react-hook-form';
import TaskItem from './TaskItem';
import { useState } from 'react';
import { Skeleton } from "../../components/ui/skeleton"
function TaskPage() {
  const setLoading = useLoadingStore(state => state.setLoading);
  const taskList = useTaskListStore(state => state.taskList);
  const setTaskList = useTaskListStore(state => state.setTaskList);
  const user = useUserStore(state => state.user);
  const currnEditId = useCurrEditIdStore(state => state.currnEditId);
  const setCurrnEditId = useCurrEditIdStore(state => state.setCurrnEditId);
  const [showDialog, setShowDialog] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const defaultFormValues = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: '',
      status: ''
    }
  });

  async function fetchListOfTask() {
    setFetchLoading(true);
    try {
      if (!user?._id) {
        console.log("User Id Not available");
        return;
      } else {
        setLoading(true);
        const response = await getAllTasksApi(user?._id);
        setTaskList(response?.taskList);
        setLoading(false);
      }
    } catch (error) {
      console.log('Something wrong', error);
      toast.error("Something Went Wrong !! Please try again !!", {
        description: `${error.response.data.message} at ${new Date().toLocaleString('en-In')}`,
        style: { backgroundColor: 'gray' }
      });
    }
    setFetchLoading(false);
  }

  async function handleAddTask(getData) {
    setLoading(true);

    try {
      const response = currnEditId !== null ?
        await updateTaskApi({
          ...getData,
          _id: currnEditId
        }) :
        await addNewTaskApi({
          ...getData,
          userId: user?._id
        });
      if (response) {
        fetchListOfTask();
        setShowDialog(false);
        defaultFormValues.reset();
        if (currnEditId !== null) {
          toast.success("Task Updated Successfully !!", {
            description: `Task Updated at ${new Date().toLocaleString('en-In')}`,
            style: { backgroundColor: 'green' }
          })
        } else {
          toast.success("Task Created Successfully !!", {
            description: `Task Created at ${new Date().toLocaleString('en-In')}`,
            style: { backgroundColor: 'green' }
          })
        }
        setCurrnEditId(null);
      } else {
        toast.error("Something Went Wrong !!", {
          description: `Something Went Wrong at ${new Date().toLocaleString('en-In')} Please Try Again`,
          style: { backgroundColor: 'red' }
        })
      }

    } catch (error) {
      console.log('Something wrong', error);
      toast.error("Something Went Wrong !! Please try again !!", {
        description: `${error.response.data.message} at ${new Date().toLocaleString('en-In')}`,
        style: { backgroundColor: 'red' }
      });
    }

    setLoading(false);
  }
  async function handleDeleteTask(getTaskId) {
    setLoading(true);
    try {
      const response = await deleteTaskAPi(getTaskId);
      if (response?.success) {
        fetchListOfTask();
        toast.success("Task Deleted Successfully !!", {
          description: `Task Deleted at ${new Date().toLocaleString('en-In')}`,
          style: { backgroundColor: 'green' }
        })
      }
    } catch (error) {
      console.log('Something wrong', error);
      toast.error("Something Went Wrong !! Please try again !!", {
        description: `${error.response.data.message} at ${new Date().toLocaleString('en-In')}`,
        style: { backgroundColor: 'red' }
      });
    }
    setLoading(false);
  }
  useEffect(() => {
    if (!user?._id) return;
    fetchListOfTask();
  }, [user?._id])
  console.log(taskList);

  return (
    <Fragment>
      <div className='mt-5 flex flex-col'>
        {fetchLoading ?
          <div >
            <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
              <Skeleton className={'h-[125px] rounded-xl bg-gray-200'} />
              <Skeleton className={'h-[125px] rounded-xl bg-gray-200'} />
              <Skeleton className={'h-[125px] rounded-xl bg-gray-200'} />
              <Skeleton className={'h-[125px] rounded-xl bg-gray-200'} />
            </div>
          </div>
          :
          <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
            {taskList?.length > 0 ?
              taskList.map((taskItem) => (
                <TaskItem
                  item={taskItem}
                  handleDeleteTask={handleDeleteTask}
                  setShowDialog={setShowDialog}
                  taskFormData={defaultFormValues}
                />
              )
              ) : <div>No Tasks Added Yet !!! </div>
            }
          </div>
        }
      </div>
      <div className='py-4 '>
        <AddNewTask
          handleSubmit={defaultFormValues.handleSubmit(handleAddTask)}
          defaultFormValues={defaultFormValues}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </div>
    </Fragment>
  )
}

export default TaskPage