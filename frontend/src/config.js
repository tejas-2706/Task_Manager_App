export const Backend_Url = 'http://localhost:3000/api'

export const SignupFormControls = [
    {
        id : 'name',
        label : 'Name',
        placeholder : 'Enter your Name',
        componentType : 'input',
        type : 'text'
    },
    {
        id : 'email',
        label : 'Email',
        placeholder : 'Enter your Email',
        componentType : 'input',
        type : 'email'
    },
    {
        id : 'password',
        label : 'Password',
        placeholder : 'Enter your Password',
        componentType : 'input',
        type : 'password'
    }
];



export const SigninFormControls = [
    {
        id : 'email',
        label : 'Email',
        placeholder : 'Enter your Email',
        componentType : 'input',
        type : 'email'
    },
    {
        id : 'password',
        label : 'Password',
        placeholder : 'Enter your Password',
        componentType : 'input',
        type : 'password'
    }
];
export const ScrumBoardOptions = [
    {
        id: 'todo',
        label: "To Do"
    },
    {
        id: 'inProgress',
        label: "In Progress"
    },
    {
        id: 'review',
        label: "In Review"
    },
    {
        id: 'blocked',
        label: "Blocked"
    },
    {
        id: 'done',
        label: "Done"
    },
];


export const AddTaskControls = [
    {
        id : 'title',
        label: 'Add a task',
        placeholder: 'Enter your task Name',
        componentType: 'input',
        type : 'text'
    },
    {
        id : 'description',
        label: 'Add a description',
        placeholder: 'Enter your task Description',
        componentType: 'input',
        type : 'textarea'
    },
    {
        id : 'status',
        label: 'Add Status',
        placeholder: 'Enter Status of Your Task',
        componentType: 'select',
        options: ScrumBoardOptions,
    },
    {
        id : 'priority',
        label: 'Add Priority',
        placeholder: 'Enter your task Priority',
        componentType: 'input',
        componentType: 'select',
        options: [
            {
                id: 'low',
                label: 'Low'
            },
            {
                id: 'medium',
                label: 'Medium'
            },
            {
                id: 'high',
                label: 'High'
            },
        ]
    },
]

