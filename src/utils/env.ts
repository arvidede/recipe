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

export const ENV = {
    VERBOSE: parseEnv(process.env.VERBOSE),
    CACHE: parseEnv(process.env.CACHE, true),
}
