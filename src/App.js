import AgeGroupPriceList from './components/AgeGroupPriceList';

function App() {
  const propsOnChange = (result, dataTransfer) => {
    return dataTransfer(result)
  }
  return (
    <div>
      <AgeGroupPriceList propsOnChange={propsOnChange} />
    </div>
  );
}

export default App;
