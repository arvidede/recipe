function parseEnv<T = undefined>(env: string | undefined, fallback?: T) {
    if (!env) {
        return fallback
    }

    try {
        return JSON.parse(env)
    } catch {
        return undefined
    }
}

const IS_DEV = process.env.NODE_ENV === "development"

export const ENV = {
    VERBOSE: parseEnv(process.env.VERBOSE, IS_DEV),
    CACHE: parseEnv(process.env.CACHE, true),
    IS_DEV,
}
