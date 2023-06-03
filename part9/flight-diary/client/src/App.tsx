import { useEffect, useState } from 'react';
import { Content } from './components/Content';
import Header from './components/Header';
import { DiaryEntry } from './types';
import axios from 'axios';
import { apiBaseUrl } from './constants';
import diaryService from './services/diaries';

const App = () => {
  const title = 'Flight Diaries';
  const [contents, setContents] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setContents(diaries);
    };
    void fetchDiaries();
  }, []);

  return (
    <div>
      <Header name={title} />
      <Content contents={contents} />
    </div>
  );
};

export default App;
