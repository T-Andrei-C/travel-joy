import {useEffect} from "react";

const Alert = ({alertData, alertCallBack}) => {

    const removeAlert = (i) => {
        const alerts = [...alertData];
        alerts.splice(i, 1);
        alertCallBack(alerts);
    }

    const timeoutRef = { current: null };

    useEffect(() => {
        if (alertData.length > 0) {
            timeoutRef.current = setTimeout(() => {
                removeAlert(0);
            }, 4000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [alertData, alertCallBack]);

    return (
        <div className="position-fixed bottom-0 col-xl-4 col-lg-6 col-md-8 col-8">
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