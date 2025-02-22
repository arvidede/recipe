import { SelectorDefinition, convert } from "html-to-text"

const DEFAULT_SELECTORS: SelectorDefinition[] = [
    {
        selector: "a",
        format: "anchor",
        options: {
            ignoreHref: true,
            linkBrackets: false,
        },
    },
]

function parseSeriousEatsPage(html: string) {
    return convert(html, {
        baseElements: {
            selectors: [
                "#section--ingredients_1-0",
                "#section--instructions_1-0",
            ],
        },
        selectors: DEFAULT_SELECTORS,
    })
}

function parseSimplyRecipesPage(html: string) {
    return convert(html, {
        baseElements: {
            selectors: [
                "#section--ingredients_1-0",
                "#section--instructions_1-0",
            ],
        },
        selectors: DEFAULT_SELECTORS,
    })
}

function parseDefaultPage(html: string) {
    return convert(html, {
        selectors: [
            ...DEFAULT_SELECTORS,
            { selector: "nav", format: "skip" },
            { selector: "img", format: "skip" },
            { selector: "iframe", format: "skip" },
            { selector: "video", format: "skip" },
            { selector: "audio", format: "skip" },
            { selector: ".sidebar", format: "skip" },
            { selector: ".ad", format: "skip" },
        ],
    })
}

function removeUrlsAndEmails(content: string) {
    return content
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, "") // Remove URLs
        .replace(/\S+@\S+\.\S+/g, "") // Remove email addresses
}

const OG_IMAGE_REGEX = new RegExp(
    `<meta\\s+(?:property|name)=["']og:image["']\\s+content=["']([^"']+)["']`,
    "i",
)

function parseOGImage(html: string) {
    const match = html.match(OG_IMAGE_REGEX)
    return match ? match[1] : null
}

function preprocessText(textContent: string) {
    textContent = removeUrlsAndEmails(textContent)

    textContent = textContent.toLowerCase()

    textContent = textContent.replace(/[^\p{L}\p{N}\s•◦▪‣⁃−–—\*]/gu, "")

    const stopWords = new Set([
        "the",
        "and",
        "is",
        "in",
        "it",
        "of",
        "to",
        "a",
        "an",
        "for",
    ])

    textContent = textContent
        .split(" ")
        .filter((word) => !stopWords.has(word))
        .join(" ")

    textContent = textContent.trim().replace(/\s+/g, " ")

    return textContent
}

export function parsePage(html: string, url: URL) {
    let parsed: string

    if (/ica.se/.test(url.host)) {
        parsed = parseDefaultPage(html)
    } else if (/seriouseats.com/.test(url.host)) {
        parsed = parseSeriousEatsPage(html)
    } else if (/simplyrecipes.com/.test(url.host)) {
        parsed = parseSimplyRecipesPage(html)
    } else {
        parsed = parseDefaultPage(html)
    }

    return {
        text: preprocessText(parsed),
        img: parseOGImage(html),
    }
}
