import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";
import styles from "./SignIn.module.scss";
import ErrorMessage from "../../components/ErrorMessage";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const serverError = useSelector((state) => state.user.errors);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    setTriedSubmit(true);
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.rejected.match(resultAction)) {
      const errorsFromServer = resultAction.payload;
      Object.entries(errorsFromServer).forEach(([key, value]) => {
        const messages = Array.isArray(value)
          ? value.join(", ")
          : String(value);
        setError(key, { type: "server", message: messages });
      });
    } else {
      history.push("/");
    }
  };

  return (
    <div className={styles.signIn}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signIn__form}>
        <h1 className={styles.signIn__title}>Sign In</h1>

        <ErrorMessage errors={serverError} />

        <div className={styles.signIn__group}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className={styles.signIn__error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.signIn__group}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className={styles.signIn__error}>{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={styles.signIn__button}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {triedSubmit && !isValid && (
          <p className={styles.signIn__note}>
            Please fill in all required fields to proceed.
          </p>
        )}
        <p className={styles.signIn__redirect}>
          Don't have an account? <a href="/sign-up">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
