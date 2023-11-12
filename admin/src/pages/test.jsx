import React from 'react'
import { useParams } from 'react-router-dom'

const TestTemplate = () => {
    const { token } = useParams()
    return (
        <div>{token}</div>
    )
}

export default TestTemplate