import React from 'react'
import CommonCard from '../../components/CommonCard'
import { Button } from '../../components/ui/button'
import { useCurrEditIdStore } from '../../store/useUserStore'
import { ScrumBoardOptions } from '../../config'

function TaskItem({item,handleDeleteTask,setShowDialog,taskFormData}) {
    const setCurrnEditId = useCurrEditIdStore(state => state.setCurrnEditId)
    return (
        <CommonCard
            title={item?.title}
            description={ScrumBoardOptions.map(boardOptions => boardOptions.id == item?.status ? boardOptions.label : null)}
            footer={
                <div className='flex justify-between items-center w-full'>
                    <Button onClick={()=> {
                        setShowDialog(true);
                        setCurrnEditId(item?._id);
                        taskFormData.setValue('title',item?.title)
                        taskFormData.setValue('description',item?.description)
                        taskFormData.setValue('status',item?.status)
                        taskFormData.setValue('priority',item?.priority)
                    }}>Edit</Button>
                    <Button onClick={()=>{handleDeleteTask(item?._id)}}>Delete</Button>
                </div>
            }
        />
    )
}

export default TaskItem