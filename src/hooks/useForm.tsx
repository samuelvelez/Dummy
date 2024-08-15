import { useState } from 'react'

export const useForm = <T extends Record<string, unknown>>(initState: T) => {
    const [state, setState] = useState(initState)

    const onChange = (value: unknown, field: keyof T) => {
        setState({
            ...state,
            [field]: value
        })
    }

    return {
        ...state,
        form: state,
        onChange
    }
}
