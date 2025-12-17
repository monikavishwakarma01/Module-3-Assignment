
function MessageCard(prop){

    return(
        <div className="div1">
            <h2>{prop.title}</h2>
            <p>{prop.message}</p>
        </div>
    )
}

export default MessageCard;