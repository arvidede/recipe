export const ENV = {
    VERBOSE: Boolean(process.env.VERBOSE),
    CACHE: process.env.CACHE ? Boolean(process.env.CACHE) : true,
}
