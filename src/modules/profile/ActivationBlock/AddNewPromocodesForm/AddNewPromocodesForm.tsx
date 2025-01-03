import { activatePromocode, addPromocodes } from '@/src/api';
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
  name: string;
  gameCurrencyBonus: number;
  donateCurrencyBonus: number;
  amount: number;
}

export const AddNewPromocodesForm = () => {
  const dispatch = useAppDispatch();
  const [rejectWith, setRejectWith] = useState('');
  const [isPending, setIsPending] = useState(false);

  return (
    <Formik
      initialValues={{
        name: '',
        gameCurrencyBonus: 0,
        donateCurrencyBonus: 0,
        amount: 0,
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={(values: Values) => {
        setIsPending(true);
        dispatch(
          addPromocodes({
            name: values.name,
            amount: values.amount,
            gameCurrencyBonus: values.gameCurrencyBonus,
            donateCurrencyBonus: values.donateCurrencyBonus,
          }),
        )
          .unwrap()
          .then(() => {
            setIsPending(false);
            Modal.showModal({
              iconType: 'fullfilled',
              title: 'Промокоди успішно створено',
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
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-pimary flex items-center justify-center space-x-2 text-xl">
              <span>Назва промокоду</span>
              <Input name="name" type="text" placeholder="HJ#9X2" errorStyle="hidden" />
            </div>
            <div className="text-pimary flex items-center justify-center space-x-2 text-xl">
              <span>Кількість</span>
              <Input name="amount" type="number" placeholder="0" errorStyle="hidden" />
            </div>
            <div className="text-pimary flex items-center justify-center space-x-2 text-xl">
              <span>Бонус в ігровій валюті</span>
              <Input name="gameCurrencyBonus" type="number" placeholder="0" errorStyle="hidden" />
            </div>
            <div className="text-pimary flex items-center justify-center space-x-2 text-xl">
              <span>Бонус в донатній валюті</span>
              <Input name="donateCurrencyBonus" type="number" placeholder="0" errorStyle="hidden" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            <Button type="submit">Створити</Button>
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
