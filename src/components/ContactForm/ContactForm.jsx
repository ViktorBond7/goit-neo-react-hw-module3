import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .required("Required")
    .matches(/^\+?\d+(?:-\d+)*$/, "Incorrect format!!!"),
});

const ContactForm = ({ addContacts }) => {
  const contactId = nanoid();

  const handleSabmit = (value, actions) => {
    console.log(value);
    addContacts({ ...value, id: contactId });
    actions.resetForm();
  };

  return (
    <>
      <p>ContactForm</p>
      <Formik
        initialValues={{ name: "", number: "" }}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = "Required";
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   }
        //   return errors;
        // }}
        onSubmit={handleSabmit}
        validationSchema={ContactSchema}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <Field type="text" name="name" />
            <ErrorMessage className={css.err} name="name" component="div" />
            <Field type="text" name="number" />
            <ErrorMessage className={css.err} name="number" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default ContactForm;
