import { Link } from "react-router-dom";
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
        <h1>Sobre</h1>
        <h2>Sobre Mini <span>Blog</span></h2>
        <p>Este é um projeto consiste em um blog feito com React no Front-end e Firebase no Back-end.</p>
        <p>Ele segue as orientações do curso <i>React do Zero à Maestria</i>, do instrutor Matheus Battisti, mas tentando (ao máximo possível, adaptá-lo à Typescript.</p>
        <Link to={'/posts/create'} className="btn">Criar Post</Link>
    </div>
  );
}

export default About