import React from 'react';
import { useSubs } from "../Context/SubscribersContext.jsx";
import {FaTrashCan} from "react-icons/fa6";

export default function SubscriberItem({ email, name}) {
    const { deleteSub } = useSubs();
    return (
        <section className="grid grid-cols-12 min-w-screen py-1">
            <span className={"col-span-6 text-sm truncate "}>{email}</span>
            <name className={"col-span-5 text-sm truncate "}>{name}</name>
            <button className={"col-span-1 text-sm"} onClick={() => deleteSub(email)}><FaTrashCan /></button>
        </section>
    )
}