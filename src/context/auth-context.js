import React from 'react';

const authContext = React.createContext(
    {
        // Initialzed here, even though though in our case
        // it will be set dynamically later,
        // in order to get better auto-completion from IDE, acccording to Max
        authenticated: false,
        login: () => {}
    }
);

export default authContext;