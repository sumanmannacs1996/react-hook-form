import { TextField, Button, Stack } from "@mui/material";
import React from "react";

import { useForm } from "react-hook-form";

function MuiLoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSumit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Login</h1>
      <form noValidate onSubmit={handleSubmit(onSumit)}>
        <stack spacing={2} width={400}>
          <TextField
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email provided!",
              },
              validate: {
                notAdmin: (fieldValue) =>
                  fieldValue !== "admin@example.com" ||
                  "Please enter a different email!",
              },
            })}
          />
          <TextField
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Password is required!",
            })}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </stack>
      </form>
    </div>
  );
}

export default MuiLoginForm;
