import {useEffect, useState} from 'react';

const DebouncedValue = (inputValue: string, delay:number) => 
{
    const [debouncedValue, setDebouncedValue] = useState<string>(inputValue);

    useEffect(() =>
    {
        const handler = setTimeout(() => { setDebouncedValue(inputValue) }, delay);
        
        return () => { clearTimeout(handler) }
    }, [inputValue, delay]);
    
    return debouncedValue;
}

export default DebouncedValue;