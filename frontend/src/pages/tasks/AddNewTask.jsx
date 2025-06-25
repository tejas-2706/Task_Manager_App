import React, { useEffect } from 'react'
import CommonDialog from '../../components/CommonDialog'
import { AddTaskControls } from '../../config'
import { useCurrEditIdStore, useTaskFormDataStore, useUserStore } from '../../store/useUserStore'
function AddNewTask({ handleSubmit, defaultFormValues, showDialog, setShowDialog }) {
    const { setTaskFormData } = useTaskFormDataStore();
    const currnEditId = useCurrEditIdStore(state => state.currnEditId);
    const setCurrnEditId = useCurrEditIdStore(state => state.setCurrnEditId);
    useEffect(() => {
        setTaskFormData(defaultFormValues);
    }, [setTaskFormData])

    return (
        <CommonDialog
            formControls={AddTaskControls}
            title={currnEditId !== null ? 'Edit Task' : 'Add Task'}
            btnText={'Add New Task'}
            SubmitbtnText={currnEditId !== null ? 'Update Task' : 'Add Task'}
            handleSubmit={handleSubmit}
            FormData={defaultFormValues}
            open={showDialog}
            setOpen={(open) => {
                setShowDialog(open);
                if (currnEditId !== null){
                    defaultFormValues.reset()
                    setCurrnEditId(null);
                }
            }}
        />
    )
}

export default AddNewTask