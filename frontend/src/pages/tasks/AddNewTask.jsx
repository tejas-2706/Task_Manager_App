import React, { useEffect } from 'react'
import CommonDialog from '../../components/CommonDialog'
import { AddTaskControls } from '../../config'
import { useCurrEditIdStore, useLoadingStore, useTaskFormDataStore, useUserStore } from '../../store/useUserStore'
import { LoaderCircle } from 'lucide-react';
function AddNewTask({ handleSubmit, defaultFormValues, showDialog, setShowDialog }) {
    const { setTaskFormData } = useTaskFormDataStore();
    const currnEditId = useCurrEditIdStore(state => state.currnEditId);
    const setCurrnEditId = useCurrEditIdStore(state => state.setCurrnEditId);
    const loading = useLoadingStore(state => state.loading);
    useEffect(() => {
        setTaskFormData(defaultFormValues);
    }, [setTaskFormData])

    return (
        <CommonDialog
            formControls={AddTaskControls}
            title={currnEditId !== null ? 'Edit Task' : 'Add Task'}
            btnText={'Add New Task'}
            SubmitbtnText={loading ? <LoaderCircle className="animate-spin size-6 text-white mx-2" /> : currnEditId !== null ? 'Update Task' : 'Add Task'}
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