const Alert = ({alertData, alertCallBack}) => {
    const removeAlert = (i) => {
        const alerts = [...alertData];
        alerts.splice(i, 1);
        alertCallBack(alerts);
    }

    return (
        <div className="position-fixed bottom-0 col-xl-4 col-lg-6 col-md-8 col-9">
            {
                alertData?.map((alert, i) => (
                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} key={i}>
                        <strong>{alert.content}</strong>
                        <button type="button" className="btn-close" onClick={() => removeAlert(i)}></button>
                    </div>
                ))
            }
        </div>
    )
}

export default Alert;