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
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "src/app/store/configureStore";
import { signInUser } from "src/features/account/accountSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const location = useLocation<{ from: string }>();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      history.push(location.state?.from || "/catalog");
    } catch (err) {
      console.error(err);
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
        Sign in
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
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password", { required: "Password is required" })}
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
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link component={(props) => <MuiLink variant="body2" {...props} />} to="/register">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
