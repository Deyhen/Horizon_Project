import { ErrorMessage, FormikErrors, FormikTouched } from 'formik';

export const filterFormErrors = (
  errors: FormikErrors<unknown>,
  touched: FormikTouched<unknown>,
) => {
  const error = Object.keys(errors)
    .map((field) => {
      if (touched[field as keyof typeof touched]) {
        return (
          <ErrorMessage key={field} name={field}>
            {(msg) => (
              <div className="text-lg font-semibold text-red-600 underline underline-offset-2 shadow-red-600 text-shadow">
                {msg}
              </div>
            )}
          </ErrorMessage>
        );
      }
      return null;
    })
    .find((item) => item != null);

  return error;
};
