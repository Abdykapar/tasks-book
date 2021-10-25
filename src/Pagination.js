import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, nextPage, prevPage } from './features/tasks/tasksSlice';

const TOTAL_DATA_PER_PAGE = 3

export const Pagination = () => {
    const dispatch = useDispatch()
    const page = useSelector(s => s.tasks.page)
    const total = useSelector(s => s.tasks.total)
    const sort_field = useSelector(s => s.tasks.sortField)
    const sort_direction = useSelector(s => s.tasks.sortType)
    
    const onPageChange = (direction) => {
        if (direction === 'next') {
          dispatch(nextPage())
          dispatch(fetchTasks({ page: page + 1, sort_field, sort_direction }))
        } else {
          dispatch(prevPage())
          dispatch(fetchTasks({ page: page - 1, sort_field, sort_direction }))
        }
      }
      const isNextDisabled = () => {
        return Math.ceil(total / TOTAL_DATA_PER_PAGE) <= page
      }
    return (
        <div className="pagination">
            <button onClick={() => onPageChange('prev')} disabled={page <= 1} className="pagination__btn">Предыдущий</button>
            <button onClick={() => onPageChange('next')} disabled={isNextDisabled()} className="pagination__btn">Следующий</button>
        </div>
    )
}