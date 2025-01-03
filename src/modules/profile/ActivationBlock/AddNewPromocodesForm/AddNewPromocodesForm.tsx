import { activatePromocode, addPromocodes } from '@/src/api';
import { Modal } from '@/src/modules/providers';
import { Button, Input, Loader } from '@/src/shared/ui';
import { useAppDispatch } from '@/src/store';
import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import { number, object, string } from 'yup';

const AddNewPromocodesSchema = object().shape({
  name: string().required("Name є обов'язковим полем"),
  gameCurrencyBonus: number().min(0).required("GameCurrencyBonus є обов'язковим полем"),
  donateCurrencyBonus: number().min(0).required("DonateCurrencyBonus є обов'язковим полем"),
  amount: number().min(1).required("Amount є обов'язковим полем"),
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
      validationSchema={AddNewPromocodesSchema}
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
          <div className="flex flex-col items-center justify-between space-y-4">
            <FormLine label="Назва промокоду" inputName="name" inputType="text" />
            <FormLine label="Кількість" inputName="amount" inputType="number" />
            <FormLine
              label="Бонус в ігровій валюті"
              inputName="gameCurrencyBonus"
              inputType="text"
            />
            <FormLine
              label="Бонус в донатній валюті"
              inputName="donateCurrencyBonus"
              inputType="number"
            />
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

const FormLine = ({
  label,
  inputName,
  inputType,
}: {
  label: string;
  inputName: string;
  inputType: string;
}) => {
  return (
    <div className="flex w-full items-center justify-between space-x-8">
      <span className="min-w-fit text-xl text-text_secondary">{label}</span>
      <Input
        containerStyle="!w-32"
        inputStyle="text-lg"
        name={inputName}
        type={inputType}
        errorStyle="hidden"
      />
    </div>
  );
};
