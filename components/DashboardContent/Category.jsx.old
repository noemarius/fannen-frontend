import { useCallback, useEffect, useState } from 'react'
import axios from '@/lib/axios'

async function getCategoriesAndLocations() {
    const resp = await axios.get('api/locsandcategs')
    return resp
}

function validArray(input) {
    if (!Array.isArray(input)) {
        return [input]
    } else {
        return input
    }
}

export default function Category() {
    const [categAndLoc, setCategAndLoc] = useState([])

    useEffect(() => {
        getCategoriesAndLocations().then(result => setCategAndLoc(result.data))
    }, [])

    return <>{console.log(categAndLoc)}</>
    /* (
        <>
            <ul>
                {categoryList.map(tree => {
                    return <TreeNode node={tree} />
                })}
            </ul>
        </>
    ) */
}

const TreeNode = ({ node }) => {
    const [childVisibility, setChildVisibility] = useState(false)
    const hasChild = node.children ? true : false
    return (
        <li>
            <div onClick={e => setChildVisibility(v => !v)}>
                {hasChild && (
                    <div className={`${childVisibility ? 'active' : ''}`}></div>
                )}
                <div>{node.label}</div>
            </div>
            {hasChild && childVisibility && (
                <div>
                    <ul></ul>
                </div>
            )}
        </li>
    )
}
