import React from "react";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";

const FormContact = () => {

  const validationSchema = Yup.object({
    name: Yup.string().required("Digite seu nome"),
    email: Yup.string().email("Digite um e-mail válido").required("Digite seu e-mail"),
    phone: Yup.string().required("Digite seu telefone ou Whatsapp"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  const renderError = (message) => <p className="text-xs text-red-500">{message}</p>;

  const Input = ({ name, label, maskPhone, ...props }) => {
    const [field, meta] = useField(name);
    const isMasked = maskPhone !== undefined;
    return (
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700" htmlFor={field.name}>
          {label} <span className="font-light">*</span>
        </label>
        {isMasked ?
          <>
            <Field name={field.name}>{({ field, form, meta, maskPhone }) =>
              <MaskedInput
                {...field}
                {...props}
                name={field.name}
                id={field.name}
                mask={["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                className={`${meta.error && meta.touched ? "border-red-500" : ""
                  } w-full md:w-fit bg-gray-50 shadow-sm appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:bg-white`}
              />
            }</Field>
          </>
          :

          <input
            className={`${meta.error && meta.touched ? "border-red-500" : ""
              } bg-gray-50 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:bg-white`}
            {...field}
            {...props}
            id={field.name}
          />
        }
        <ErrorMessage
          name={field.name}
          component="div"
          className="mt-1 text-xs text-red-500"
        />
      </div>
    );
  };



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log(values);
        await onSubmit(values);
        resetForm();
      }}
    >
      <Form>
        <div className="container w-full">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <Input name="name" label="Seu nome" />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <Input name="email" label="Seu e-mail" />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <Input name="phone" label="Telefone ou Whatsapp" maskPhone />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <label className="block text-sm font-bold text-gray-700" htmlFor="message">
                Mensagem
              </label>

              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <Field
                    name="message"
                    id="message"
                    as="textarea"
                    rows="3"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 border border-gray-200 rounded shadow-sm appearance-none bg-gray-50 focus:outline-none focus:shadow-outline focus:bg-white"
                  />
                  <ErrorMessage name="message" render={renderError} />
                </div>
              </div>
            </div>
          </div>

          <button className="w-full px-6 py-2 mt-4 font-bold text-white bg-red-700 rounded shadow-sm md:w-fit hover:bg-red-500 focus:shadow-outline focus:outline-none" type="submit">
            Enviar mensagem
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default FormContact;
