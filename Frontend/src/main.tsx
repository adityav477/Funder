import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import store from "../redux/store.ts";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RecoilRoot >
      <App />
    </RecoilRoot>
  </Provider>
)
