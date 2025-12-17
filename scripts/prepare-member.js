#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

const targets = process.argv.slice(2)

if (!targets.length) {
  console.error('Usage: node scripts/prepare-member.js <path-to-member-md> [more files...]')
  process.exit(1)
}

let exitCode = 0

const handleFile = file => {
  const filePath = path.resolve(process.cwd(), file)

  let stats
  try {
    stats = fs.statSync(filePath)
  } catch (error) {
    console.error(`Skipping ${file}: ${error.message}`)
    exitCode = 1
    return
  }

  if (!stats.isFile()) {
    console.warn(`Skipping ${file}: not a regular file`)
    return
  }

  let content
  try {
    content = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`Unable to read ${file}: ${error.message}`)
    exitCode = 1
    return
  }

  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

  if (!frontMatterMatch) {
    console.warn(`Skipping ${file}: no front matter detected`)
    return
  }

  const frontMatter = frontMatterMatch[1]
  const remainder = content.slice(frontMatterMatch[0].length)

  const lines = frontMatter.split('\n')
  const hadTrailingEmpty = lines[lines.length - 1] === ''
  if (hadTrailingEmpty) {
    lines.pop()
  }

  const ensureLine = (key, desiredLine) => {
    const index = lines.findIndex(line => line.trim().startsWith(`${key}:`))
    if (index === -1) {
      lines.push(desiredLine)
      return true
    }

    if (lines[index].trim() === desiredLine) {
      return false
    }

    lines[index] = desiredLine
    return true
  }

  const updatedFields = []
  if (ensureLine('modules', 'modules: ["leaflet"]')) {
    updatedFields.push('modules')
  }
  if (ensureLine('type', 'type: members')) {
    updatedFields.push('type')
  }

  if (!updatedFields.length) {
    console.log(`No changes required for ${file}`)
    return
  }

  if (hadTrailingEmpty) {
    lines.push('')
  }

  const newFrontMatter = lines.join('\n')
  const fmBlock = `---\n${newFrontMatter}\n---`
  const separator = remainder.startsWith('\n') ? '' : '\n'
  const updatedContent = `${fmBlock}${separator}${remainder}`

  try {
    fs.writeFileSync(filePath, updatedContent)
    console.log(`Updated ${file}: ensured ${updatedFields.join(', ')}`)
  } catch (error) {
    console.error(`Unable to update ${file}: ${error.message}`)
    exitCode = 1
  }
}

targets.forEach(handleFile)
process.exit(exitCode)
