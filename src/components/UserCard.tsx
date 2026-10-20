const UserCard = ({user}) => {
    const {firstName, lastName, about, age, gender, photoUrl} = user;
    return (
        <>
            <div className="card bg-base-300 w-80 shadow-sm">
                <figure className="py-2">
                    <img
                        className="w-40 h-40 rounded-2xl"
                        src={photoUrl}
                        alt="Profile Pic" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{ firstName +" "+lastName }</h2>
                    <h4 className="card-title">{ about }</h4>
                    { age && gender && (<p>{age + " ," + gender}</p>)}
                    <div className="card-actions justify-end">
                        <button className="btn btn-secondary">Ignore</button>
                        <button className="btn btn-primary">Interested</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserCard;