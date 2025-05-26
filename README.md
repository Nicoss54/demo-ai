# Let's Talk About AI :)

## Introduction

At Google I/O 2025, several native AI-oriented web APIs were unveiled. These APIs allow you to use AI directly in your browser in the following contexts:

- Translation (Translation API)
- Language detection (Language Detector API)
- Summarization (Summarizer API)
- Writing (Writer API)
- Rephrasing (Rewriter API)

These APIs are experimental for some features and behind feature flags.

## Enabling These APIs

To enable these APIs, go to Chrome's flags page:

```
chrome://flags
```

And enable the following flags:

- Prompt API for Gemini Nano
- Prompt API for Gemini Nano with Multimodal Input
- Summarization API for Gemini Nano
- Writer API for Gemini Nano
- Rewriter API for Gemini Nano
- Language detection web platform API

After enabling all flags, restart Chrome, open the console, and type the following code:

```javascript
await LanguageModel.availability();
```

If the code returns "available", then the Gemini Nano model is ready to use.

## Installing Project Dependencies

This project uses Bun as its package manager. To install the project dependencies, run the following command at the project root:

```bash
bun install --frozen-lockfile
```

## Running the Project

At the project root, run the following command:

```bash
bun start
```
