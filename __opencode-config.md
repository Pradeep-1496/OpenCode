# OpenCode Configuration Guide

## Select a Default Model for a Project

Create an `opencode.json` file:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode/deepseek-v4-flash-free"
}
```

---

## View Available Models

Command:

```sh
opencode models
```

---

# Add an Ask Agent

The Ask Agent can read code and answer questions without making changes.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode/deepseek-v4-flash-free",
  "agent": {
    "ask": {
      "description": "Read code and answer questions without making changes",
      "mode": "primary",
      "permission": {
        "read": "allow",
        "glob": "allow",
        "grep": "allow",
        "list": "allow",
        "edit": "deny",
        "bash": "deny"
      }
    }
  }
}
```

> **Note:** The Ask Agent can add project context to its responses while preventing file modifications.

---

# Built-in Subagents

| Agent | Purpose | Typical Usage |
|---------|---------|---------|
| `@explore` | Search and understand the codebase | Find files, trace flows, locate implementations, understand architecture |
| `@general` | General reasoning and research | Explain concepts, review approaches, answer technical questions |
| `@build` | Make changes to the codebase | Implement features, refactor code, fix bugs |
| `@plan` | Analyze before coding | Break down tasks, create implementation plans, identify risks |

---

# Linux/macOS Configuration

## If `opencode.json` Is Not Working

Use the `OPENCODE_CONFIG_CONTENT` environment variable.

```bash
export OPENCODE_CONFIG_CONTENT='{
  "model": "opencode/deepseek-v4-flash-free"
}'
```

Then start OpenCode:

```sh
opencode
```

---

## Verify Loaded Configuration

Run:

```sh
opencode debug config
```

This displays:

- Effective merged configuration
- Configuration sources
- Final resolved values

---

# Using Your Own LLM Provider

Instead of the built-in providers, configure your own model provider.

---

