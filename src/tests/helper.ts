export function Fn(name: TemplateStringsArray) {
    return `[fn] ${name}`;
}

export function Class(name: TemplateStringsArray) {
    return `[class] ${name}`;
}

export function Member(name: TemplateStringsArray) {
    return `[member] ${name}`;
}
