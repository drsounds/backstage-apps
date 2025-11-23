module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-runtime", () => require("react/jsx-runtime"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/packages/stitch-app-bridge/src/index.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StitchAppBridge",
    ()=>StitchAppBridge,
    "stitchAppBridge",
    ()=>stitchAppBridge
]);
class StitchAppBridge {
    listeners = {};
    constructor(){
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    handleMessage(event) {
        const { action, ...data } = event.data;
        if (action && this.listeners[action]) {
            this.listeners[action].forEach((callback)=>callback(data));
        }
    }
    on(action, callback) {
        if (!this.listeners[action]) {
            this.listeners[action] = [];
        }
        this.listeners[action].push(callback);
    }
    off(action, callback) {
        if (this.listeners[action]) {
            this.listeners[action] = this.listeners[action].filter((cb)=>cb !== callback);
        }
    }
    navigate(path) {
        this.postMessage('navigate', {
            path
        });
    }
    ready() {
        this.postMessage('load', {
            value: 120
        });
    }
    postMessage(action, data = {}) {
        if (window.parent) {
            window.parent.postMessage({
                action,
                ...data
            }, '*');
        }
    }
}
const stitchAppBridge = new StitchAppBridge();
}),
"[project]/packages/app/examples/testapp/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$examples$2f$testapp$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/app/examples/testapp/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$stitch$2d$app$2d$bridge$2f$src$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/stitch-app-bridge/src/index.ts [ssr] (ecmascript)");
;
;
;
;
function MyApp({ Component, pageProps }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$app$2f$examples$2f$testapp$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Notify parent about navigation
        const handleRouteChange = (url)=>{
            // Remove the leading slash as the bridge might expect relative or we handle it
            // Actually, let's send the full path and let parent decide
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$stitch$2d$app$2d$bridge$2f$src$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["stitchAppBridge"].navigate(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        // Listen for params from parent
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$stitch$2d$app$2d$bridge$2f$src$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["stitchAppBridge"].on('params', (data)=>{
            if (data.params) {
                // Check if we need to navigate
                // This is tricky because params might map to a route
                // For now, let's assume params[0] is the sub-path
                // e.g. /app/testapp/foo -> params=['foo'] -> /foo
                const newPath = '/' + (data.params.join('/') || '');
                if (router.asPath !== newPath) {
                    router.replace(newPath);
                }
            }
        });
        // Notify ready
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$stitch$2d$app$2d$bridge$2f$src$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["stitchAppBridge"].ready();
        return ()=>{
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
        ...pageProps
    }, void 0, false, {
        fileName: "[project]/packages/app/examples/testapp/pages/_app.js",
        lineNumber: 40,
        columnNumber: 12
    }, this);
}
const __TURBOPACK__default__export__ = MyApp;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8aa707ec._.js.map