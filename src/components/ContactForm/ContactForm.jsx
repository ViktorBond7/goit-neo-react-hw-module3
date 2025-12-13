import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { useId } from "react";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 symb long")
    .max(50, "The name must be no more than 50 characters long")
    .required("Required"),
  number: Yup.string()
    .min(3, "Number must be at least 3 characters long")
    .max(50, "Number must be no more than 50 characters long")
    .required("Required"),
});

const ContactForm = ({ addContacts }) => {
  const contactId = nanoid();
  const nameId = useId();
  const numberId = useId();

  const handleSabmit = (value, actions) => {
    addContacts({ ...value, id: contactId });
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={{ name: "", number: "" }}
        onSubmit={handleSabmit}
        validationSchema={ContactSchema}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <label className={css.label} htmlFor={nameId}>
              Name
            </label>
            <Field className={css.input} type="text" name="name" id={nameId} />
            <ErrorMessage className={css.err} name="name" component="span" />
            <label className={css.label} htmlFor={numberId}>
              Number
            </label>
            <Field
              className={css.input}
              type="text"
              name="number"
              id={numberId}
            />
            <ErrorMessage className={css.err} name="number" component="span" />
            <button className={css.btn} type="submit" disabled={isSubmitting}>
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
