import * as Yup from 'yup'

// https://github.com/jquense/yup

export const contactFormSchema = Yup.object({
  name: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  message: Yup.string()
    .required('Required')
    .max(5000, 'must be 5000 characters or less'),
})
