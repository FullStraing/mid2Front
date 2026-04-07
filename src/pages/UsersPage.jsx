import { useMemo, useState } from 'react';
import UserCard from '../components/UserCard/UserCard';
import UserForm from '../components/UserForm/UserForm';
import { useUsers } from '../context/UserContext';
import useDebounce from '../hooks/useDebounce';
function UsersPage() {
  const { users, loading, error } = useUsers();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const filteredUsers = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();
    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(normalizedSearch)
    );
  }, [debouncedSearch, users]);

  return (
    <main className="app users-page">
      <div className="users-page__container">
        <section className="users-page__layout">
          <div className="users-page__sidebar">
            <UserForm />
          </div>

          <div className="users-page__content">
            <section className="users-page__search">
              <label className="users-page__search-label" htmlFor="search">
                Search by name
              </label>
              <input
                id="search"
                className="users-page__search-input"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Enter first or last name"
              />
            </section>

            {loading && <p className="users-page__state">Loading...</p>}
            {!loading && error && <p className="users-page__state users-page__state--error">{error}</p>}
            {!loading && !error && users.length === 0 && (
              <p className="users-page__state">No users available</p>
            )}
            {!loading && !error && users.length > 0 && filteredUsers.length === 0 && (
              <p className="users-page__state">No users found</p>
            )}

            {!loading && !error && filteredUsers.length > 0 && (
              <section className="users-page__list">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
export default UsersPage
