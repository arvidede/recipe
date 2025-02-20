import dynamic from "next/dynamic"
import { ComponentType } from "react"

type ModuleImport<C> = () => Promise<{ default: ComponentType<C> }>

type LazyWithPreload<C> = ComponentType<C> & { preload: ModuleImport<C> }

export function lazy<C>(componentToimport: ModuleImport<C>) {
    const Component = dynamic(componentToimport, {
        loading: () => null,
    })

    Object.defineProperty(Component, "preload", { value: componentToimport })

    return Component as LazyWithPreload<C>
}
