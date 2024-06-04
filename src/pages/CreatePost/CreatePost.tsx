import { useState } from 'react';
import styles from './CreatePost.module.css';

const CreatePost = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [errorForm, setErrorForm] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  return (
    <div className={styles.create_post}>
        <h2>Criar Post</h2>
        <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input 
            type="text" 
            name="title" 
            value={title}
            placeholder='Insira um título'
            onChange={(e: any) => setTitle(e.target.value)}
            required 
            />
          </label>
          <label>
            <span>Imagem:</span>
            <input 
            type="text" 
            name="image" 
            value={image}
            placeholder='Insira o endereço de uma imagem que represente seu post'
            onChange={(e: any) => setImage(e.target.value)}
            required 
            />
          </label>
          <label>
            <span>Conteúdo:</span>
            <textarea 
            name="body" 
            value={body}
            placeholder='Insira conteúdo do post'
            onChange={(e: any) => setBody(e.target.value)}
            required 
            />
          </label>
          <label>
            <span>Tags:</span>
            <input 
            type="text" 
            name="tags" 
            value={tags}
            placeholder='Insira as tags separadas por vírgula'
            onChange={(e: any) => setTags(e.target.value)}
            required 
            />
          </label>
          <button className='btn'>Confirmar</button>
          {/* {!loading && <button className='btn'>Confirmar</button>}
          {loading && <button className='btn' disabled>Aguarde...</button>} */}
          {errorForm && <p className='error'>{errorForm}</p>}
        </form>
    </div>
  )
}

export default CreatePost