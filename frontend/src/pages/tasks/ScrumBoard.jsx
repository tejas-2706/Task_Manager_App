import React, { Fragment, useEffect } from 'react'
import { useLoadingStore, useTaskListStore, useUserStore } from '../../store/useUserStore';
import { ScrumBoardOptions } from '../../config';
import CommonCard from '../../components/CommonCard'
import { getAllTasksApi, updateTaskApi } from '../../services';

function ScrumBoard() {
  const user = useUserStore(state => state.user);
  const taskList = useTaskListStore(state => state.taskList);
  const setTaskList = useTaskListStore(state => state.setTaskList);
  const setLoading = useLoadingStore(state => state.setLoading);

  async function fetchListOfTask() {
    setLoading(true);
    const response = await getAllTasksApi(user?._id);
    setTaskList(response?.taskList);
    setLoading(false);
  }
  useEffect(()=>{
    if (!user?._id) return;
    fetchListOfTask();
  },[user?._id])

  function onDragStart(event , getTaskId){
    event.dataTransfer.setData('id',getTaskId);
    // console.log(event.dataTransfer);
  }

  async function updateTaskByStatus(getTask) {
    console.log(getTask);
    // const {_id: taskId, ...getTask} = getTask;
    // console.log(getTask);

    await updateTaskApi(getTask);
    
    await fetchListOfTask();
  }


  function onDrop(event, getCurrnStatus){
    const getDraggedTaskId = event.dataTransfer.getData('id');

    let findCurrnTask = taskList.find(item => item._id.toString() === getDraggedTaskId);

    findCurrnTask = {
      ...findCurrnTask,
      status: getCurrnStatus
    }

    updateTaskByStatus(findCurrnTask);
  }

  function renderTodoByStatus(){
    const taskStatus = {
      todo : [],
      inProgress: [],
      blocked: [],
      review: [],
      done: []
    }

    taskList.forEach(taskItem => {
      taskStatus[taskItem.status].push(
        <div
        onDragStart={taskItem.status !== 'done'? (event)=> onDragStart(event, taskItem._id): null}
        draggable={taskItem?.status !== 'done'? true : false}
        >
          <CommonCard 
          title={taskItem?.title}
          description={ScrumBoardOptions.map(boardOptions => boardOptions.id == taskItem?.status ? boardOptions.label : null)}
          extraTitleStyles={taskItem?.status === 'done'? 'line-through text-green-400':''}
          headerRightContent={taskItem?.priority}
          rightContenStyles={`${taskItem?.priority === 'high' ? `text-red-500` : taskItem?.priority === 'medium' ? `text-green-500`: `text-yellow-500`} underline `}
          />
        </div>
      )
    });

    return taskStatus
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 h-full">
        {ScrumBoardOptions.map((item) => (
          <div
            className="border border-black rounded-lg overflow-auto"
            key={item.id}
            onDrop={(event) => onDrop(event, item.id)}
            onDragOver={(event) => event.preventDefault()}
          >
            <div className="px-1 py-3 text-center bg-black border-none mb-3">
              <h3 className="text-2xl font-extrabold text-white">
                {item.label}
              </h3>
            </div>
            <div className='p-3'>{renderTodoByStatus()[item.id]}</div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default ScrumBoard