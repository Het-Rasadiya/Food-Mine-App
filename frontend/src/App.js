import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import { useLoading } from "./hooks/useLoading";
import setLoadingInterceptor from "./inspectors/loadingInterceptor";

function App() {

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({
      showLoading,
      hideLoading
    })
  }, [])

  return (
    <>
      <Loading />
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
