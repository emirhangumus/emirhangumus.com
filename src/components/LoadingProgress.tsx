import { useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";

export default function LoadingProgress() {
    NProgress.configure({ showSpinner: false });
    // a loading progress bar on top of the page
    // it is used in the Layout component
    Router.events.on("routeChangeStart", (url) => {
        NProgress.start();
    });

    Router.events.on("routeChangeComplete", (url) => {
        NProgress.done(false);
    });

    return <></>;
}
