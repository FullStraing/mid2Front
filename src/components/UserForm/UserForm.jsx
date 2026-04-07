import { useState } from 'react';
import { useUsers } from '../../context/UserContext';
import './UserForm.css';
const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  age: '',
};
function UserForm() {
  const { addUser, users }=useUsers();
  const [form, setForm]= useState(initialForm);
  const [errors, setErrors] =useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }
  const validate = () => {
    const nextErrors = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = 'First name is required';
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = 'Last name is required';
    }

    if (!form.email.includes('@')) {
      nextErrors.email = 'Email must contain @';
    }

    if (Number(form.age) <= 0) {
      nextErrors.age = 'Age must be greater than 0';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    addUser({
      id: Date.now(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      age: Number(form.age),
      image: 'https://dummyjson.com/icon/user/128',
      username: `${form.firstName.trim().toLowerCase()}${users.length + 1}`,
      phone: 'Not specified',
    });

    setForm(initialForm);
    setErrors({});
  };
  return (
    <section className="user-form">
      <form className="user-form__form" onSubmit={handleSubmit}>
        <label className="user-form__field">
          <span className="user-form__label">First name</span>
          <input className={`user-form__input ${errors.firstName ? 'user-form__input--error' :''}`}
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Emik"/>
          {errors.firstName && <span className="user-form__error">{errors.firstName}</span>}
        </label>

        <label className="user-form__field">
          <span className="user-form__label">Last name</span>
          <input
            className={`user-form__input ${errors.lastName ? 'user-form__input--error' : ''}`}
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Togolokov"
          />
          {errors.lastName && <span className="user-form__error">{errors.lastName}</span>}
        </label>

        <label className="user-form__field">
          <span className="user-form__label">Email</span>
          <input
            className={`user-form__input ${errors.email ? 'user-form__input--error' : ''}`}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="te11971@auca.kg"/>
          {errors.email && <span className="user-form__error">{errors.email}</span>}
        </label>

        <label className="user-form__field">
          <span className="user-form__label">Age</span>
          <input
            className={`user-form__input ${errors.age ? 'user-form__input--error' : ''}`}
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="25"/>
          {errors.age && <span className="user-form__error">{errors.age}</span>}
        </label>
        <button className="user-form__button" type="submit">
          Add user
        </button>
      </form>
    </section>
  );
}
export default UserForm
