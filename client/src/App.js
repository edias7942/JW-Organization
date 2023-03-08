import './App.css';
import { Contexto } from './Components/Contexto'
import Conteudo from './Components/conteudo/Conteudo';
import Footer from './Components/Footer/Footer'
import Nav from './Components/nav/Nav';
import { useState } from 'react';
import './index.css'

import EdicaoCelula from './Components/alteracoes/EdicaoCelula'
import { sairDaEdicao } from './Components/alteracoes/EdicaoCelula';

function App() {

  const [conteudo, setConteudo] = useState('a')

  return (
    <Contexto.Provider value={{ conteudo, setConteudo }}>
      <div id="bloquear-tela" ></div>  {/* Responsável por bloquear o conteúdo quando um pop-up está sendo utilizado */}
      <EdicaoCelula />  {/* Responsável pelo pop-up de edição de celulas*/}
      <div className="App">
        <Nav />
        <Conteudo />
        <Footer />
      </div>

    </Contexto.Provider>
  );
}

export default App;
