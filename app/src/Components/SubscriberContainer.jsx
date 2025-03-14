import {useSubs} from "../Context/SubscribersContext.jsx";
import SubscriberItem from "./SubscriberItem.jsx";
import axios from "axios";
export default function SubscriberContainer() {
    const {subs, setSubs} = useSubs();
    const deleteSub = async (email) => {
        try{
            const request = axios.delete(
                `http://localhost:3000/api/subscribers/delete`,
                {
                    data: {EmailAddress: email}
                }
            );
            setSubs(subs.filter(sub => sub.EmailAddress !== email));
            const response = await request;
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={"flex flex-col g-2 p-2 w-70 h-full"}>
            {
                subs.forEach((sub) => (
                        <SubscriberItem email={sub.EmailAddress} name={sub.Name} deleteSubscriber={deleteSub}  />
                    )
                )
            }
        </div>
    )
}