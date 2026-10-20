const UserCard = ({user}) => {
    const {firstName, about, age, gender, photoUrl} = user;
    return (
        <>
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure className="py-2">
                    <img
                        className="w-10 h-10 rounded-2xl"
                        src={photoUrl}
                        alt="Profile Pic" />
                </figure>
                <div className="card-body items-center">
                    <h2 className="card-title">{ firstName }</h2>
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