import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { login } from '../../api/service';
import { toast } from 'react-toastify';
import { setToken } from './loginSlice';

export const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        login(data).then(res => {
            dispatch(setToken(res.token))
            history.push('/')
        }).catch(err => {
            toast.error(err[Object.keys(err)[0]])
        })
    }
    return (
        <form className="login" onSubmit={handleSubmit(onSubmit)}>
            <label>
                имя пользователя
                <input {...register('username', { required: "Пожалуйста, введите свое имя пользователя." })} type="text"></input>
                <span className="error">{ errors.username?.message }</span>
            </label>
            <label>
                пароль
                <input {...register('password', { required: "Пожалуйста, введите пароль." })} type="password"></input>
                <span className="error">{ errors.password?.message }</span>
            </label>
            <button type="submit">вход</button>
        </form>
    )
}