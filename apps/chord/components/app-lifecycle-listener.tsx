'use client'

import { useEffect } from 'react'
import { useSandboxStore } from '@/app/state'

export function AppLifecycleListener() {
    const { url, urlUUID, generatedFiles } = useSandboxStore()

    useEffect(() => {
        if (url && urlUUID) {
            window.parent.postMessage(
                {
                    action: 'app_created',
                    name: 'App',
                    preview_url: url,
                    files: generatedFiles,
                    url: window.location.href,
                },
                '*'
            )
        }
    }, [url, urlUUID, generatedFiles])

    return null
}
