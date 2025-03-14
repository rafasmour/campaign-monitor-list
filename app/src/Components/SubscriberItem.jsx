export default function SubscriberItem({ email, name, deleteSubscriber}) {
    return (
        <section className={"flex flex-row justify-between items-center p-2 w-10 h-10"}>
            <span>{{email}}</span>
            <name>{{name}}</name>
            <button onClick={() => deleteSubscriber(email)}>Del</button>
        </section>
    )
}