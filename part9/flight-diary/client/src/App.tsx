import { useEffect, useState } from 'react';
import { Content } from './components/Content';
import Header from './components/Header';
import { DiaryEntry, NewDiaryEntry } from './types';
import axios from 'axios';
import { apiBaseUrl } from './constants';
import diaryService from './services/diaries';
import { DiaryForm } from './components/DiraryForm';

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

  const handleSubmit = (entire: NewDiaryEntry) => {
    const createDiary = async () => {
      const created = await diaryService.create(entire);
      setContents(contents.concat(created));
    };
    void createDiary();
  };

  return (
    <div>
      <DiaryForm onSubmit={handleSubmit} />
      <Header name={title} />
      <Content contents={contents} />
    </div>
  );
};

export default App;
