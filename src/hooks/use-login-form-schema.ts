import * as yup from 'yup'

export function useLoginFormSchema() {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter username')
      .min(4, 'Username at least 4 character'),
    password: yup
      .string()
      .required('Please enter username')
      .min(6, 'Username at least 6 character'),
  })
  return schema
}
