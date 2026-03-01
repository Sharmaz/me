import usePortfolio from './hooks/usePortfolio';

function App() {
  const { data, loading, error } = usePortfolio();

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;

  return (
    <span>{data?.profile.name}</span>
  );
}

export default App;
