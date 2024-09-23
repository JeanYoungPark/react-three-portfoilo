import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Main } from "./pages/Main";
import { About } from "./pages/About";
import { Portfolio } from "./pages/Portfolio";
import { Contact } from "./pages/Contact";
import "./css/common.min.css";

function App() {
    /**
     * createHashRouter
     * 정적인 페이지에 적합
     * 검색 엔진으로 읽지 못함
     * github-pagers 배포가 간편
     */
    const router = createBrowserRouter([
        {
            element: <Layout />,
            errorElement: <div>잘못된 접근입니다.</div>,
            // loader: async () => {
            //     return new Promise((res) => {
            //         setTimeout(() => {
            //             return res("finish");
            //         }, 3000);
            //     });
            // },
            children: [
                { path: "/", element: <Main /> },
                { path: "/about", element: <About /> },
                { path: "/portfolio", element: <Portfolio /> },
                { path: "/contact", element: <Contact /> },
            ],
        },
    ]);

    return <RouterProvider router={router} fallbackElement={<div>Loading</div>} />;
}

export default App;
