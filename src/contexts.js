import React from 'react';

export const LocaleContext = React.createContext({
    locales: ['en-US'],
    currencyOptions: {
        style: 'currency', currency: 'USD'
    }
})
