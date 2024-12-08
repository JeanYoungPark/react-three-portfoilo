import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./pages/Main";
import "./css/common.min.css";
import { Loading } from "./components/common/Loading";

function App() {
    /**
     * createHashRouter
     * 정적인 페이지에 적합
     * 검색 엔진으로 읽지 못함
     * github-pagers 배포가 간편
     */
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Main />
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
