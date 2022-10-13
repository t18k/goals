import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

export const GoalForm = () => {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createGoal({ text }))
        setText('')
    }
    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goals</label>
                    <input
                        type="text"
                        id="text"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-block">
                    Add Goal
                </button>
            </form>
        </section>
    )
}
