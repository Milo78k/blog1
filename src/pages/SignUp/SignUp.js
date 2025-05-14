import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/userSlice";
import styles from "./SignUp.module.scss";
import ErrorMessage from "../../components/ErrorMessage";

export default function SignUp() {
  const dispatch = useDispatch();
  const serverError = useSelector((state) => state.user.errors);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (serverError && typeof serverError === "object") {
      Object.entries(serverError).forEach(([key, value]) => {
        const messages = Array.isArray(value)
          ? value.join(", ")
          : String(value);
        setError(key, { type: "server", message: messages });
      });
    }
  }, [serverError, setError]);

  const onValid = (data) => {
    dispatch(
      registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );
    reset();
  };

  const onInvalid = () => {
    setTriedSubmit(true);
  };

  return (
    <section className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={styles.form}>
        <h2 className={styles.title}>Create new account</h2>

        <ErrorMessage errors={serverError} />

        <label>
          Username
          <input
            type="text"
            className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
            })}
            placeholder="Username"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </label>

        <label>
          Email address
          <input
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
            placeholder="Email address"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <label>
          Password
          <input
            type="password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters.",
              },
              maxLength: { value: 40, message: "Max 40 characters" },
            })}
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>

        <label>
          Repeat Password
          <input
            type="password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            {...register("repeatPassword", {
              validate: (value) =>
                value === watch("password") || "Passwords must match",
            })}
            placeholder="Repeat Password"
          />
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            {...register("agreement", {
              required: "You must agree to continue",
            })}
          />
          <span>I agree to the processing of my personal information</span>
        </label>

        {errors.agreement && <p>{errors.agreement.message}</p>}

        <button type="submit" className={styles.submitButton}>
          Create
        </button>
        {triedSubmit && !isValid && (
          <p className={styles.note}>
            Please fill in all fields correctly before submitting.
          </p>
        )}
        <p className={styles.redirect}>
          Already have an account? <a href="/sign-in">Sign In</a>
        </p>
      </form>
    </section>
  );
}
