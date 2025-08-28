const NotificationMsg=({ message, isError }) => {
    if (message === null || message === '') {
        return null
    }
    else{
        
        return (
            <div className={isError ? 'error' : 'notification'}>
                {message}
            </div>
        )
    }
}
export default NotificationMsg;