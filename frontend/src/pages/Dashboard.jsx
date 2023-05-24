import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../component/GoalForm'
import { getGoals, reset } from '../features/goals/goalSlice'
import Spinner from '../component/Spinner'
import GoalItem from '../component/GoalItem'


function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isSuccess, isError, message } = useSelector((state) => state.goal)
  
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())
    
  },[navigate, user, isError, dispatch, message])

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
    <section className='heading'>
      <h1>Welcome { user && user.name }</h1>
      <p>Goals Dashboard</p>
    </section>
    <GoalForm/>
    <section className='content'>
      {goals.length > 0 ? (<div className='goals'>
        {goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal}/>
        ))}
      </div>) : (<h3>you are not set any goals</h3>)}
    </section>
    </>
  )
}

export default Dashboard