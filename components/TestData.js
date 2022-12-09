export function TestData() {
    const response = await axios.get('api/test')
    const test = async () =>{return JSON.stringify(response)}
    return (
        <>
            <div>{test}</div>
            <input type={submit}></input>
        </>
    )
}
