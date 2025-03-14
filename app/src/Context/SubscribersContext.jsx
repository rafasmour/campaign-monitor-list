import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const subsContext = createContext(undefined);

export const SubsProvider = ({children}) => {
    const [subs, setSubs] = useState([]);
    useEffect(() => {
        fetchSubs();
    }, []);

    const fetchSubs = async () => {
        try {
            const request = axios.get(`http://localhost:3000/api/subscribers`)
            const response = await request;
            const data = response.data;
            if(!data){
                throw new Error("No Subscribers Found");
            }
            console.log(data[0]);
            setSubs(data);
        } catch (error) {
            console.error(error);
        }
    }
    const deleteSub = (email) => {
        setSubs(subs.filter(sub => sub.EmailAddress !== email));
    }

    const addSub = (newSub) => {
        const duplicate = subs.some(sub => sub.EmailAddress === newSub.EmailAddress);
        if(duplicate){
            alert("Can't enter duplicate email!");
            throw new Error("Subscriber already exists");
        }
        setSubs([...subs, newSub]);
    }

    const saveSubs = async () => {
        try {
            const request = axios.post(`http://localhost:3000/api/subscribers/import`, {subscribers: subs});
            const response = await request;
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <subsContext.Provider value={{subs, setSubs, deleteSub, addSub, saveSubs }}>
            {children}
        </subsContext.Provider>
    )
}

export const useSubs = () => {
    const context = useContext(subsContext);
    if (!context) {
        throw new Error('useTheme must be used within a SubsContext');
    }
    return context;
}

