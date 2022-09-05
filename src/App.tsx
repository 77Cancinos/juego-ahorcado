import { useEffect, useState } from 'react' //Hooks
import reactLogo from './assets/react.svg'
import { letters } from './helpers/letters';
import { HangImage } from './components/HangImage';
import { getRandomWord } from './helpers/getRandomWord';

import './App.css'

function App() {

  const [word, setWord] = useState( getRandomWord() ); 
  const [hiddenWord, setHiddenWord ] = useState( '_ '.repeat( word.length ) );  
  const [ attempts, setAttempts ] =  useState(0);
  const [ lose, setLose ] = useState( false );
  const [ won, setWon] = useState( false );

  //Hooks
  //Efectos, determinar si la persona gano o perdio
  useEffect( () => {
    if( attempts >= 9 ){
      setLose( true );
    }
  }, [ attempts]) //Hooks

  //Determinar si la persona gano
  useEffect( ()=> {
    //console.log(hiddenWord);
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if ( currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord] )

  const checkLetter = ( letter : string ) => {

    //Verificamos si el usuario perdio o gano, para que ya no ejecute nada más
    if(lose) return;
    if(won) return;

    //Verificamos si la palabra posee la letra que ponemos
    if( !word.includes(letter) ){
      //console.log( letter + ' No existe' );
      setAttempts( Math.min( attempts + 1, 9) );
      return;
    }

    const hiddenWordArray =  hiddenWord.split(' ');
    
    for (let i = 0; i < word.length; i++) {
      if ( word[i] === letter ) {
        hiddenWordArray[i] = letter;
      }
    }
    //Buscamos todas las coincidencias del arreglo
    setHiddenWord( hiddenWordArray.join(' ') );

  }

  const newGame  = () => {
    //Asignar valores por defecto sin recargar la pagina
    //console.log('New Game...');
    const newWord = getRandomWord();

    setWord(newWord);
    setHiddenWord( '_ '.repeat( newWord.length )  );
    setAttempts(0);
    setLose(false);
    setWon(false);

  }
  
  return (

    <div className="App"> 
      
      {/* Imagenes */}
      {
        <HangImage imageNumber={ attempts }/>
      }

      {/* Palabra Oculta */}
      <h3> {hiddenWord} </h3>

      {/* Contador de intentos */}
      <h3>intentos: { attempts } </h3>

      {/* Mensaje de perdio */}
      {
        (lose) 
        ? <h2> Has perdido, la palabra era: { word } </h2>
        : ' '
      }

      {/* Mensaje de gano */}
      {
        (won) 
        ? <h2>Has ganado, ¡En Hora Buena!</h2>
        : ' '
      }


      {/* Botones de las letras */}

      {

        letters.map( (letter) => (
          <button 
            onClick={ () => checkLetter(letter)} 
            key={letter}> {letter} 
          </button>
        ))

      }

      <br /><br />
      <button onClick={ newGame }>¿Jugar de nuevo?</button>


    </div>

    
  );

};

export default App;
