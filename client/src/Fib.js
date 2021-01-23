import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const fetchValues = useCallback(async () => {
    const { data: values } = await axios.get('/api/values/current');
    setValues(values);
  }, []);

  const fetchIndexes = useCallback(async () => {
    const { data: seenIndexes } = await axios.get('/api/values/all');

    setSeenIndexes(seenIndexes);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      await axios.post('/api/values', {
        index,
      });

      setIndex('');
    },
    [index],
  );

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, [fetchValues, fetchIndexes]);

  const renderSeenIndexes = useCallback(() => {
    return seenIndexes.map(({ number }) => number).join(', ');
  }, [seenIndexes]);

  const renderValues = useCallback(() => {
    return Object.keys(values).map((key) => (
      <div key={key}>
        For index {key} I calculated {values[key]}
      </div>
    ));
  }, [values]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>submit</button>
      </form>

      <h3>Indexes I have seen: </h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
