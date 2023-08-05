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

function parseIcaPage(html: string) {
    return convert(html, {
        baseElements: {
            selectors: ["#ingredients", "#steps"],
        },
        selectors: DEFAULT_SELECTORS,
    })
}

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
            { selector: "footer", format: "skip" },
            { selector: "header", format: "skip" },
            { selector: "nav", format: "skip" },
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

function preprocessText(textContent: string) {
    textContent = removeUrlsAndEmails(textContent)

    textContent = textContent.toLowerCase()

    // textContent = textContent.replace(/[^\w\s\d]/g, "");

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
        parsed = parseIcaPage(html)
    } else if (/seriouseats.com/.test(url.host)) {
        parsed = parseSeriousEatsPage(html)
    } else if (/simplyrecipes.com/.test(url.host)) {
        parsed = parseSimplyRecipesPage(html)
    } else {
        parsed = parseDefaultPage(html)
    }

    return preprocessText(parsed)
}
