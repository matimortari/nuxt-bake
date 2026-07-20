function padRight(value: string, width: number) {
  if (value.length >= width) {
    return value
  }

  return value + " ".repeat(width - value.length)
}

export function logStep(title: string, detail?: string) {
  console.log(`◇  ${title}`)
  if (detail) {
    console.log(`│  ${detail}`)
  }
  console.log("│")
}

export function printNextStepsBox(lines: string[]) {
  const title = "👉 Next steps"
  const contentWidth = Math.max(title.length + 2, ...lines.map(line => line.length + 2))

  console.log(`╭── ${title} ${"─".repeat(Math.max(0, contentWidth - title.length - 3))}╮`)
  console.log(`│${" ".repeat(contentWidth)}│`)
  for (const line of lines) {
    console.log(`│ ${padRight(line, contentWidth - 1)}│`)
  }
  console.log(`│${" ".repeat(contentWidth)}│`)
  console.log(`╰${"─".repeat(contentWidth)}╯`)
}
