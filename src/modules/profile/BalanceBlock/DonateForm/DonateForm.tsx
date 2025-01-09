import { Formik, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import { object, number } from 'yup';
import { Input, Button, Loader } from '@/src/shared/ui';
import { FaArrowRightLong, FaCoins } from 'react-icons/fa6';
import { checkIfNumber } from '../utils/checkIfNumber';
import { filterFormErrors } from '@/src/shared/utilities';

const DonateFormSchema = object().shape({
  realCurrency: number()
    .min(10, 'Мінімальна сума донату 10 гривень')
    .max(999999, 'Максимальна сума донату 999999')
    .required("Всі поля є обов'язковими"),
  donateCurrency: number()
    .min(20, 'Мінімальна сума донату 10 гривень')
    .required("Всі поля є обов'язковими"),
});

interface Values {
  realCurrency: string;
  donateCurrency: string;
}

export const DonateForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [rejectWith, setRejectWith] = useState('');

  const formatFloat = (value: number): string => {
    const after = value.toString().split('.')[1];
    if (after) {
      if (after.length >= 2) {
        return value.toFixed(2);
      } else {
        return value.toFixed(1);
      }
    } else {
      return value.toString();
    }
  };

  const calculateCoef = (value: string) => {
    if (+value < 100) {
      return 2;
    }
    if (+value < 500) {
      return 4;
    }
    if (+value < 1000) {
      return 6;
    } else {
      return 8;
    }
  };

  return (
    <Formik
      initialValues={{
        realCurrency: '',
        donateCurrency: '',
      }}
      validationSchema={DonateFormSchema}
      onSubmit={(values: Values) => {}}
    >
      {({ values, errors, touched, ...props }) => (
        <Form className="mt-12 flex w-full min-w-[22rem] flex-col items-center justify-center space-y-12">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <span className="h-12 w-8 text-5xl text-secondary">₴</span>
              <Input
                name="realCurrency"
                placeholder="0"
                containerStyle="max-w-32"
                inputStyle="px-2 py-1 text-xl text-center"
                customOnChange={(e) => {
                  const value = e.currentTarget.value;
                  if (checkIfNumber(value))
                    props.setValues({
                      ...values,
                      realCurrency: value,
                      donateCurrency: (+value * calculateCoef(value)).toString(),
                    });
                }}
              />
            </div>

            <FaArrowRightLong className="h-10 w-10 text-secondary" />
            <div className="flex items-center space-x-4">
              <Input
                name="donateCurrency"
                placeholder="0"
                inputStyle="px-2 py-1 text-xl text-center"
                containerStyle="max-w-32"
                customOnChange={(e) => {
                  const value = e.currentTarget.value;
                  if (checkIfNumber(value))
                    props.setValues({
                      ...values,
                      realCurrency: formatFloat(+value / calculateCoef(value)).toString(),
                      donateCurrency: value,
                    });
                }}
              />
              <FaCoins className="h-8 w-8 text-secondary" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3">
            <Button type="submit">Підтвердити</Button>
            <div className="flex h-8 items-center justify-center">
              {isPending ? (
                <Loader />
              ) : rejectWith ? (
                <div className="text-lg font-semibold text-red-600 underline underline-offset-2 shadow-red-600 text-shadow">
                  {rejectWith}
                </div>
              ) : (
                filterFormErrors(errors, touched)
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
