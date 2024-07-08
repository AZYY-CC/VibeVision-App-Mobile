import { Provider } from "react-redux";
import { store } from "./store";
import RootNavigation from "./navigations/RootNavigation";
import "react-native-get-random-values";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchInterval: false, staleTime: Infinity },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
