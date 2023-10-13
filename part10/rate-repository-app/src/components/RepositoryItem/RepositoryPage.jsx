import useRepository from '../../hooks/useRepository';
import RepositoryItem from './index';

const RepositoryPage = () => {
  const { repository } = useRepository();

  return <RepositoryItem {...repository} withButton />;
};

export default RepositoryPage;
