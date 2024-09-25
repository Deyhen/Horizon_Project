import Image from "next/image";
import { NewsBlock } from "../components/NewsBlock/newsBlock.component";
const news = [
  {
    id: '1',
    content: 'Amet ex sunt aliqua cillum aliqua aliquip sint qui adipisicing reprehenderit proident sit commodo qui. Magna veniam aute anim ea non eu tempor non quis ut do dolor duis excepteur. Adipisicing mollit sunt duis tempor labore. Adipisicing enim laborum laboris excepteur Lorem sit id et consequat pariatur. Ad enim mollit dolore adipisicing velit cillum voluptate. Exercitation id in incididunt eiusmod sit minim id aute ipsum in. Aute et eiusmod eiusmod tempor reprehenderit in sunt commodo.',
    title: 'Cillum do enim ipsum id ullamco ullamco ea eu sint.',
    img: ''
  },
  {
    id: '2',
    content: 'Amet ex sunt aliqua cillum aliqua aliquip sint qui adipisicing reprehenderit proident sit commodo qui. Magna veniam aute anim ea non eu tempor non quis ut do dolor duis excepteur. Adipisicing mollit sunt duis tempor labore. Adipisicing enim laborum laboris excepteur Lorem sit id et consequat pariatur. Ad enim mollit dolore adipisicing velit cillum voluptate. Exercitation id in incididunt eiusmod sit minim id aute ipsum in. Aute et eiusmod eiusmod tempor reprehenderit in sunt commodo.',
    title: 'Cillum do enim ipsum id ullamco ullamco ea eu sint.',
    img: ''
  },
  {
    id: '3',
    content: 'Amet ex sunt aliqua cillum aliqua aliquip sint qui adipisicing reprehenderit proident sit commodo qui. Magna veniam aute anim ea non eu tempor non quis ut do dolor duis excepteur. Adipisicing mollit sunt duis tempor labore. Adipisicing enim laborum laboris excepteur Lorem sit id et consequat pariatur. Ad enim mollit dolore adipisicing velit cillum voluptate. Exercitation id in incididunt eiusmod sit minim id aute ipsum in. Aute et eiusmod eiusmod tempor reprehenderit in sunt commodo.',
    title: 'Cillum do enim ipsum id ullamco ullamco ea eu sint.',
    img: ''
  },
]

export default function Home() {
  return (
    <div className="">
      {news.map(item => (
        <NewsBlock title={item.title} id={item.id} content={item.content} img={item.img} key={item.id}/>
      ))}
    </div>
  );
}
