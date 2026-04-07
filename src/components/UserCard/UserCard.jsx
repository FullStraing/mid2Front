import './UserCard.css';

function UserCard({ user }) {
  return (
    <article className="user-card">
      <div className="user-card__image-wrapper">
        <img
          className="user-card__image"
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
        />
      </div>
      <div className="user-card__content">
        <h2 className="user-card__name">
          {user.firstName} {user.lastName}
        </h2>
        <p className="user-card__text">Age: {user.age}</p>
        <p className="user-card__text">{user.email}</p>
        <p className="user-card__text">Username: {user.username}</p>
        <p className="user-card__text">Phone: {user.phone}</p>
      </div>
    </article>
  );
}

export default UserCard
