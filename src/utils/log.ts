import chalk from "chalk"
import { ENV } from "./env"
type LogParams = Parameters<typeof console.log>

const PREFIX = "recipe"

const logger = console.log

function log(prefix: string, ...args: LogParams) {
    logger(chalk.blue(prefix), ...args)
}

function info(prefix: string, ...args: LogParams) {
    if (ENV.VERBOSE) {
        logger(chalk.white(prefix), ...args)
    }
}

function warn(prefix: string, ...args: LogParams) {
    logger(chalk.yellow(prefix), ...args)
}

function error(prefix: string, ...args: LogParams) {
    logger(chalk.red(prefix), ...args)
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
