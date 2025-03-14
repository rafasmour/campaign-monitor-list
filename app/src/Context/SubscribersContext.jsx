import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const subsContext = createContext(undefined);

export const SubsProvider = ({children}) => {
    const [subs, setSubs] = useState([]);
    useEffect(() => {
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
        fetchSubs();
    }, [])

    return (
        <subsContext.Provider value={{subs, setSubs}}>
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
