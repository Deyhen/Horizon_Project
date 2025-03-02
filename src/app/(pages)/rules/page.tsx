import { RuleBlock } from '@/src/modules/rules/RuleBlock';

interface Rule {
  title: string;
  subtitle: string;
  body: string[];
}

const rules: Rule[] = [
  {
    title: 'Аккаунт',
    subtitle: 'Використання аккаунта регулюється правилами проєкту для забезпечення чесної гри',
    body: [
      'При реєстрації, ви погоджуєтеся з політикою обробки персональних даних і з правилами проєкту.',
      'Заборонено передавати і використовувати акаунт третіми особами.',
      'Заборонено реєструвати ніки, які порушують політику проєкту.',
      'Заборонено встановлювати скіни і плащі, які порушують політику проєкту.',
      'Заборонено створювати твинк-акаунти для отримання гральних переваг.',
    ],
  },
  {
    title: 'Ігрові цінності та донат',
    subtitle:
      'Всі гральні цінності та донат підлягають правилам використання, визначеним адміністрацією',
    body: [
      'Гроші, витрачені на донат, рівнозначні добровільним пожертвам і не можуть бути повернені повністю або частково за будь-яких умов.',
      'Заборонено торгувати ігровими ресурсами і надавати інші послуги за позаігрові цінності.',
      'При блокуванні аккаунта гральні цінності не підлягають поверненню.',
      'Персонал проєкту залишає за собою право не повертати ігрові ресурси, втрачені через помилки гравця або сервера.',
      'Персонал проєкту має право конфіскувати ігрові ресурси, видаляти регіони і обмежувати до них доступ у разі необхідності.',
    ],
  },
  {
    title: 'Блокування',
    subtitle: 'Персонал має право застосовувати блокування для підтримання порядку на сервері',
    body: [
      'Персонал проєкту має право припинити порушення правил і виносити покарання, виходячи з ситуації в індивідуальному порядку.',
      'Персонал проєкту за потреби має право заблокувати ваш акаунт.',
      'За черезмірно часті порушення правил всі ваші акаунти можуть бути заблоковані назавжди.',
      'В разі створення перешкод комфортному середовищу для гравців, персонал проєкту має право відправляти гравця на спавн і видавати повноцінне покарання у вигляді блокування акаунта.',
    ],
  },
  {
    title: 'Ігровий чат',
    subtitle: 'Чат створений для спілкування і повинен залишатися дружнім і відповідати правилам',
    body: [
      'Заборонено спамити, флудити і надсилати повідомлення, написані більшою частиною капсом.',
      "Заборонено писати повідомлення, які порушують політику проєкту, а також пасивно-агресивне і аб'юзивне спілкування.",
      'Заборонено обговорювати зміни в файлах клієнта, чіт-клієнти, дупи та помилки роботи сервера.',
      'Під комерційними повідомленнями розуміється реклама варпу і повідомлення про купівлю-продаж.',
      'Заборонено надсилати посилання на контент, що порушує правила і політику проєкту, а також на будь-який джерело, що містить негативну інформацію.',
      'Приватні чати, чати клану, чат модератора та інші подібні можуть бути модеровані персоналом проєкту за потреби.',
    ],
  },
  {
    title: 'Регіони та будівлі',
    subtitle:
      "Гравці зобов'язані дотримуватися правил захисту регіонів і підтримувати естетику світу",
    body: [
      'Гравці, які належать до одного регіону, повинні самостійно регулювати свої взаємини.',
      'Заборонено завдавати шкоду чужим будівлям і обходити систему захисту приватних регіонів.',
      "Заборонено розміщення будівель і об'єктів, які порушують політику проєкту.",
      'Заборонено намагатися псувати зовнішній вигляд карти.',
      'Заборонено ставити конструкції, що створюють зайве навантаження на сервер.',
      'Заборонено створювати небезпечні для гравців публічні варпи.',
    ],
  },
  {
    title: 'PVP',
    subtitle: 'PVP-зони призначені для чесних боїв, що відповідають правилам проєкту',
    body: [
      'Сраження в PVP мають бути чесними, якщо гравець вас вбив, він має право залишити ресурси у себе.',
      'Заборонено вбивство гравця менше, ніж через 2 хвилини після телепортації.',
      'Заборонено спам повідомленнями про смерть або вбивство.',
    ],
  },
];

const Rules = () => {
  return (
    <div className="w-full px-8">
      <div className="my-8 flex flex-col text-text">
        <span className="py-4 text-4xl font-bold">Community Rules</span>
        <span className="text-xl font-semibold">
          Welcome to our Minecraft Launcher community! To ensure a safe and enjoyable experience for
          everyone, please adhere to the following rules:
        </span>
      </div>
      <div className="flex flex-col space-y-6">
        {rules.map((rule: Rule, index) => (
          <RuleBlock
            key={rule.title}
            title={rule.title}
            subtitle={rule.subtitle}
            options={rule.body}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Rules;
