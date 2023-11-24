import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "src/app/api/agent";

export default function Register() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });

  function handleApiErrors(errors: string[] = []) {
    if (errors.length > 0) {
      errors.forEach((err) => {
        switch (true) {
          case err.includes("Password"):
            setError("password", { message: err });
            break;
          case err.includes("Email"):
            setError("email", { message: err });
            break;
          case err.includes("Username"):
            setError("username", { message: err });
            break;
          default:
            console.log(err);
        }
      });
    }
  }

  async function submitForm(data: FieldValues) {
    try {
      await agent.Account.register(data);
      toast.success("Registration successful, you can now login");
    } catch (err: any) {
      handleApiErrors(err);
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoComplete="username"
          autoFocus
          {...register("username", { required: "Username is required" })}
          error={Boolean(errors.username)}
          helperText={errors?.username?.message as string}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Email"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message: "Please enter a valid email address",
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors?.email?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value:
                /(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/,
              message: "Password does not meet complexity requirements",
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors?.password?.message as string}
        />

        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link component={(props) => <MuiLink variant="body2" {...props} />} to="/login">
              {"Already have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
