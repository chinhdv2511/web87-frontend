import React from "react";

const NotificationContext = React.createContext({
    notifySuccess: (title, description) => { },
    notifyError: (title, description) => { }
});

export default NotificationContext;