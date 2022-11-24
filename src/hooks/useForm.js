import { useState } from 'react';
import Validator from './validator';

export default function useForm({initial, rules, onSubmit, messages, prepare = (a) => a}) {
    const [errors, setErrors] = useState(new Map());
    const [data, setData] = useState(initial);


    const handleInput = ({ target }) => {
        const { name, value, type } = target;
        if(type === "date") {
            setData(d => ({ ...d, [name]: Date(value) }));
        } else if(type === "checkbox") {
            setData(d => ({ ...d, [name]: Boolean(value) }));
        } else {
            setData(d => ({ ...d, [name]: value }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const prepareData = prepare(data);
        const validate = Validator.make(prepareData, rules, messages);
        setErrors(() => validate);
        if(validate.size === 0) {
            onSubmit(prepareData);
        }
    }

    return {
        handleInput,
        handleSubmit,
        errors,
        data
    }
}