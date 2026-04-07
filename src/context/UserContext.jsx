import { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const { data, loading, error } = useFetch('https://dummyjson.com/users');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data]);

  const addUser = (user) => {
    setUsers((prevUsers) => [user, ...prevUsers]);
  }
  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        addUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
function useUsers() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }

  return context;
}
export { UserProvider, useUsers}
