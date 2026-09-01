#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'

const outputPath = resolve(process.env.EMI_STATS_OUTPUT || 'data/initiative_stats.yml')
const projectsPath = resolve('content/projects')
const requireStats = process.env.EMI_REQUIRE_STATS === 'true'

const explorerCandidates = process.env.DIRECTUS_EXPLORER_DIR
  ? [resolve(process.env.DIRECTUS_EXPLORER_DIR)]
  : [
      resolve('../directus-explorer'),
      resolve('../../DBGI/directus-explorer'),
      resolve('directus-explorer')
    ]
const explorerPath = explorerCandidates.find(existsSync)

function stop (message) {
  if (requireStats) throw new Error(message)
  console.warn(`[initiative-stats] ${message}; keeping ${outputPath}`)
  process.exit(0)
}

function yamlString (value) {
  return JSON.stringify(value)
}

function projectSelectors () {
  const selectors = {
    initiative: { type: 'group', value: 'emi' }
  }

  for (const filename of readdirSync(projectsPath).filter(name => name.endsWith('.md') && name !== '_index.md')) {
    const text = readFileSync(resolve(projectsPath, filename), 'utf8')
    const group = text.match(/^directus_group:\s*["']?([^\s"']+)/m)
    const project = text.match(/^directus_project:\s*["']?([^\s"']+)/m)
    if (group || project) {
      selectors[basename(filename, '.md')] = {
        type: group ? 'group' : 'project',
        value: (group || project)[1]
      }
    }
  }

  return selectors
}

function fetchStats (selectors) {
  const python = `
import json
from directus_explorer.config import load_settings
from directus_explorer.directus import DirectusClient
from directus_explorer.samples import PROJECT_GROUPS

selectors = ${JSON.stringify(selectors)}
project_sets = {
    key: set(PROJECT_GROUPS[selector["value"]])
    if selector["type"] == "group"
    else {selector["value"]}
    for key, selector in selectors.items()
}

client = DirectusClient(load_settings())
sample_rows = {
    row.qfield_project: row
    for row in client.summarize_samples_by_project()
}
species_rows = {}
for key, projects in project_sets.items():
    summaries = client._summarize_species_by_project_groups(
        project_groups={key: projects}
    )
    if summaries:
        species_rows[key] = summaries[0]

result = {}
for key, projects in project_sets.items():
    rows = [sample_rows[project] for project in projects if project in sample_rows]
    species = species_rows.get(key)
    result[key] = {
        "selector_type": selectors[key]["type"],
        "selector": selectors[key]["value"],
        "collected_samples": sum(row.collected_count for row in rows),
        "covered_species": species.collected_count if species else 0,
        "analysed_samples": sum(row.profiled_count for row in rows),
    }

print(json.dumps(result))
`

  const result = spawnSync('uv', ['run', 'python', '-c', python], {
    cwd: explorerPath,
    encoding: 'utf8',
    env: process.env
  })

  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || 'Directus query failed').trim())
  }

  return JSON.parse(result.stdout)
}

function renderYaml (stats) {
  const initiative = stats.initiative
  const lines = [
    `generated_at: ${yamlString(new Date().toISOString())}`,
    'source_label: "Earth Metabolome Initiative Directus"',
    `project_group: ${yamlString(initiative.selector)}`,
    `collected_samples: ${initiative.collected_samples}`,
    `covered_species: ${initiative.covered_species}`,
    `analysed_samples: ${initiative.analysed_samples}`,
    'projects:'
  ]

  for (const [key, project] of Object.entries(stats).filter(([key]) => key !== 'initiative')) {
    lines.push(`  ${yamlString(key)}:`)
    lines.push(`    selector_type: ${yamlString(project.selector_type)}`)
    lines.push(`    selector: ${yamlString(project.selector)}`)
    lines.push(`    collected_samples: ${project.collected_samples}`)
    lines.push(`    covered_species: ${project.covered_species}`)
    lines.push(`    analysed_samples: ${project.analysed_samples}`)
  }

  return `${lines.join('\n')}\n`
}

if (!explorerPath) {
  stop(`Directus explorer not found in: ${explorerCandidates.join(', ')}`)
}

try {
  const stats = fetchStats(projectSelectors())
  writeFileSync(outputPath, renderYaml(stats), 'utf8')
  console.log(`[initiative-stats] Wrote ${outputPath} from Directus`)
} catch (error) {
  stop(error.message)
}