## OpenAI

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openai": {
      "options": {
        "apiKey": "{env:OPENAI_API_KEY}"
      }
    }
  },
  "model": "openai/gpt-5",
  "small_model": "openai/gpt-5-mini"
}
```

---

## Anthropic (Claude)

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "apiKey": "{env:ANTHROPIC_API_KEY}"
      }
    }
  },
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

---

# OpenCode Configuration Properties

| Property | Purpose | When to Use |
|----------|----------|----------|
| `agent` | Create custom AI agents | Different models, permissions, or behaviors for coding, planning, reviewing |
| `command` | Custom slash commands | Reusable prompts such as `/review`, `/test`, `/commit` |
| `permission` | Control tool access | Restrict file edits, shell commands, network access |
| `instructions` | Additional rule files | Coding standards, architecture docs, team guidelines |
| `formatter` | Auto-format code after edits | Use with Prettier, Black, gofmt, rustfmt, etc. |
| `lsp` | Language Server Protocol integration | Better code understanding and navigation |
| `mcp` | External MCP servers | Connect databases, APIs, GitHub, Jira, browsers |
| `plugin` | Load OpenCode plugins | Extend functionality with custom integrations |
| `shell` | Override default shell | Use bash, zsh, pwsh, fish, etc. |
| `autoupdate` | Auto-update OpenCode | Disable for stable environments |
| `snapshot` | Undo/redo support | Recommended when allowing file edits |

---

# 1. Agent

Create specialized agents.

Example:

```json
{
  "agent": {
    "reviewer": {
      "description": "Code review expert",
      "model": "anthropic/claude-sonnet-4-5"
    },
    "architect": {
      "description": "System design expert",
      "model": "openai/gpt-5"
    }
  }
}
```

Usage:

```text
@reviewer review auth module
@architect design websocket architecture
```

---

# 2. Command

Create reusable slash commands.

Example:

```json
{
  "command": {
    "review": {
      "prompt": "Review this code for bugs, security issues, and performance problems."
    }
  }
}
```

Usage:

```text
/review
```

---

# 3. Permission

Control what the AI can do.

Example:

```json
{
  "permission": {
    "edit": "allow",
    "bash": "ask",
    "network": "deny"
  }
}
```

Common values:

- `allow`
- `ask`
- `deny`

Useful for production repositories.

---

# 4. Instructions

Load additional guidance files.

Example:

```json
{
  "instructions": [
    "docs/coding-standards.md",
    "docs/architecture.md"
  ]
}
```

Useful for:

- Coding conventions
- Project architecture
- Team standards
- Security requirements

---

# 5. Formatter

Automatically format generated code.

Example:

```json
{
  "formatter": true
}
```

Works well with:

- Prettier
- ESLint
- Black
- Ruff
- gofmt
- rustfmt

---

# 6. LSP

Enable Language Server Protocol integration.

Example:

```json
{
  "lsp": true
}
```

Benefits:

- Go to definition
- Symbol search
- Type information
- Diagnostics
- Better code navigation

Recommended for most projects.

---

# 7. MCP

Connect external tools and services.

Example:

```json
{
  "mcp": {
    "github": {},
    "postgres": {}
  }
}
```

Typical integrations:

- GitHub
- Jira
- PostgreSQL
- Documentation systems
- Browser automation
- Internal APIs

One of the most powerful OpenCode features.

---

# 8. Plugin

Load custom extensions.

Example:

```json
{
  "plugin": [
    "my-company-plugin"
  ]
}
```

Useful for custom team integrations.

---

# 9. Shell

Specify which shell OpenCode should use.

Linux/macOS:

```json
{
  "shell": "bash"
}
```

Windows:

```json
{
  "shell": "pwsh"
}
```

---

# 10. Auto Update

Control automatic updates.

Example:

```json
{
  "autoupdate": false
}
```

Recommended for:

- CI/CD environments
- Team environments
- Stable production workflows

---

# 11. Snapshot

Enable edit history and rollback support.

Example:

```json
{
  "snapshot": true
}
```

Benefits:

- Undo changes
- Restore previous state
- Safer AI-assisted editing

Highly recommended when allowing file modifications.

---

# Recommended Starter Configuration

```json
{
  "$schema": "https://opencode.ai/config.json",

  "model": "opencode/deepseek-v4-flash-free",

  "instructions": [
    "docs/coding-standards.md"
  ],

  "formatter": true,
  "lsp": true,
  "snapshot": true,

  "permission": {
    "edit": "allow",
    "bash": "ask"
  },

  "autoupdate": false
}
```

---

# Connect an LLM Provider via the Built-in Command

OpenCode can store provider credentials separately from the configuration file.

Run:

```sh
/connect
```

Then:

1. Choose a provider (OpenAI, Anthropic, etc.).
2. Enter your API key.
3. OpenCode stores credentials securely.

---

# TUI (Terminal User Interface)

`tui.json` can be configured globally or per project.

---

## Global TUI Configuration

Location:

```sh
~/.config/opencode/tui.json
```

Applies to all projects.

Common uses:

- Theme
- Keybindings
- Vim mode
- Scroll speed
- Notifications
- General UI preferences

Example:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "tokyonight",
  "scroll_speed": 3
}
```

---

## Project-Specific TUI Configuration

Place `tui.json` beside `opencode.json`.

```text
my-project/
├── opencode.json
└── tui.json
```

Example:

```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "system",
  "keybinds": {
    "command_list": "ctrl+p"
  }
}
```

---

## Configuration Precedence

Higher-precedence settings override lower-precedence settings.

```text
Global ~/.config/opencode/tui.json
        ↓
Project ./tui.json
        ↓
OPENCODE_TUI_CONFIG
```

---

## Recommended Setup

Keep personal preferences in:

```sh
~/.config/opencode/tui.json
```

Keep project-specific settings in:

```text
./tui.json
```

This allows developers to share project defaults without affecting personal preferences.