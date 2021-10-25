import { TaskCreate } from './TaskCreate';
import { Pagination } from '../../Pagination';
import { TaskList } from './TaskList';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks } from './tasksSlice';
import { useEffect } from 'react';

export const Task = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(s => s.tasks.tasks)
    const postStatus = useSelector(s => s.tasks.status)
    
    useEffect(() => {
        if (postStatus === 'init') {
        dispatch(fetchTasks())
        }
    }, [postStatus, dispatch])
    return (
        <>
            <section className="task-list">
              <TaskList tasks={tasks} />
              <Pagination />
            </section>
            <section className="task-create">
              <TaskCreate />
            </section>
        </>
    )
}