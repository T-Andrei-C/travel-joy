const Alert = ({content, color, callBack}) => {
    return (
        <div className={`alert alert-${color} alert-dismissible fade show position-fixed bottom-0`}
             style={{right: "1.5em", width: "40%"}} role="alert">
            <strong>{content}</strong>
            <button type="button" onClick={() => callBack(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default Alert;