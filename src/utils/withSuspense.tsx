import React, { ComponentType, Suspense } from "react"

function withSuspense<P extends object>(
    WrappedComponent: ComponentType<P>,
    fallback: React.ReactNode = null,
): React.ComponentType<P> {
    return function SuspenseWrapper(props: P) {
        return (
            <Suspense fallback={fallback}>
                <WrappedComponent {...props} />
            </Suspense>
        )
    }
}

export default withSuspense
