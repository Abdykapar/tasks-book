import { useForm } from 'react-hook-form';
import { taskCreate } from '../../api/service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from './tasksSlice';

export const TaskCreate = () => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const page = useSelector(s => s.tasks.page)
    const sort_field = useSelector(s => s.tasks.sortField)
    const sort_direction = useSelector(s => s.tasks.sortType)

    const onSubmit = async (data) => {
        try {
          await taskCreate(data)
          toast.success('Успешно создан!')
          reset()
          dispatch(fetchTasks({page, sort_field, sort_direction}))
        } catch(err) {
          toast.error('Something went wrong!')
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                имя пользователя
                <input {...register('username', { required: "Пожалуйста, введите свое имя пользователя." })} type="text"></input>
                <span className="error">{ errors.username?.message }</span>
            </label>
            <label>
                email
                <input {...register('email', { 
                    required: "Введите свой адрес электронной почты.",
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Недействительный адрес электронной почты"
                    }
                })} type="text"></input>
                {errors.email?.message && <span className="error">{ errors.email?.message }</span>}
            </label>
            <label>
                текст задачи
                <textarea {...register('text', { required: "Введите какой-нибудь текст." })} rows="4"></textarea>
                <span className="error">{ errors.text?.message }</span>
            </label>
            <button type="submit">Сохранить задачу</button>
        </form>
    )
}