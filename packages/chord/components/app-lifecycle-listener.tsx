'use client'

import { useEffect } from 'react'
import { useSandboxStore } from '@/app/state'

export function AppLifecycleListener() {
    const { url, urlUUID } = useSandboxStore()

    useEffect(() => {
        if (url && urlUUID) {
            window.parent.postMessage(
                {
                    action: 'app_created',
                    name: 'App',
                    preview_url: url,
                    url: window.location.href,
                },
                '*'
            )
        }
    }, [url, urlUUID])

    return null
}
