export default function List(params) {
    const {content, Item} = params

    return(
        <>
        {content.map((data, index) => {
            return (
                <Item index={index} content={data}/>
            )
        })}
        </>
    )
}