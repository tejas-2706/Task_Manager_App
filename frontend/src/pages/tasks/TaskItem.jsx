import React from 'react'
import CommonCard from '../../components/CommonCard'
import { Button } from '../../components/ui/button'
import { useCurrEditIdStore, useLoadingStore } from '../../store/useUserStore'
import { ScrumBoardOptions } from '../../config'

function TaskItem({item,handleDeleteTask,setShowDialog,taskFormData}) {
    const setCurrnEditId = useCurrEditIdStore(state => state.setCurrnEditId);
    const loading = useLoadingStore(state => state.loading);
    return (
        <CommonCard
            title={item?.title}
            description={ScrumBoardOptions.map(boardOptions => boardOptions.id == item?.status ? boardOptions.label : null)}
            headerRightContent={item?.priority}
            rightContenStyles={`${item?.priority === 'high' ? `text-red-500` : item?.priority === 'medium' ? `text-green-500`: `text-yellow-500`} underline`}
            footer={
                <div className='flex justify-between items-center w-full'>
                    <Button size={'sm'} variant={'outline'}  
                    className={'font-bold'}
                    onClick={()=> {
                        setShowDialog(true);
                        setCurrnEditId(item?._id);
                        taskFormData.setValue('title',item?.title)
                        taskFormData.setValue('description',item?.description)
                        taskFormData.setValue('status',item?.status)
                        taskFormData.setValue('priority',item?.priority)
                    }}>Edit</Button>
                    <Button disabled={loading} variant={'default'} className={'font-bold'} size={'sm'} onClick={()=>{handleDeleteTask(item?._id)}}>
                        Delete
                    </Button>
                </div>
            }
        />
    )
}

export default TaskItem