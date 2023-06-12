import { useFormik } from "formik";
import { SignInSchema } from "../../schemas/SignIn";
import httpService from "../../services/Http";
import FormInput from "../FormInput";
import { SignIn, ButtonContainer, Form, Title } from "./index.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../Button";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "../../store/Auth/action";
import { useDispatch } from "react-redux";

const SignInForm = () => {
  const dispatch = useDispatch();
  const onSubmit = async (values, actions) => {
    try {
      const { ...user } = values;
      const { ACCESS_TOKEN } = await httpService.post("auth/login", user);
      dispatch(login(ACCESS_TOKEN));
      actions.resetForm();
    } catch (error) {
      alert(error.message);
    }
  };

  const signInWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const { ACCESS_TOKEN } = await httpService.post("auth/login-google", {
          code: codeResponse.code,
        });
        dispatch(login(ACCESS_TOKEN));
      } catch (error) {
        if (
          error.message !== "The email/username doesn't exists" ||
          error.message !== "Incorrect password"
        )
          alert(error.message);
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: SignInSchema,
      onSubmit,
    });

  return (
    <SignIn>
      <Title>Already have an account?</Title>
      <span>Sign in with your email or username and password</span>
      <Form onSubmit={handleSubmit}>
        <FormInput
          label="Email or Username"
          type="text"
          isError={errors.username && touched.username}
          errorMessageResponse={errors.username}
          required
          onChange={handleChange}
          name="username"
          onBlur={handleBlur}
          value={values.username}
        />
        <FormInput
          label="Password"
          type="password"
          isError={errors.password && touched.password}
          errorMessageResponse={errors.password}
          required
          onChange={handleChange}
          name="password"
          onBlur={handleBlur}
          value={values.password}
        />
        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonContainer>
      </Form>
    </SignIn>
  );
};

export default SignInForm;
