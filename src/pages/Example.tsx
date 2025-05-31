import React, { useState } from 'react'
import { queryClient } from '../App';
import { QueriesObserver, QueryClientProvider } from '@tanstack/react-query';

function debounce(fn, delay){
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    }
}

function throttle(func, limit) {
    let lastCall = 0;
    return function(...args){
        const now = new Date().getTime();
        if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
        }
    }
}

const Example = () => {
    const [ inputValue, setInputValue ] = useState('');
    const fetch = (QueryClientProvider) => {
        log
    }

    return (
        <div>

        </div>
    )
}

export default Example
