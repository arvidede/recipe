import chalk from "chalk"
import { inspect } from "util"
import { ENV } from "./env"

type LogParams = Parameters<typeof console.log>

const PREFIX = "recipe"

const logger = console.log

function log(prefix: string, ...args: LogParams) {
    logger(chalk.blue(prefix), ...args)
}

function info(prefix: string, ...args: LogParams) {
    if (ENV.VERBOSE) {
        const start = args.shift()
        logger(chalk.blue(prefix), chalk.yellowBright(start), ...args)
    }
}

function warn(prefix: string, ...args: LogParams) {
    const start = args.shift()
    logger(chalk.yellow(prefix), chalk.yellowBright(start), ...args)
}

function error(prefix: string, ...args: LogParams) {
    const start = args.shift()
    logger(chalk.red(prefix), chalk.yellowBright(start), ...args)
}

export function getLogger(prefix?: string) {
    const fullPrefix = prefix ? `[${PREFIX}:${prefix}]` : `[${PREFIX}]`
    return {
        log: log.bind(undefined, fullPrefix),
        info: info.bind(undefined, fullPrefix),
        warn: warn.bind(undefined, fullPrefix),
        error: error.bind(undefined, fullPrefix),
    }
}

getLogger("env").info(inspect(ENV, { colors: true }))
