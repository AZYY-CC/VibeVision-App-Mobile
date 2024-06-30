import { Provider } from "react-redux";
import { store } from "./store";
import { Auth } from "./screens";

export default function App() {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
}
