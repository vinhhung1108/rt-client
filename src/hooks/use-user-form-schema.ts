import * as yup from 'yup'

export function useUserFormSchema() {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter your username')
      .min(4, 'Username at least 4 character'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Password at least 6 character'),
    confirmPassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    email: yup.string().required('Please enter email').email('Please type your email'),
    roles: yup.array().nullable(),
  })
  return schema
}

export function useUserUpdateFormSchema() {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter your username')
      .min(4, 'Username at least 4 character'),
    email: yup.string().required('Please enter email').email('Please type your email'),
    roles: yup.array().nullable(),
  })
  return schema
}
