import { Formik, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import { object, number } from 'yup';
import { Input, Button, Loader } from '@/src/shared/ui';
import { FaArrowRightLong, FaCoins, FaStaylinked, FaArrowLeftLong } from 'react-icons/fa6';
import { checkIfNumber } from '../utils/checkIfNumber';
import { filterFormErrors } from '@/src/shared/utilities';

const CurrencyChangeFormSchema = object().shape({
  donateCurrency: number()
    .min(1, 'Мінімальна сума обміну 1 монета')
    .max(999999, 'Максимальна сума донату 999999')
    .required("Всі поля є обов'язковими"),
  gameCurrency: number()
    .min(10, 'Мінімальна сума обміну 1 монета')
    .required("Всі поля є обов'язковими"),
});

interface Values {
  donateCurrency: string;
  gameCurrency: string;
}

export const CurrencyChangeForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [rejectWith, setRejectWith] = useState('');
  const [changeMode, setChangeMode] = useState<'DonateToGame' | 'GameToDonate'>('DonateToGame');

  const renderArrowButton = () => {
    if (changeMode === 'DonateToGame') {
      return <FaArrowRightLong className="h-10 w-10" />;
    } else if (changeMode === 'GameToDonate') {
      return <FaArrowLeftLong className="h-10 w-10" />;
    }
  };

  return (
    <Formik
      initialValues={{
        donateCurrency: '',
        gameCurrency: '',
      }}
      validationSchema={CurrencyChangeFormSchema}
      validateOnMount
      onSubmit={(values: Values) => {
        console.log(values);
      }}
    >
      {({ errors, values, touched, ...props }) => (
        <Form className="mt-12 flex w-full min-w-[22rem] flex-col items-center justify-center space-y-12">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <FaCoins className="h-8 w-8 text-secondary" />
              <Input
                name="donateCurrency"
                placeholder="0"
                containerStyle="max-w-32"
                inputStyle="px-2 py-1 text-xl text-center"
                customOnChange={(e) => {
                  const value = e.currentTarget.value;
                  if (checkIfNumber(value))
                    props.setValues({
                      ...values,
                      donateCurrency: value,
                      gameCurrency: (+value * 10).toString(),
                    });
                }}
                {...props}
              />
            </div>
            <Button
              className="!py-0"
              type="button"
              onClick={() =>
                setChangeMode((prev) => {
                  if (prev === 'DonateToGame') {
                    return 'GameToDonate';
                  } else {
                    return 'DonateToGame';
                  }
                })
              }
            >
              {renderArrowButton()}
            </Button>
            <div className="flex items-center space-x-4">
              <Input
                name="gameCurrency"
                placeholder="0"
                containerStyle="max-w-32"
                inputStyle="px-2 py-1 text-xl text-center"
                customOnChange={(e) => {
                  const value = e.currentTarget.value;
                  if (checkIfNumber(value))
                    props.setValues({
                      ...values,
                      donateCurrency: (+value / 10).toString(),
                      gameCurrency: value,
                    });
                }}
                {...props}
              />
              <FaStaylinked className="h-8 w-8 text-secondary" />
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
