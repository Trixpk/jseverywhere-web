import React, { useState, useRef, useEffect, useCallback } from 'react';

const WsocketComponent = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket('ws://localhost:2346/'); // создаем ws соединение
      ws.current.onopen = () => setStatus('Соединение открыто'); // callback на ивент открытия соединения
      ws.current.onclose = () => setStatus('Соединение закрыто'); // callback на ивент закрытия соединения

      gettingData();
    }

    return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
  }, [ws, isPaused]);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      console.log(e.data);
      //подписка на получение данных по вебсокету
      if (isPaused) return;
      const message = JSON.parse(e.data);
      setData(message);
    };
  }, [isPaused]);

  const someFunc = () => {
    ws.current.send(JSON.stringify({ name: 'Петя' }));
  };

  const anotherFunc = () => {
    ws.current.send(JSON.stringify({ name: 'Вася' }));
  };

  console.log(status);

  return (
    <React.Fragment>
      <button onClick={someFunc}>Кнопка</button>
      <button onClick={anotherFunc}>Кнопка2</button>
      {!!data && <h1>{data.name}</h1>}
    </React.Fragment>
  );
};

export default WsocketComponent;
