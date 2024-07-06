import { Provider } from "react-redux";
import { store } from "./store";
import RootNavigation from "./navigations/RootNavigation";
import 'react-native-get-random-values'

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
