import AgeGroupPriceList from './components/AgeGroupPriceList';

function App() {
  const propsOnChange = (result, dataTransfer) => {
    return dataTransfer(result)
  }
  return (
    <div>
      <AgeGroupPriceList propsOnChange={propsOnChange} minAge={0} maxAge={20} />
    </div>
  );
}

export default App;
