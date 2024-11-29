import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Main } from "./pages/Main";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Contact } from "./pages/Contact";
import "./css/common.min.css";
import { Loading } from "./components/common/Loading";

function App() {
    /**
     * createHashRouter
     * 정적인 페이지에 적합
     * 검색 엔진으로 읽지 못함
     * github-pagers 배포가 간편
     */
    const router = createBrowserRouter([
        {
            element: (
                <Suspense fallback={<Loading />}>
                    <Layout />
                </Suspense>
            ),
            errorElement: <div>잘못된 접근입니다.</div>,
            children: [
                { path: "/", element: <Main /> },
                { path: "/about", element: <About /> },
                { path: "/Projects", element: <Projects /> },
                { path: "/contact", element: <Contact /> },
            ],
        },
    ]);

    return <RouterProvider router={router} fallbackElement={<div>Loading</div>} />;
}

export default App;
