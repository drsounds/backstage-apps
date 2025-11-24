// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';

import { LoadingScreen } from '../LoadingScreen';
import { ProgressBar } from '../ProgressBar';

import styles from './index.module.css';
import { StitchApplication } from '../../types';

interface StitchAppProps {
    uri: string;
    onNavigate?: (path: string[]) => void;
    onLoad?: () => void;
    origin?: string | null;
    defaultQuery?: any;
    onMessage?: (action: string, data: any) => void;
    onFetchAppById?: (appId: string) => Promise<StitchApplication>;
    style?: React.CSSProperties;
    app?: StitchApplication;
    params?: string[];
    [key: string]: any;
}

export function StitchApp({
    uri,
    onNavigate,
    onLoad,
    origin = null,
    defaultQuery = {},
    onMessage,
    onFetchAppById,
    style,
    app: propApp,
    params: propParams,
}: StitchAppProps) {
    const [loaded, setLoaded] = useState(0)
    const [app, setApp] = useState<StitchApplication | null>(propApp || null)
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const parts = uri.split(/:/)
    const appId = parts[2]
    const params = propParams || parts.slice(3)

    let loadingInterval: any = null

    const [query, _] = useState(defaultQuery)

    const handleMessage = (action: string, data: any) => {
        if (onMessage instanceof Function) {
            onMessage(action, data);
        }
        if (action === 'load') {
            handleLoad(data.value ?? 120)
        }
        if (action === 'navigate') {
            if (onNavigate instanceof Function) {
                // data.path comes from the child, e.g. /foo
                // We need to split it into parts
                const path = data.path.startsWith('/') ? data.path.substring(1) : data.path;
                onNavigate(path.split('/'));
            }
        }
    }

    const handleLoad = (value: number) => {
        setLoaded(value)
    }

    useEffect(() => {
        loadingInterval = setInterval(() => {
            setLoaded((prevLoaded) => prevLoaded + 10)
            if (loaded >= 120) {
                clearInterval(loadingInterval)
            }

        }, 200)
    }, [])
    useEffect(() => {
        if (propApp) {
            setApp(propApp);
            return;
        }
        onFetchAppById?.(appId).then(appResult => {
            setApp(appResult);

        })
    }, [uri, propApp])
    useEffect(() => {
        if (!iframeRef?.current) return;
        iframeRef.current.contentWindow?.postMessage({
            params
        }, origin ?? '*')
    }, [iframeRef.current, params, origin])
    useEffect(() => {
        if (!iframeRef.current) return;
        if (typeof window !== 'undefined') {
            window.addEventListener('message', (event) => {
                if (event.data?.action === 'load') {
                    if (onLoad instanceof Function) {
                        onLoad();
                    }
                }
                handleMessage(
                    event.data.action,
                    event.data
                )
            })
        }
    }, [iframeRef.current])
    useEffect(() => {
        if (!iframeRef.current) return;
        if (typeof MutationObserver !== 'undefined') {
            new MutationObserver((mutations) => {
                mutations.some((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'src') {

                        console.log('Old src: ', mutation.oldValue);
                        // @ts-ignore
                        console.log('New src: ', mutation.target?.src);
                        // @ts-ignore
                        let pathname = mutation.target?.src?.split(/\//, 3)[3]
                        if (onNavigate instanceof Function) {
                            onNavigate(pathname.split(/\//g))
                        }
                        return true;
                    }

                    return false;
                });
            }).observe(
                iframeRef.current, {
                attributes: true,
                attributeFilter: ['src'],
                attributeOldValue: true,
                characterData: false,
                characterDataOldValue: false,
                childList: false,
                subtree: true
            }
            )
        }
    }, [iframeRef.current])
    if (app) {
        return (
            <div style={{ position: 'relative', ...style }}>
                <iframe
                    ref={iframeRef}
                    src={`${[app.embed_url, ...params].join('/')}?${new URLSearchParams(query).toString()}`}
                    allowTransparency={true}
                    style={{ border: 'none', visibility: loaded >= 120 ? 'visible' : 'hidden', position: 'absolute', left: 0, width: '100%', height: '100vh', top: 0, flex: 1 }}
                ></iframe>
                {loaded <= 120 &&
                    <div style={{ visibility: loaded <= 120 ? 'visible' : 'hidden' }} className={styles.stitchAppLoading}>
                        <ProgressBar value={loaded} />
                    </div>}
            </div>
        )
    } else {
        return <LoadingScreen />
    }
}