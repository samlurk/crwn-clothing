import { useFormik } from "formik";
import { SignUpSchema } from "../../schemas/SignUp";
import httpService from "../../services/Http";
import FormInput from "../FormInput";
import { SignUp, Title, Form } from "./index.styles";
import Button from "../Button";
import { AuthContext } from "../../contexts/Auth";
import { useContext } from "react";

const SignUpForm = () => {
  const { login } = useContext(AuthContext);
  const onSubmit = async (values, actions) => {
    try {
      const { confirmPassword, ...formData } = values;
      const { ACCESS_TOKEN } = await httpService.post("auth/signup", formData);
      login(ACCESS_TOKEN);
      actions.resetForm();
    } catch (error) {
      alert(error.message);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: SignUpSchema,
      onSubmit,
    });

  return (
    <SignUp>
      <Title>Don't have an account?</Title>
      <span>Sign up with your email and password</span>
      <Form onSubmit={handleSubmit}>
        <FormInput
          label="First Name"
          type="text"
          isError={errors.firstName && touched.firstName}
          errorMessageResponse={errors.firstName}
          required
          onChange={handleChange}
          name="firstName"
          onBlur={handleBlur}
          value={values.firstName}
        />
        <FormInput
          label="Last Name"
          type="text"
          isError={errors.lastName && touched.lastName}
          errorMessageResponse={errors.lastName}
          required
          onChange={handleChange}
          name="lastName"
          onBlur={handleBlur}
          value={values.lastName}
        />
        <FormInput
          label="Email"
          type="email"
          isError={errors.email && touched.email}
          errorMessageResponse={errors.email}
          required
          onChange={handleChange}
          name="email"
          onBlur={handleBlur}
          value={values.email}
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
        <FormInput
          label="Confirm Password"
          type="password"
          isError={errors.confirmPassword && touched.confirmPassword}
          errorMessageResponse={errors.confirmPassword}
          required
          onChange={handleChange}
          name="confirmPassword"
          onBlur={handleBlur}
          value={values.confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </SignUp>
  );
};

export default SignUpForm;
