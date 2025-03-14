import React, {useState} from 'react';
import {useSubs} from "../Context/SubscribersContext.jsx";
import validator from 'email-validator';
export default function SubscriberForm() {
    const { addSub } = useSubs();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const submitForm = (e) => {
        e.preventDefault();
        const isEmailValid = validator.validate(email);
        if(!isEmailValid){
            alert("Enter valid e-mail address!");
            throw new Error("Email address is not valid");
        }
        if(name === ""){
            alert("Name cannot be empty!")
            throw new Error("Name cannot be empty");
        }
        try{
            addSub({EmailAddress: email, Name: name});
        } catch (error) {
            console.log(error);
        }

        setEmail('')
        setName('')

    }
    return (
        <form className={"flex flex-col gap-4 p-2 w-full min-h-fit"}>
            <legend className={"text-3xl font-bold text-center"}>Subscriber    <a className="text-green-700">List</a></legend>
            <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-1 border-2 rounded-sm bg-indigo-950 border-sky-900 text-white text-md focus:ring-2 focus:ring-sky-700 focus:border-transparent focus:outline-none"
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-1 border-2 rounded-sm bg-indigo-950 border-sky-900 text-white text-md focus:ring-2 focus:ring-sky-700 focus:border-transparent focus:outline-none "
            />
            <button
                className="p-1.5 font-bold text-md bg-indigo-950 rounded-md
                 text-whiterounded-md w-32 self-center border-2 border-sky-900 focus:ring-2 focus:ring-sky-700 focus:border-transparent focus:outline-none active:bg-sky-700"
                type="submit"
                onClick={(e) => {
                submitForm(e);
            }}>Subscribe</button>

        </form>
    )
}