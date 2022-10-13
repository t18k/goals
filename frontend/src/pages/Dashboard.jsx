import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GoalForm } from '../components/GoalForm'
import { getGoals, reset } from '../features/goals/goalSlice'
import { GoalItems } from '../components/GoalItems'

export function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)
    const { goals, isError, isLoading, errorMessage } = useSelector(
        (state) => state.goals
    )

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        if (user) {
            dispatch(getGoals())
        }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate])

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm />

            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map((goal) => (
                            <GoalItems key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>You have no goals</h3>
                )}
            </section>
        </>
    )
}
