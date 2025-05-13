import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/userSlice";
import styles from "./EditProfile.module.scss";
import { useHistory } from "react-router-dom";

export default function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      password: "",
      image: currentUser?.image || "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password || undefined,
      image: data.image.trim() || null,
    };

    const resultAction = await dispatch(updateUser(payload));
    if (updateUser.fulfilled.match(resultAction)) {
      history.push("/articles");
    } else if (resultAction.payload?.errors) {
      for (const [field, messages] of Object.entries(
        resultAction.payload.errors,
      )) {
        setError(field, { type: "server", message: messages.join(" ") });
      }
    }
  };

  return (
    <div className={styles.editProfile}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.editProfile__form}
      >
        <h2 className={styles.editProfile__title}>Edit Profile</h2>

        <div className={styles.editProfile__group}>
          <label>Username</label>
          <input
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}

          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <label>New password</label>
          <input
            type="password"
            placeholder="New password"
            {...register("password", {
              minLength: { value: 6, message: "Minimum 6 characters" },
              maxLength: { value: 40, message: "Maximum 40 characters" },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <label>Avatar image (url)</label>
          <input
            placeholder="Avatar image"
            {...register("image", {
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                message: "Invalid image URL",
              },
            })}
          />
          {errors.image && <p>{errors.image.message}</p>}
        </div>
        <button type="submit" className={styles.editProfile__button}>
          Save
        </button>
      </form>
    </div>
  );
}
