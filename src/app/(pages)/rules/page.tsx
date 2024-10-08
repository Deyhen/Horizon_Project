'use client';

import RulesBlock from '@/src/components/RuleBlock/RuleBlock.component';

const Rules = () => {
  return (
    <div
      className={`relative flex flex-col rounded-b-3xl bg-white py-12 shadow-2xl shadow-element md:rounded-[2rem] md:shadow-none`}
    >
      <h1
        className={`absolute -top-8 left-0 right-0 mx-auto w-full rounded-t-3xl bg-[#e77f2a] px-4 py-1.5 text-center text-xl font-bold text-white md:-top-5 md:w-1/3 md:min-w-fit md:rounded-3xl md:text-xl`}
      >
        Правила серверу
      </h1>

      <RulesBlock
        theme="Аккаунт"
        themeIndex="1"
        options={[
          'При реєстрації, ви погоджуєтеся з політикою обробки персональних даних і з правилами проєкту.',
          'Заборонено передавати і використовувати акаунт третіми особами.',
          'Заборонено реєструвати ніки, які порушують політику проєкту.',
          'Заборонено встановлювати скіни і плащі, які порушують політику проєкту.',
          'Заборонено створювати твинк-акаунти для отримання гральних переваг.',
          'Заборонено створювати твинк-акаунти для отримання гральних переваг.',
          'Заборонено створювати твинк-акаунти для отримання гральних переваг.',
        ]}
      />
      <RulesBlock
        theme="Ігрові цінності та донат"
        themeIndex="2"
        options={[
          'Гроші, витрачені на донат, рівнозначні добровільним пожертвам і не можуть бути повернені повністю або частково за будь-яких умов.',
          'Заборонено торгувати ігровими ресурсами і надавати інші послуги за позаігрові цінності.',
          'При блокуванні аккаунта гральні цінності не підлягають поверненню.',
          'Персонал проєкту залишає за собою право не повертати ігрові ресурси, втрачені через помилки гравця або сервера.',
          'Персонал проєкту має право конфіскувати ігрові ресурси, видаляти регіони і обмежувати до них доступ у разі необхідності.',
          'Персонал проєкту має право конфіскувати ігрові ресурси, видаляти регіони і обмежувати до них доступ у разі необхідності.',
        ]}
      />
      <RulesBlock
        theme="Блокування"
        themeIndex="3"
        options={[
          'Персонал проєкту має право припинити порушення правил і виносити покарання, виходячи з ситуації в індивідуальному порядку.',
          'Персонал проєкту за потреби має право заблокувати ваш акаунт.',
          'За черезмірно часті порушення правил всі ваші акаунти можуть бути заблоковані назавжди.',
          'В разі створення перешкод комфортному середовищу для гравців, персонал проєкту має право відправляти гравця на спавн і видавати повноцінне покарання у вигляді блокування акаунта.',
          'В разі створення перешкод комфортному середовищу для гравців, персонал проєкту має право відправляти гравця на спавн і видавати повноцінне покарання у вигляді блокування акаунта.',
          'В разі створення перешкод комфортному середовищу для гравців, персонал проєкту має право відправляти гравця на спавн і видавати повноцінне покарання у вигляді блокування акаунта.',
        ]}
      />
      <RulesBlock
        theme="Ігровий чат"
        themeIndex="4"
        options={[
          'Заборонено спамити, флудити і надсилати повідомлення, написані більшою частиною капсом.',
          "Заборонено писати повідомлення, які порушують політику проєкту, а також пасивно-агресивне і аб'юзивне спілкування.",
          'Заборонено обговорювати зміни в файлах клієнта, чіт-клієнти, дупи та помилки роботи сервера.',
          'Під комерційними повідомленнями розуміється реклама варпу і повідомлення про купівлю-продаж.',
          'Заборонено надсилати посилання на контент, що порушує правила і політику проєкту, а також на будь-який джерело, що містить негативну інформацію.',
          'Приватні чати, чати клану, чат модератора та інші подібні можуть бути модеровані персоналом проєкту за потреби.',
        ]}
      />
      <RulesBlock
        theme="Регіони та будівлі"
        themeIndex="5"
        options={[
          'Гравці, які належать до одного регіону, повинні самостійно регулювати свої взаємини.',
          'Заборонено завдавати шкоду чужим будівлям і обходити систему захисту приватних регіонів.',
          "Заборонено розміщення будівель і об'єктів, які порушують політику проєкту.",
          'Заборонено намагатися псувати зовнішній вигляд карти.',
          'Заборонено ставити конструкції, що створюють зайве навантаження на сервер.',
          'Заборонено створювати небезпечні для гравців публічні варпи.',
        ]}
      />
      <RulesBlock
        theme="PVP"
        themeIndex="6"
        options={[
          'Сраження в PVP мають бути чесними, якщо гравець вас вбив, він має право залишити ресурси у себе.',
          'Заборонено вбивство гравця менше, ніж через 2 хвилини після телепортації.',
          'Заборонено спам повідомленнями про смерть або вбивство.',
        ]}
      />
    </div>
  );
};

export default Rules;
