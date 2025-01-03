import { activatePromocode } from '@/src/api';
import { Modal } from '@/src/modules/providers';
import { Button, Input, Loader } from '@/src/shared/ui';
import { useAppDispatch } from '@/src/store';
import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import { object, string } from 'yup';

const ChangePasswordSchema = object().shape({
  promocode: string().required("Промокод є обов'язковим полем"),
});

interface Values {
  promocode: string;
}

export const ActivatePromocodeForm = () => {
  const dispatch = useAppDispatch();
  const [rejectWith, setRejectWith] = useState('');
  const [isPending, setIsPending] = useState(false);

  return (
    <Formik
      initialValues={{
        promocode: '',
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={(values: Values) => {
        setIsPending(true);
        dispatch(activatePromocode(values.promocode))
          .unwrap()
          .then(() => {
            setIsPending(false);
            Modal.showModal({
              iconType: 'fullfilled',
              title: 'Промокод успішно використано',
              confirmButton: true,
            });
          })
          .catch((e) => {
            setIsPending(false);
            setRejectWith(e);
          });
      }}
    >
      {({ errors, touched }) => (
        <Form className="mt-12 flex w-full min-w-72 flex-col items-center justify-center space-y-12">
          <Input name="promocode" type="text" placeholder="HJ#9X2" errorStyle="hidden" />

          <div className="flex flex-col items-center justify-center space-y-3">
            <Button type="submit">Використати</Button>
            <div className="flex h-8 items-center justify-center">
              {isPending ? (
                <Loader />
              ) : rejectWith ? (
                <div className="text-lg font-semibold text-red-600 underline underline-offset-2 shadow-red-600 text-shadow">
                  {rejectWith}
                </div>
              ) : (
                Object.keys(errors).map((field) => {
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
                })[0]
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
