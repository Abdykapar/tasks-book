import { useDispatch, useSelector} from "react-redux";
import { fetchTasks, setSortType, setSortField } from "./tasksSlice";
import { edit } from "../../api/service";
import { toast } from "react-toastify";
import { useState } from "react";
import cookie from 'js-cookie'
import { logout } from "../login/loginSlice";

export const TaskList = ({ tasks }) => {
    const dispatch = useDispatch()
    const page = useSelector(s => s.tasks.page)
    const sortType = useSelector(s => s.tasks.sortType)
    const sortField = useSelector(s => s.tasks.sortField)
    const token = useSelector(s => s.login.token)
    const [editId, setEditId] = useState(0)
    const [text, setText] = useState('')

    const onSort = (field) => {
      let type = sortType === 'desc' ? 'asc' : 'desc'
      dispatch(setSortField(field))
      dispatch(setSortType(type))
      dispatch(fetchTasks({page, sort_field: field, sort_direction: type}))
    }
    const getStatus = (status) => {
      switch (status) {
        case 1:
          return 'задача не выполнена, отредактирована админом';
        case 10:
          return 'задача выполнена'
        case 11:
          return 'задача отредактирована админом и выполнена'
        default:
          return 'задача не выполнена'
      }
    }
    const onCheck = (type, item) => {
      const cookieToken = cookie.get('token') ? JSON.parse(cookie.get('token')) : ''
      if (!cookieToken) {
        toast.info('Сначала войдите в систему')
        dispatch(logout())
        setEditId(0)
        return
      }
      if (type === 'status') {
        onStatusUpdate(item)
      } else onTextUpdate(item)
    }
    const onStatusUpdate = (item) => {
      const status = item.status === 0 ? 10 : item.status === 1 ? 11 : item.status
      const data = { text: item.text, status, token }
      onUpdate(data, item.id)
    }
    const onTextUpdate = (item) => {
      if (!text.length) {
        toast.error('Введите какой-нибудь текст.')
        return
      }
      const status = item.status === 0 ? 1 : item.status === 10 ? 11 : item.status
      const data = { text, status, token }
      onUpdate(data, item.id)
    }
    const onUpdate = (data, id) => {
      edit(id, data).then(_ => {
        toast.success('Успешно обновлен!')
        setEditId(0)
        dispatch(fetchTasks({page, sort_field: sortField, sort_direction: sortType}))
      }).catch(err => {
        toast.error(err[Object.keys(err)[0]])
      })
    }
    const onEdit = (i) => {
      setEditId(i.id)
      setText(i.text)
    }
    return (
        <table>
              <thead>
                <tr>
                  <th><button className="filter" onClick={() => onSort('username')}>имя пользователя</button></th>
                  <th><button className="filter" onClick={() => onSort('email')}>email</button></th>
                  <th><button className="filter" onClick={() => onSort('text')}>текст задачи</button></th>
                  <th><button className="filter" onClick={() => onSort('status')}>статус</button></th>
                  { token && <><th></th> <th></th></>}
                </tr>
              </thead>
              <tbody>
                { tasks.map(i => (
                  <tr key={i.id}>
                    <td>{i.username}</td>
                    <td>{i.email}</td>
                    <td>
                    {i.id === editId ? <textarea required onChange={(e) => setText(e.target.value)} value={text} rows="2"></textarea> : i.text}
                    </td>
                    <td>{getStatus(i.status)}</td>
                    { token && 
                      <>
                        <td>
                          <input type="checkbox" disabled={i.status >= 10} checked={i.status >= 10} onChange={() => onCheck('status', i)}></input>
                        </td>
                        <td>
                          { editId === i.id ? 
                            <button onClick={() => onCheck('text', i)} className="pen">Сохранить</button> :
                            <button onClick={() => onEdit(i)} className="pen">🖊️</button> }
                        </td>
                      </> 
                    }
                </tr>
                )) }
              </tbody>
            </table>
    )
}