# Contributing to Frog Studios

Thanks for taking an interest in the project.

## Before you start

For significant changes, open an issue first so the scope and expected behaviour are clear.

## Development workflow

1. Fork the repository or create a feature branch.
2. Install dependencies with `npm install`.
3. Configure local environment variables using `.env.example`.
4. Make focused changes.
5. Test the affected frontend or API workflow locally.
6. Update documentation when behaviour or configuration changes.
7. Open a pull request with a concise description of the change.

## Pull requests

A useful pull request should include:

- What changed
- Why it changed
- How it was tested
- Any configuration or deployment implications
- Screenshots for meaningful UI changes

Keep pull requests small enough to review comfortably.

## Code standards

- Prefer clear, maintainable JavaScript over unnecessary abstraction.
- Keep secrets and credentials out of source control.
- Validate public API input.
- Preserve the existing responsive behaviour when changing the frontend.
- Avoid unrelated formatting churn.
- Update documentation when an API, environment variable, or deployment step changes.

## Reporting bugs

Include reproduction steps, expected behaviour, actual behaviour, environment details, and relevant logs without exposing credentials or personal data.

## Security issues

Do not publish sensitive security issues in a public issue. Contact the maintainer privately with enough information to reproduce and assess the problem.
