import { Provider } from "react-redux";
import { store } from "./store";
import RootNavigation from "./navigations/RootNavigation";
import "react-native-get-random-values";
import { QueryClient, QueryClientProvider } from "react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchInterval: false, staleTime: Infinity },
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RootNavigation />
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
