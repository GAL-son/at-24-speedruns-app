export default function List(params) {
    const {content, Item} = params

    return(
        <>
        {content.map(data => {
            return (
                <Item content={data}/>
            )
        })}
        </>
    )
}