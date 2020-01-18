import React, { useState, useEffect } from 'react';
import api from  './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

/*
// componente 
  // função que retorna html, css, ou js(interface)
  // como o App()
  // bloco isolado de () que não interfere no restante da aplicação

// propriedade
  // atributo como o titulo
  // info que componentes pai passa para o componente filho

  //Arquivo Header.js
  /*import React from 'react';

  function Header(props){
    return <h1>{props.title}</h1>
  }

  export default Header;
  */

  //import Header from './Header' //dentro do App.js

  //dentro do return da funcion App
  /*
  <>
    <Header title = "Dashboard 1"/>
    <Header title = "Dashboard 2"/>
    <Header title = "Dashboard 3"/>
  </>
  */ 

// estado 
  // informações mantidas pelo componente
  // Lembrar: imutabilidade

  // import React, { useState } from 'react';
  /*
  function App() {
    const [counter, setCounter] = useState(0)

    function incrementCounter(){
      setCounter(counter + 1);
    }

    return (
      //fragment (como uma div)
      <>
        <h1>Contador: {counter}</h1>
        <button onClick={incrementCounter}>Incrementar</button>
      </>
      
      //<h1>Hello World</h1>
    );
  }
  */


function App() {
  const [devs, setDevs] = useState([]);

  useEffect(()=>{
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  },[]);

  async function handleAddDev(data){
    
    const response = await api.post('/devs', data)

    //console.log(response.data);

    setDevs([...devs, response.data]);
    //adicionando o dev para ele aparecer na hora q cadastra
  }
  return (
    <div id = "app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            // => { return () } == => () 
            //eh o retorno 
             <DevItem key={dev.id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
